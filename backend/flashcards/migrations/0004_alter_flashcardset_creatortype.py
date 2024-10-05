# Generated by Django 5.1.1 on 2024-10-05 00:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('flashcards', '0003_flashcardset_creatortype'),
    ]

    operations = [
        migrations.AlterField(
            model_name='flashcardset',
            name='creatorType',
            field=models.CharField(choices=[('user', 'User'), ('flyright', 'FlyRight'), ('ai', 'AI')], default='user', max_length=255),
        ),
    ]
