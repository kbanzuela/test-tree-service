import Genders from "../constants/genders";
import Relationships from "../constants/relationships";
import Person from "../models/person";
import FamilyTreeServiceInterface from "./tree.service.interface";
import _, { Many } from "lodash";

class FamilyTreeService implements FamilyTreeServiceInterface {

    private members: Map<string, Person> = new Map();

    /**
     * Adds a new person to the family tree.
     *
     * @param name - The name of the person to add.
     * @param gender - The gender of the person to add.
     * @returns The newly created person.
     * @throws {Error} If a person with the given name already exists in the family tree.
     */
    public addPerson(name: string, gender: Genders): Person {
        if (!this.members.has(name)) {
            const person = new Person(name, gender);
            this.members.set(name, person);
            return person;
        } else {
            throw new Error("Person already exists");
        }
    }

    /**
     * Retrieves a person from the family tree by their name.
     *
     * @param name - The name of the person to retrieve.
     * @returns The person with the given name.
     * @throws {Error} If the person does not exist in the family tree.
     */
    public getPerson(name: string): Person {
        const person = this.members.get(name);
        if (person) {
            return person;
        } else {
            throw new Error(`Person ${name} doesn't exist`);
        }
    }

    /**
     * Retrieves the entire family tree, represented as a map of people.
     *
     * @returns The family tree, where the keys are the names of the people and the values are the corresponding `Person` objects.
     */
    public getTree() {
        return this.members;
    }

    /**
     * Adds a spouse to an existing person in the family tree.
     *
     * @param personName - The name of the person to add a spouse for.
     * @param spouseName - The name of the new spouse.
     * @returns The newly created spouse.
     * @throws {Error} If the spouse already exists or the person already has a spouse.
     */
    public addSpouse(personName: string, spouseName: string): Person {
        if (this.members.has(spouseName)) {
            throw new Error("Spouse already exists");
        }

        const existingPerson = this.getPerson(personName);
        if (existingPerson.spouse) {
            throw new Error("Person already has a spouse");
        }

        const spouse = this.addPerson(spouseName, existingPerson.gender === Genders.MALE ? Genders.FEMALE : Genders.MALE)
        spouse.spouse = existingPerson;
        existingPerson.spouse = spouse;

        return spouse;
    }

    /**
     * Adds a child to an existing person in the family tree.
     *
     * @param personName - The name of the person to add a child for.
     * @param childName - The name of the new child.
     * @param gender - The gender of the new child.
     * @returns The newly created child.
     * @throws {Error} If the child already exists or the person is not female.
     */
    public addChild(personName: string, childName: string, gender: Genders): Person {
        if (this.members.has(childName)) {
            throw new Error("Child already exists");
        }

        const existingPerson = this.getPerson(personName);

        if (existingPerson.gender !== Genders.FEMALE) {
            throw new Error("Person is not female");
        }

        const child = this.addPerson(childName, gender);
        existingPerson.children.push(child);
        child.mother = existingPerson;

        return child;
    }


    /**
     * Gets the list of people related to the specified person by the given relationship.
     *
     * @param personName - The name of the person to get the relationship for.
     * @param relationship - The type of relationship to get.
     * @returns An array of people related to the specified person by the given relationship.
     * @throws {Error} If the person does not exist or the relationship is unknown.
     */
    public getRelationship(personName: string, relationship: Relationships): String[] {
        const person = this.members.get(personName);
        if (!person) {
            throw new Error(`Person ${personName} does not exist.`);
        }

        switch (relationship) {
            case Relationships.SON:
                return _.chain(person.getSons())
                    .sortBy('createdAt')
                    .map('name')
                    .value();
            case Relationships.DAUGHTER:
                return _.chain(person.getDaughters())
                    .sortBy('createdAt')
                    .map('name')
                    .value();
            case Relationships.SIBLINGS:
                return _.chain(person.getSiblings())
                    .sortBy('createdAt')
                    .map('name')
                    .value();
            case Relationships.PATERNAL_UNCLE: // Father's Brothers
                return _.chain(person.getFather()?.getBrothers())
                    .sortBy('createdAt')
                    .map('name')
                    .value() || [];
            case Relationships.MATERNAL_UNCLE: // Mother's Brothers
                return _.chain(person.mother?.getBrothers())
                    .sortBy('createdAt')
                    .map('name')
                    .value() || [];
            case Relationships.PATERNAL_AUNT: // Father's Sisters
                return _.chain(person.getFather()?.getSisters())
                    .sortBy('createdAt')
                    .map('name')
                    .value() || [];
            case Relationships.MATERNAL_AUNT: // Mother's Sisters
                return _.chain(person.mother?.getSisters())
                    .sortBy('createdAt')
                    .map('name')
                    .value() || [];
            case Relationships.SISTER_IN_LAW: // Spouse's Sisters + Wives of spouse siblings
                return _.chain(person.spouse?.getSisters())
                    .concat(
                        person.spouse?.getBrothers()
                            .filter((brother: Person) => brother.spouse)
                            .map(brother => brother.spouse) as Many<Person>
                    )
                    .sortBy('createdAt')
                    .map('name')
                    .value();
            case Relationships.BROTHER_IN_LAW: // Spouse's Brothers + Husbands of spouse siblings
                return _.chain(person.spouse?.getBrothers())
                    .concat(
                        person.spouse?.getSisters()
                            .filter(sister => sister.spouse)
                            .map(sister => sister.spouse) as Many<Person>
                    )
                    .sortBy('createdAt')
                    .map('name')
                    .value();
            default:
                throw new Error(`Unknown relationship ${relationship}.`);
        }
    }
}

export default FamilyTreeService;