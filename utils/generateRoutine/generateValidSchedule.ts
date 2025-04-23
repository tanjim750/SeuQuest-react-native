import { hasConflicts } from "./checkHasConflicts";
import { CourseRequirement, GlobalRequirement, isSectionValid } from "./checkIsSectionValid";
import { computeScore } from "./coumputScore";
import { allCombination } from "./makeAllCombination";
import { selected_courses } from "./selectedCourses";

export type Section = {
    courseCode: string;
    section: number;
    facultyName: string;
    facultyInitial: string;
    facultyDepartment: string;
    classStart: string;
    classEnd: string;
    classDays: string[];
  };
  
export type Course = {
    courseCode: string;
    credits: number;
    isLab: boolean;
    sections: Section[];
  };
  
  type Requirements = {
    [courseCode: string]: {
      faculty?: string[];
      section?: number[];
    };
  };
  
  function cartesianProduct<T>(...arrays: T[][]): T[][] {
    return arrays.reduce<T[][]>(
      (a, b) =>
        a.flatMap(d => b.map(e => [...d, e])),
      [[]]
    );
  }
  
  export function generateValidSchedules(
    requirements: any,
    courses: Course[]
  ): [number, Section[]][] {
    const validSectionsPerCourse: Section[][] = [];
  
    for (const course of courses) {
      const title = course.courseCode;
      const courseReq:any = requirements[title] || { faculty: [], section: [] };
  
      const filtered = course.sections
        .filter(sec => isSectionValid(sec, courseReq, requirements))
        .map(sec => ({ ...sec, courseCode: title }));
  
      if (filtered.length === 0) {
        return []; // No valid sections = no possible schedules
      }
  
      validSectionsPerCourse.push(filtered);
    }

    const allCombos = allCombination(validSectionsPerCourse);
    const validRoutines: [number, Section[]][] = [];
  
    for (const combo of allCombos) {
      if (!hasConflicts(combo)) {
        const score = computeScore(combo,requirements);
        validRoutines.push([score, combo]);
      }
    }
  
    validRoutines.sort((a, b) => a[0] - b[0]);
    return validRoutines;
  }
  