import { parseTime } from "./checkHasConflicts";

type Section = {
    classDays: string[];
    classStart: string; // e.g., "10:30"
    classEnd: string;   // e.g., "12:00"
  };


const penaltyPrefarence = {
  idleTime:0.5,
  earlyStart:0.5,
  lateEnd:0.1,
  longDayStay:0.1,
  toManyClass:0.1,
  fridayClass: 1,
  saturdayClass:0.5,
  gapBetweenClass:0.3,
  activeClassDay:1.5
}
  
export function computeScore(routine: Section[],requirements:any): number {
    const daySlots: Record<string, [number, number][]> = {};
  
    for (const sec of routine) {
      for (const day of sec.classDays) {
        if (!daySlots[day]) {
          daySlots[day] = [];
        }
        const start = parseTime(sec.classStart);
        const end = parseTime(sec.classEnd);
        daySlots[day].push([start, end]);
      }
    }
  
    let score = 0;
    const activeDays = Object.keys(daySlots).length

    // penalty for too many active classes
    score += activeDays*penaltyPrefarence.activeClassDay

    for (const day in daySlots) {
      const slots = daySlots[day];
      slots.sort((a, b) => a[0] - b[0]);
  
      const firstStart = slots[0][0];
      const lastEnd = slots[slots.length - 1][1];
  
      const totalSpan = lastEnd - firstStart;
      const totalClassTime = slots.reduce((sum, [start, end]) => sum + (end - start), 0);
      const idleTime = totalSpan - totalClassTime;
  
      score += idleTime*penaltyPrefarence.idleTime;
      
      if (firstStart < parseTime(requirements.startTime)) {
        score += (parseTime(requirements.startTime) - firstStart)*penaltyPrefarence.earlyStart; // penalty for early morning
      }
  
      score += lastEnd * penaltyPrefarence.lateEnd; // encourage earlier finish

      // penalty for long day stay
      if(totalSpan > 5) score += (totalSpan - 5)*penaltyPrefarence.longDayStay
      // penalty for too many classes
      if(slots.length > 3) score += (slots.length -3)*penaltyPrefarence.toManyClass
      // penalty for weekend class
      if(['fri','sat'].includes(day)){
        score += day == 'fri' ? penaltyPrefarence.fridayClass:penaltyPrefarence.saturdayClass
      }
      // penalty for gap between classes
      for(let i = 0;i<slots.length-1;i++){
        const currentEnd = slots[i][1]
        const nextStart = slots[i+1][0]
        const gap = nextStart - currentEnd

        if(gap > 0.5 && currentEnd != 12.5){
          score += gap*penaltyPrefarence.gapBetweenClass
        }
      }
    }
  
    return Math.round(score * 100) / 100;
  }
  