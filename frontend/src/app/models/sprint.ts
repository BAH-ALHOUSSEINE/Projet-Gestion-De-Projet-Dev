// src/app/models/sprint.ts
export interface Sprint {
    _id: string;
    name: string;
    startDate: Date;
    endDate: Date;
    projectId: string;
    tasks: string[];
  }
  