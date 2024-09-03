import Tree from "./tree.js";

function randomArray(size , max = 100){
    return Array.from({length: size}, () => Math.floor(Math.random() * max));
}
const randomNumbers = randomArray(15);  

const tree = new Tree(randomNumbers);
tree.prettyPrint()
tree.insert(30);
tree.insert(40);
tree.insert(50);
console.log("Initial tree:");
tree.prettyPrint();

console.log("\nDeleting node with value 30:");
tree.deleteItem(30);
tree.prettyPrint();

console.log("\nHeight of the tree:");
console.log(tree.height(tree.root));

console.log("Test Case 1: Search for an existing value (e.g., 30)");
const foundNode1 = tree.find(29);
console.log(foundNode1 ? `Found: ${foundNode1.data}` : "Not Found"); // Expected : Not Found

console.log("\nLevel order traversal of the tree:");
tree.levelOrder((node) => console.log(node.data)); // Pass a callback that logs the data of each node

console.log("\nIn-Order Traversal of the tree:");
tree.inOrder((node) => console.log(node.data)); // Pass a callback that logs the data of each node

console.log("\nPost-Order Traversal of the tree");
tree.postOrder((node) => console.log(node.data))