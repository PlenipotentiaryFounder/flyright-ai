import { Reference } from '../../types/generalTypes';

export function extractTitle(resource: string | Reference): string {
  if (typeof resource === 'string') {
    // If the resource is a string, return the first line or the whole string if there are no line breaks
    const firstLine = resource.split('\n')[0];
    return firstLine.trim();
  } else if (resource && typeof resource === 'object' && 'title' in resource) {
    // If the resource is a Reference object, return its title property
    return resource.title;
  }
  // If the resource is neither a string nor a Reference object with a title, return an empty string
  return '';
}

export function extractContent(resource: string | Reference): string {
  if (typeof resource === 'string') {
    // If the resource is a string, return everything after the first line
    const lines = resource.split('\n');
    return lines.slice(1).join('\n').trim();
  } else if (resource && typeof resource === 'object' && 'content' in resource) {
    // If the resource is a Reference object, return its content property
    return resource.content;
  }
  // If the resource is neither a string nor a Reference object with content, return an empty string
  return '';
}