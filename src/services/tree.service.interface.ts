import Genders from "../constants/genders";
import Relationships from "../constants/relationships";
import Person from "../models/person";

/**
 * Provides an interface for managing a family tree, including adding persons, spouses, and children, as well as retrieving information about the tree and its members.
 */
interface FamilyTreeServiceInterface {
    /**
     * Adds a new person to the family tree with the specified name and gender.
     * @param name - The name of the new person.
     * @param gender - The gender of the new person.
     * @returns The newly created person.
     */
    addPerson(name: string, gender: Genders): Person;

    /**
     * Adds a new spouse to the family tree, linking the specified persons.
     * @param personName - The name of the person to whom the new spouse will be added.
     * @param spouseName - The name of the new spouse.
     * @returns The newly created spouse.
     */
    addSpouse(personName: string, spouseName: string): Person;

    /**
     * Adds a new child to the family tree, linking the child to the specified parent.
     * @param personName - The name of the parent to whom the new child will be added.
     * @param childName - The name of the new child.
     * @param gender - The gender of the new child.
     * @returns The newly created child.
     */
    addChild(personName: string, childName: string, gender: Genders): Person;

    /**
     * Retrieves all persons in the family tree that have the specified relationship to the given person.
     * @param personName - The name of the person to find the relationships for.
     * @param relationship - The type of relationship to search for.
     * @returns An array of persons with the specified relationship.
     */
    getRelationship(personName: string, relationship: Relationships): String[];

    /**
     * Retrieves the person in the family tree with the specified name.
     * @param name - The name of the person to retrieve.
     * @returns The person with the specified name.
     */
    getPerson(name: string): Person;

    /**
     * Retrieves the entire family tree as a map of person names to person objects.
     * @returns The family tree as a map.
     */
    getTree(): Map<string, Person>;
}

export default FamilyTreeServiceInterface;