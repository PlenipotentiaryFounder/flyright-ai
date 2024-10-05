import json
import os
from django.core.management.base import BaseCommand
from flashcards.models import FlashcardSet, FlashcardCategory, Flashcard
from django.conf import settings

class Command(BaseCommand):
    help = 'Load flashcards from JSON files into the database'

    def handle(self, *args, **options):
        self.files_processed = 0
        self.categories_created = 0
        self.sets_created = 0
        self.flashcards_created = 0
        self.categories_updated = 0
        self.sets_updated = 0
        self.flashcards_updated = 0

        self.process_all_files()
        self.print_summary()

    def process_all_files(self):
        flashcard_dirs = [
            os.path.join('flyright_flashcardsets', 'ifr_defaultSets'),
            os.path.join('flyright_flashcardsets', 'ppl_defaultSets'),
        ]
        
        for dir_name in flashcard_dirs:
            dir_path = os.path.join(settings.BASE_DIR, 'flashcards', dir_name)
            if os.path.exists(dir_path):
                for filename in os.listdir(dir_path):
                    if filename.endswith('.json'):
                        self.process_file(os.path.join(dir_path, filename))
            else:
                self.stdout.write(self.style.WARNING(f"Directory not found: {dir_path}"))

    def process_file(self, file_path):
        self.files_processed += 1
        self.stdout.write(self.style.SUCCESS(f"\nProcessing file: {file_path}"))
        with open(file_path, 'r') as file:
            data = json.load(file)

        for item in data:
            if item['model'] == 'flashcards.flashcardcategory':
                self.create_or_update_category(item)
            elif item['model'] == 'flashcards.flashcardset':
                self.create_or_update_set(item)
            elif item['model'] == 'flashcards.flashcard':
                self.create_or_update_flashcard(item)

    def create_or_update_category(self, item):
        category, created = FlashcardCategory.objects.get_or_create(
            name=item['fields']['name'],
            defaults={
                'creatorType': 'flyright',
                'ai_generated': item['fields']['ai_generated'],
                'user': None
            }
        )
        if created:
            self.categories_created += 1
            self.stdout.write(self.style.SUCCESS(f"  Created category: {category.name}"))
        else:
            self.categories_updated += 1
            self.stdout.write(self.style.WARNING(f"  Updated category: {category.name}"))

    def create_or_update_set(self, item):
        flashcard_set, created = FlashcardSet.objects.get_or_create(
            name=item['fields']['name'],
            creatorType='flyright',
            defaults={
                'ai_generated': item['fields']['ai_generated'],
                'user': None
            }
        )
        if created:
            self.sets_created += 1
            self.stdout.write(self.style.SUCCESS(f"  Created set: {flashcard_set.name}"))
        else:
            self.sets_updated += 1
            self.stdout.write(self.style.WARNING(f"  Set already exists: {flashcard_set.name}"))

    def create_or_update_flashcard(self, item):
        category = FlashcardCategory.objects.get(name=item['fields']['category'])
        flashcard_set = FlashcardSet.objects.get(name=item['fields']['set'])
        
        flashcard, created = Flashcard.objects.update_or_create(
            question=item['fields']['question'],
            set=flashcard_set,
            defaults={
                'category': category,
                'bold_question': item['fields']['bold_question'],
                'answer': item['fields']['answer'],
                'bold_answer': item['fields']['bold_answer'],
                'difficulty': item['fields']['difficulty'],
                'status': item['fields']['status'],
                'times_used': item['fields']['times_used'],
                'creatorType': 'flyright',
                'ai_generated': item['fields']['ai_generated'],
                'user': None
            }
        )
        if created:
            self.flashcards_created += 1
            self.stdout.write(self.style.SUCCESS(f"  Created flashcard: {flashcard.question[:30]}..."))
        else:
            self.flashcards_updated += 1
            self.stdout.write(self.style.WARNING(f"  Updated flashcard: {flashcard.question[:30]}..."))

    def print_summary(self):
        self.stdout.write(self.style.SUCCESS("\n=== Summary ==="))
        self.stdout.write(f"Files processed: {self.files_processed}")
        self.stdout.write(f"Categories created: {self.categories_created}")
        self.stdout.write(f"Categories updated: {self.categories_updated}")
        self.stdout.write(f"Sets created: {self.sets_created}")
        self.stdout.write(f"Sets updated: {self.sets_updated}")
        self.stdout.write(f"Flashcards created: {self.flashcards_created}")
        self.stdout.write(f"Flashcards updated: {self.flashcards_updated}")
        self.stdout.write(self.style.SUCCESS("\nAll files successfully processed and uploaded to the database!"))