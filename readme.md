# Family Tree Project

This project is a TypeScript implementation of a family tree data structure and related functionality. It allows you to create and manage a family tree by adding people, spouses, and children, as well as retrieving information about the relationships between members of the family.

## Features

- Add new people to the family tree with their name and gender
- Add spouses to existing people
- Add children to existing people
- Retrieve information about individual people or the entire family tree
- Retrieve information about the relationships between people
- Enforces data integrity by preventing duplicate entries and invalid relationships

## Installation

1. Extract contents to desired folder
2. Navigate to the project director
3. Install dependencies

```
npm install

```

Usage
-----

1.  Import the `FamilyTreeService` class:

```
import FamilyTreeService from './services/tree.service';

```

2.  Create an instance of the `FamilyTreeService`:

```
const familyTree = new FamilyTreeService();

```

3.  Use the available methods to manage the family tree:

```
// Add a new person
const john = familyTree.addPerson('John', Genders.MALE);

// Add a spouse
const jane = familyTree.addSpouse('John', 'Jane');

// Add a child
const bob = familyTree.addChild('Jane', 'Bob', Genders.MALE);

// Get a person
const johnPerson = familyTree.getPerson('John');

// Get the entire family tree
const tree = familyTree.getTree();

```

Project Structure
-----------------

-   `src/models/person.ts`: Defines the `Person` class, which represents an individual in the family tree.
-   `src/constants/genders.ts`: Defines the `Genders` enum for representing gender values.
-   `src/constants/relationships.ts`: Defines the `Relationships` enum for representing different types of relationships between family members.
-   `src/services/tree.service.ts`: Implements the `FamilyTreeService` class, which provides methods for managing the family tree.
-   `src/services/tree.service.interface.ts`: Defines the `FamilyTreeServiceInterface` interface, which specifies the contract for the `FamilyTreeService` class.

Testing
-----------------
You can run existing tests using `npm run test`

Execution
-----------------
1. Build Typescript files using `npm run build`
2. Execute index.js file using `npm run start`

Ownership
-----------------
Developed by Karlo Banzuela for Senior Software Engineer Application
