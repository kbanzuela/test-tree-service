import Genders from "../constants/genders";

class Person {
    name: string;
    gender: string;
    mother: Person | null = null;
    spouse: Person | null = null;
    children: Person[] = [];
    createdAt: bigint;

    constructor(name: string, gender: string) {
        this.name = name;
        this.gender = gender;
        this.createdAt = process.hrtime.bigint();
    }

    getSons(): Person[] {
        return this.children.filter(child => child.gender === Genders.MALE) || [];
    }

    getDaughters(): Person[] {
        return this.children.filter(child => child.gender === Genders.FEMALE) || [];
    }

    getSiblings(): Person[] {
        const siblings = this.mother?.children || [];
        return siblings.filter(sibling => sibling.name !== this.name) || [];
    }

    getBrothers(): Person[] {
        return this.getSiblings().filter(sibling => sibling.gender === Genders.MALE) || [];
    }

    getSisters(): Person[] {
        return this.getSiblings().filter(sibling => sibling.gender === Genders.FEMALE) || [];
    }

    getFather(): Person | null {
        if (this.mother) {
            return this.mother.spouse || this.mother;
        }
        return null;
    }

}

export default Person;