import os
import sys

def analyze_django_project(root_dir):
    project_structure = {
        "apps": [],
        "settings_file": None,
        "urls_file": None,
        "wsgi_file": None,
        "asgi_file": None,
    }

    for root, dirs, files in os.walk(root_dir):
        if 'migrations' in dirs:
            dirs.remove('migrations')  # Skip migrations folders
        
        if '__pycache__' in dirs:
            dirs.remove('__pycache__')  # Skip __pycache__ folders

        if 'settings.py' in files:
            project_structure["settings_file"] = os.path.join(root, 'settings.py')
        
        if 'urls.py' in files:
            project_structure["urls_file"] = os.path.join(root, 'urls.py')
        
        if 'wsgi.py' in files:
            project_structure["wsgi_file"] = os.path.join(root, 'wsgi.py')
        
        if 'asgi.py' in files:
            project_structure["asgi_file"] = os.path.join(root, 'asgi.py')

        if 'apps.py' in files:
            app_name = os.path.basename(root)
            app_files = [f for f in files if f.endswith('.py')]
            project_structure["apps"].append({
                "name": app_name,
                "path": root,
                "files": app_files
            })

    return project_structure

def print_project_structure(structure):
    print("Django Project Structure:")
    print(f"Settings file: {structure['settings_file']}")
    print(f"URLs file: {structure['urls_file']}")
    print(f"WSGI file: {structure['wsgi_file']}")
    print(f"ASGI file: {structure['asgi_file']}")
    print("\nDjango Apps:")
    for app in structure["apps"]:
        print(f"  - {app['name']}:")
        print(f"    Path: {app['path']}")
        print(f"    Files: {', '.join(app['files'])}")
    print("\nNote: This script doesn't analyze the content of the files, just their presence.")

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python analyze_django_project.py /path/to/django/project")
        sys.exit(1)

    project_root = sys.argv[1]
    if not os.path.isdir(project_root):
        print(f"Error: {project_root} is not a valid directory")
        sys.exit(1)

    structure = analyze_django_project(project_root)  # Define structure before using it

    with open('/development/backend_structure.md', 'w') as f:
        f.write("Django Project Structure:\n")
        f.write(f"Settings file: {structure['settings_file']}\n")
        f.write(f"URLs file: {structure['urls_file']}\n")
        f.write(f"WSGI file: {structure['wsgi_file']}\n")
        f.write(f"ASGI file: {structure['asgi_file']}\n")
        f.write("\nDjango Apps:\n")
        for app in structure["apps"]:
            f.write(f"  - {app['name']}:\n")
            f.write(f"    Path: {app['path']}\n")
            f.write(f"    Files: {', '.join(app['files'])}\n")
        f.write("\nNote: This script doesn't analyze the content of the files, just their presence.\n")
    structure = analyze_django_project(project_root)
    print_project_structure(structure)