export interface Examiner {
    id: number;
    name: string;
    location: string;
    snippet: string;
}

export interface Gouge {
    id: number;
    date: string;
    outcome: string;
    text: string;
}

// Define and export the Topic interface
export interface Topic {
    id: number;
    title: string;
    description: string;
    examiners: Examiner[];
    gouges: Gouge[];
}