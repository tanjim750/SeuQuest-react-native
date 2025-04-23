import { Section } from "./checkIsSectionValid";

export const allCombination = (courses:Section[][]) => {
    return courses.reduce((acc:any, curr:any) => {
        return acc.flatMap((a:any) => curr.map((b:any) => [...a, b]));
    }, [[]]);
}