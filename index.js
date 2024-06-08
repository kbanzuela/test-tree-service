const FamilyTreeService = require("./build/services/tree.service").default;
const Genders = require("./build/constants/genders").default;
const Relationships = require("./build/constants/relationships").default;

const familyTree = initializeTree();

console.log("Retrieving Darcy's Sisters In Law");
console.log(familyTree.getRelationship('Darcy', Relationships.SISTER_IN_LAW));
console.log('---------------------------------');

// add yourself to the tree
console.log('Adding Karlo to the tree...')
console.log(familyTree.addChild('Victoire', 'Karlo', Genders.MALE));
console.log('Retrieving Karlo\'s Maternal Aunts...');
console.log(familyTree.getRelationship('Karlo', Relationships.MATERNAL_AUNT));

function initializeTree() {
    const tree = new FamilyTreeService;

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

    return tree;
}

