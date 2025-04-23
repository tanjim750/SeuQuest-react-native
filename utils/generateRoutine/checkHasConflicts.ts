type ScheduleItem = {
    classDays: string[];
    classStart: string;  // Format: "HH:MM"
    classEnd: string;
    courseCode: string;
  };

export function parseTime(t:string) {
    return parseFloat(t.replace(":", "."));
  }
  
export function timeOverlap(start1:number, end1:number, start2:number, end2:number) {
    return !(end1 <= start2 || end2 <= start1);
  }
  
export function hasConflicts(schedule: ScheduleItem[]): boolean {
    const daySlots: { [day: string]: [number, number, string][] } = {};
  
    for (const sec of schedule) {
      for (const day of sec.classDays) {
        if (!daySlots[day]) daySlots[day] = [];
        daySlots[day].push([
          parseTime(sec.classStart),
          parseTime(sec.classEnd),
          sec.courseCode
        ]);
      }
    }
  
    for (const slots of Object.values(daySlots)) {
      for (let i = 0; i < slots.length; i++) {
        for (let j = i + 1; j < slots.length; j++) {
          const [start1, end1] = slots[i];
          const [start2, end2] = slots[j];
          if (timeOverlap(start1, end1, start2, end2)) {
            return true;
          }
        }
      }
    }
  
    return false;
  }
  