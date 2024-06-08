import Genders from "../constants/genders";
import Relationships from "../constants/relationships";
import FamilyTreeService from "./tree.service";

describe('FamilyTreeService', () => {
  let service: FamilyTreeService;

  beforeEach(() => {
    service = new FamilyTreeService();
  });

  describe('addPerson', () => {
    it('should add a new person to the tree', () => {
      const person = service.addPerson('John', Genders.MALE);
      expect(person.name).toBe('John');
      expect(person.gender).toBe(Genders.MALE);
      expect(service.getTree().size).toBe(1);
    });

    it('should throw an error if the person already exists', () => {
      service.addPerson('John', Genders.MALE);
      expect(() => service.addPerson('John', Genders.MALE)).toThrow('Person already exists');
    });
  });

  describe('getPerson', () => {
    it('should return the person if they exist', () => {
      const person = service.addPerson('John', Genders.MALE);
      const retrievedPerson = service.getPerson('John');
      expect(retrievedPerson).toEqual(person);
    });

    it('should throw an error if the person does not exist', () => {
      expect(() => service.getPerson('John')).toThrow("Person John doesn't exist");
    });
  });

  describe('getTree', () => {
    it('should return an empty Map when no members are added', () => {
      const tree = service.getTree();
      expect(tree).toBeInstanceOf(Map);
      expect(tree.size).toBe(0);
    });

    it('should return a Map containing all added members', () => {
      const person1 = service.addPerson('John', Genders.MALE);
      const person2 = service.addPerson('Jane', Genders.FEMALE);
      const tree = service.getTree();
      expect(tree.size).toBe(2);
      expect(tree.has(person1.name)).toBe(true);
      expect(tree.has(person2.name)).toBe(true);
    });
  });

  describe('addSpouse', () => {
    it('should add a new spouse to an existing person', () => {
      let person = service.addPerson('John', Genders.MALE);
      const spouse = service.addSpouse('John', 'Jane');
      expect(spouse.name).toBe('Jane');
      expect(spouse.gender).toBe(Genders.FEMALE);
      expect(person.spouse).toEqual(spouse);
      expect(spouse.spouse).toEqual(person);
    });

    it('should throw an error if the spouse already exists', () => {
      service.addPerson('John', Genders.MALE);
      service.addPerson('Jane', Genders.FEMALE);
      expect(() => service.addSpouse('John', 'Jane')).toThrow('Spouse already exists');
    });

    it('should throw an error if the person already has a spouse', () => {
      const person = service.addPerson('John', Genders.MALE);
      service.addSpouse('John', 'Jane');
      expect(() => service.addSpouse('John', 'Mary')).toThrow('Person already has a spouse');
    });
  });

  describe('addChild', () => {
    it('should add a new child to an existing female person', () => {
      const mother = service.addPerson('Jane', Genders.FEMALE);
      const child = service.addChild('Jane', 'John', Genders.MALE);
      expect(child.name).toBe('John');
      expect(child.gender).toBe(Genders.MALE);
      expect(child.mother).toEqual(mother);
      expect(mother.children).toContain(child);
    });

    it('should throw an error if the child already exists', () => {
      service.addPerson('Jane', Genders.FEMALE);
      service.addChild('Jane', 'John', Genders.MALE);
      expect(() => service.addChild('Jane', 'John', Genders.MALE)).toThrow('Child already exists');
    });

    it('should throw an error if the person is not female', () => {
      const father = service.addPerson('John', Genders.MALE);
      expect(() => service.addChild('John', 'Jane', Genders.FEMALE)).toThrow('Person is not female');
      expect(father.children.length).toBe(0);
    });

  });

  describe('getRelationship', () => {
    it('should throw an error if the person does not exist', () => {
      expect(() => service.getRelationship('John', Relationships.SON)).toThrow('Person John does not exist.');
    });

    it('should return an empty array if the person has no sons', () => {
      const mother = service.addPerson('Jane', Genders.FEMALE);
      const sons = service.getRelationship('Jane', Relationships.SON);
      expect(sons).toEqual([]);
    });

    it('should return an array of sons for a person', () => {
      const mother = service.addPerson('Jane', Genders.FEMALE);
      const son1 = service.addChild('Jane', 'John', Genders.MALE);
      const son2 = service.addChild('Jane', 'Michael', Genders.MALE);
      const sons = service.getRelationship('Jane', Relationships.SON);
      expect(sons).toContainEqual(son1?.name);
      expect(sons).toContainEqual(son2?.name);
    });

    it('should return an empty array if the person has no daughters', () => {
      const father = service.addPerson('John', Genders.MALE);
      const daughters = service.getRelationship('John', Relationships.DAUGHTER);
      expect(daughters).toEqual([]);
    });

    it('should return an array of daughters for a person', () => {
      const mother = service.addPerson('Jane', Genders.FEMALE);
      const daughter1 = service.addChild('Jane', 'Emily', Genders.FEMALE);
      const daughter2 = service.addChild('Jane', 'Sarah', Genders.FEMALE);
      const daughters = service.getRelationship('Jane', Relationships.DAUGHTER);
      expect(daughters).toContainEqual(daughter1?.name);
      expect(daughters).toContainEqual(daughter2?.name);
    });

    it('should return siblings for a person', () => {
      const mother = service.addPerson('Jane', Genders.FEMALE);
      const child1 = service.addChild('Jane', 'John', Genders.MALE);
      const child2 = service.addChild('Jane', 'Michael', Genders.MALE);
      const siblings = service.getRelationship('John', Relationships.SIBLINGS);
      expect(siblings).toContainEqual(child2?.name);
      expect(siblings).toHaveLength(1);
    });

    it('should return paternal uncles for a person', () => {
      const grandmother = service.addPerson('Jane', Genders.FEMALE);
      const father = service.addChild('Jane', 'Michael', Genders.MALE);
      const mother = service.addSpouse('Michael', 'Conny');
      const uncle1 = service.addChild('Jane', 'David', Genders.MALE);
      const uncle2 = service.addChild('Jane', 'Robert', Genders.MALE);
      const child = service.addChild('Conny', 'Emily', Genders.FEMALE);
      const paternalUncles = service.getRelationship('Emily', Relationships.PATERNAL_UNCLE);
      expect(paternalUncles).toContainEqual(uncle1?.name);
      expect(paternalUncles).toContainEqual(uncle2?.name);
      expect(paternalUncles).toHaveLength(2);
    });

    it('should return maternal uncles for a person', () => {
      const grandmother = service.addPerson('Jane', Genders.FEMALE);
      const mother = service.addChild('Jane', 'Emily', Genders.FEMALE);
      const uncle1 = service.addChild('Jane', 'David', Genders.MALE);
      const uncle2 = service.addChild('Jane', 'Robert', Genders.MALE);
      const child = service.addChild('Emily', 'Sarah', Genders.FEMALE);
      const maternalUncles = service.getRelationship('Sarah', Relationships.MATERNAL_UNCLE);
      expect(maternalUncles).toContainEqual(uncle1.name);
      expect(maternalUncles).toContainEqual(uncle2.name);
      expect(maternalUncles).toHaveLength(2);
    });

    it('should return paternal aunts for a person', () => {
      const grandmother = service.addPerson('Jane', Genders.FEMALE);
      const father = service.addChild('Jane', 'Michael', Genders.MALE);
      const mother = service.addSpouse('Michael', 'Conny');
      const aunt1 = service.addChild('Jane', 'Emily', Genders.FEMALE);
      const aunt2 = service.addChild('Jane', 'Sarah', Genders.FEMALE);
      const child = service.addChild('Conny', 'David', Genders.MALE);
      const paternalAunts = service.getRelationship('David', Relationships.PATERNAL_AUNT);
      expect(paternalAunts).toContainEqual(aunt1?.name);
      expect(paternalAunts).toContainEqual(aunt2?.name);
      expect(paternalAunts).toHaveLength(2);
    });

    it('should return maternal aunts for a person', () => {
      const grandmother = service.addPerson('Jane', Genders.FEMALE);
      const mother = service.addChild('Jane', 'Emily', Genders.FEMALE);
      const aunt1 = service.addChild('Jane', 'Sarah', Genders.FEMALE);
      const aunt2 = service.addChild('Jane', 'Jessica', Genders.FEMALE);
      const child = service.addChild('Emily', 'David', Genders.MALE);
      const maternalAunts = service.getRelationship('David', Relationships.MATERNAL_AUNT);
      expect(maternalAunts).toContainEqual(aunt1?.name);
      expect(maternalAunts).toContainEqual(aunt2?.name);
      expect(maternalAunts).toHaveLength(2);
    });

    it('should return sisters-in-law for a person', () => {
      const mother = service.addPerson('Jane', Genders.FEMALE);
      const spouse = service.addChild('Jane', 'Lara', Genders.FEMALE);
      const sisterInLaw1 = service.addChild('Jane', 'Emily', Genders.FEMALE);
      const sisterInLaw2 = service.addChild('Jane', 'Sarah', Genders.FEMALE);
      const brotherInLaw1 = service.addChild('Jane', 'Kurt', Genders.MALE);
      const brotherInLaw2 = service.addChild('Jane', 'Russel', Genders.MALE);
      service.addSpouse('Kurt', 'Fiona');
      service.addSpouse('Lara', 'Michael');
      const sistersInLaw = service.getRelationship('Michael', Relationships.SISTER_IN_LAW);
      expect(sistersInLaw).toContainEqual(sisterInLaw1.name);
      expect(sistersInLaw).toContainEqual(sisterInLaw2.name);
      expect(sistersInLaw).toContainEqual(brotherInLaw1.spouse?.name);
      expect(sistersInLaw).toHaveLength(3);
    });

    it('should return brothers-in-law for a person', () => {
      const mother = service.addPerson('Jane', Genders.FEMALE);
      const spouse = service.addChild('Jane', 'Lara', Genders.FEMALE);
      const sisterInLaw1 = service.addChild('Jane', 'Emily', Genders.FEMALE);
      const sisterInLaw2 = service.addChild('Jane', 'Sarah', Genders.FEMALE);
      const brotherInLaw1 = service.addChild('Jane', 'Kurt', Genders.MALE);
      const brotherInLaw2 = service.addChild('Jane', 'Russel', Genders.MALE);
      service.addSpouse('Emily', 'Jack');
      service.addSpouse('Lara', 'Michael');
      const brothersInLaw = service.getRelationship('Michael', Relationships.BROTHER_IN_LAW);
      expect(brothersInLaw).toContainEqual(brotherInLaw1.name);
      expect(brothersInLaw).toContainEqual(brotherInLaw2.name);
      expect(brothersInLaw).toContainEqual(sisterInLaw1.spouse?.name);
      expect(brothersInLaw).toHaveLength(3);
    });

    it('should throw an error for unknown relationship', () => {
      const person = service.addPerson('John', Genders.MALE);
      expect(() => service.getRelationship('John', 'UNKNOWN_RELATIONSHIP' as Relationships)).toThrow('Unknown relationship UNKNOWN_RELATIONSHIP.');
    });
  });

});