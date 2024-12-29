from django.core.management.base import BaseCommand
from gouge.models import FlightCondition, FLIGHT_CONDITIONS

class Command(BaseCommand):
    help = 'Populates the flight conditions table with initial data'

    def handle(self, *args, **kwargs):
        for code, description in FLIGHT_CONDITIONS:
            # Determine category based on the condition
            if code in ['VFR', 'MVFR', 'IFR', 'LIFR']:
                category = 'WEATHER'
            elif code in ['LIGHT_TURB', 'MOD_TURB', 'SEV_TURB']:
                category = 'WEATHER'
            elif 'WIND' in code or code in ['GUSTING']:
                category = 'WIND'
            elif code in ['CLEAR', 'SCATTERED', 'BROKEN', 'OVERCAST', 'LOW_CEILING', 'FOG', 'RAIN', 'SNOW', 'ICING']:
                category = 'VISIBILITY'
            else:
                category = 'OTHER'

            FlightCondition.objects.get_or_create(
                name=code,
                defaults={
                    'description': description,
                    'category': category
                }
            )
            self.stdout.write(self.style.SUCCESS(f'Successfully created flight condition: {code}'))
