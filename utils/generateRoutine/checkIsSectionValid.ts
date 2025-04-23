import { parseTime } from "./checkHasConflicts";

export type CourseRequirement = {
    faculty: string[];     // e.g., ["SM", "TA"]
    section: number[];     // e.g., [1, 2]
  };
  
export  type GlobalRequirement = {
    days: string[];        // e.g., ["SUN", "MON"]
    startTime: string;     // e.g., "10:00"
    endTime: string;       // e.g., "18:00"
  };
  
export type Section = {
    facultyInitial: string;
    section: number;
    classDays: string[];
    classStart: string;     // e.g., "10:30"
    classEnd: string;       // e.g., "12:00"
  };
  
  
  // Main function
export function isSectionValid(
    sec: Section,
    courseReq: CourseRequirement,
    globalReq: GlobalRequirement
  ): boolean {
    if (courseReq.faculty.length > 0 && !courseReq.faculty.includes(sec.facultyInitial)) {
      return false;
    }
  
    if (courseReq.section.length > 0 && !courseReq.section.includes(sec.section)) {
      return false;
    }
  
    for (const d of sec.classDays) {
      if (!globalReq.days.includes(d)) {
        return false;
      }
    }
  
    const startBound = parseTime(globalReq.startTime) - 1.0;
    const endBound = parseTime(globalReq.endTime) + 1.0;
  
    const classStart = parseTime(sec.classStart);
    const classEnd = parseTime(sec.classEnd);
  
    return (
      startBound <= classStart &&
      classStart <= endBound &&
      startBound <= classEnd &&
      classEnd <= endBound
    );
  }
  