import os

# Set the root directory path and the file where the structure will be saved
root_dir = r"C:\Users\Thomas Ferrier\flyright-ai"
output_file = os.path.join(root_dir, "Development", "currentFileStructure.md")

def generate_tree(root, prefix=""):
    """Generates the folder tree structure as a string."""
    tree_structure = ""
    items = sorted(os.listdir(root))
    
    for index, name in enumerate(items):
        path = os.path.join(root, name)
        connector = "├── " if index < len(items) - 1 else "└── "
        
        tree_structure += f"{prefix}{connector}{name}\n"
        if os.path.isdir(path):
            extension = "│   " if index < len(items) - 1 else "    "
            tree_structure += generate_tree(path, prefix + extension)
    
    return tree_structure

# Generate the file structure starting from the root directory
file_structure = generate_tree(root_dir)

# Write the structure to the markdown file with UTF-8 encoding
with open(output_file, "w", encoding="utf-8") as file:
    def get_backend_file_structure():
        backend_dir = os.path.join(root_dir, "backend")
        return generate_tree(backend_dir)
    
    backend_file_structure = get_backend_file_structure()
    
    file.write("# Project File Structure\n\n")
    file.write("```\n")
    file.write(file_structure)
    file.write("```\n")
    
    file.write("\n# Backend File Structure\n\n")
    file.write("```\n")
    file.write(backend_file_structure)
    file.write("```\n")

print(f"File structure has been updated and saved to: {output_file}")
