import os
import filecmp
import json
from datetime import datetime

# Define the root directory and the output file
ROOT_DIR = 'C:/Users/Thomas Ferrier/flyright-ai/Development'
OUTPUT_FILE = os.path.join(ROOT_DIR, 'currentFileStructure.md')
LOG_FILE = os.path.join(ROOT_DIR, 'file_changes.log')
PREVIOUS_STRUCTURE_FILE = os.path.join(ROOT_DIR, 'previousFileStructure.json')

def get_file_structure(root_dir):
    file_structure = {}
    for root, dirs, files in os.walk(root_dir):
        relative_root = os.path.relpath(root, root_dir)
        file_structure[relative_root] = files
    return file_structure

def save_file_structure(file_structure, output_file):
    with open(output_file, 'w') as f:
        for dir_path, files in file_structure.items():
            f.write(f"{dir_path}/\n")
            for file in files:
                f.write(f"  {file}\n")

def log_changes(new_structure, old_structure, log_file):
    new_files = []
    moved_files = []

    for dir_path, files in new_structure.items():
        if dir_path not in old_structure:
            new_files.extend([os.path.join(dir_path, file) for file in files])
        else:
            new_files.extend([os.path.join(dir_path, file) for file in files if file not in old_structure[dir_path]])

    for dir_path, files in old_structure.items():
        if dir_path not in new_structure:
            moved_files.extend([os.path.join(dir_path, file) for file in files])
        else:
            moved_files.extend([os.path.join(dir_path, file) for file in files if file not in new_structure[dir_path]])

    with open(log_file, 'a') as f:
        f.write(f"\nChanges detected on {datetime.now()}:\n")
        for file in new_files:
            f.write(f"NewFile: {file}\n")
        for file in moved_files:
            f.write(f"MovedFile: {file}\n")

def main():
    new_structure = get_file_structure(ROOT_DIR)
    save_file_structure(new_structure, OUTPUT_FILE)

    if os.path.exists(PREVIOUS_STRUCTURE_FILE):
        with open(PREVIOUS_STRUCTURE_FILE, 'r') as f:
            old_structure = json.load(f)
        log_changes(new_structure, old_structure, LOG_FILE)

    with open(PREVIOUS_STRUCTURE_FILE, 'w') as f:
        json.dump(new_structure, f)

if __name__ == "__main__":
    main() 