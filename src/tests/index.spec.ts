import Genders from "../constants/genders";
import Relationships from "../constants/relationships";
import FamilyTreeService from "../services/tree.service";
import FamilyTreeServiceInterface from "../services/tree.service.interface";

describe('Arthur Tree Tests', () => {

  let tree: FamilyTreeServiceInterface;

  beforeEach(() => {
    tree = new FamilyTreeService();

    // 1st genneration
    tree.addPerson('Queen Margret', Genders.FEMALE);
    tree.addSpouse('Queen Margret', 'King Arthur');
    tree.addChild('Queen Margret', 'Bill', Genders.MALE);
    tree.addChild('Queen Margret', 'Charlie', Genders.MALE);
    tree.addChild('Queen Margret', 'Percy', Genders.MALE);
    tree.addChild('Queen Margret', 'Ronald', Genders.MALE);
    tree.addChild('Queen Margret', 'Ginerva', Genders.FEMALE);

    tree.addSpouse('Bill', 'Flora');
    tree.addSpouse('Percy', 'Audrey');
    tree.addSpouse('Ronald', 'Helen');
    tree.addSpouse('Ginerva', 'Harry');

    // 2nd generation
    tree.addChild('Flora', 'Victoire', Genders.FEMALE);
    tree.addSpouse('Victoire', 'Ted');
    tree.addChild('Flora', 'Dominique', Genders.FEMALE);
    tree.addChild('Flora', 'Louis', Genders.MALE);

    tree.addChild('Audrey', 'Molly', Genders.FEMALE);
    tree.addChild('Audrey', 'Lucy', Genders.FEMALE);

    tree.addChild('Helen', 'Rose', Genders.FEMALE);
    tree.addSpouse('Rose', 'Malfoy');
    tree.addChild('Helen', 'Hugo', Genders.MALE);

    tree.addChild('Ginerva', 'James', Genders.MALE);
    tree.addSpouse('James', 'Darcy');
    tree.addChild('Ginerva', 'Albus', Genders.MALE);
    tree.addSpouse('Albus', 'Alice');
    tree.addChild('Ginerva', 'Lily', Genders.FEMALE);

    // 3rd generation
    tree.addChild('Victoire', 'Remus', Genders.MALE);
    tree.addChild('Rose', 'Draco', Genders.MALE);
    tree.addChild('Rose', 'Aster', Genders.FEMALE);
    tree.addChild('Darcy', 'William', Genders.MALE);
    tree.addChild('Alice', 'Ron', Genders.MALE);
    tree.addChild('Alice', 'Ginny', Genders.FEMALE);

  });

  // sample cases
  it('Get Remus Maternal Aunts', () => {
    const relationships = tree.getRelationship('Remus', Relationships.MATERNAL_AUNT);
    expect(relationships).toContain('Dominique');
  });

  it('Get Dominique Maternal Uncles', () => {
    const relationships = tree.getRelationship('Dominique', Relationships.MATERNAL_UNCLE);
    expect(relationships).toEqual([]);
  });

  it('Get Molly Paternal Aunts', () => {
    const relationships = tree.getRelationship('Molly', Relationships.PATERNAL_AUNT);
    expect(relationships).toEqual(['Ginerva']);
  });

  it('Darcy Sister in Law', () => {
    const relationships = tree.getRelationship('Darcy', Relationships.SISTER_IN_LAW);
    expect(relationships).toEqual(['Alice', 'Lily']);
  });

});