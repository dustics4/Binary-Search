import Tree from "./tree.js";

function randomArray(size , max = 100){
    return Array.from({length: size}, () => Math.floor(Math.random() * max));
}
const randomNumbers = randomArray(15);  

const tree = new Tree(randomNumbers);



console.log("Initial tree:");
tree.prettyPrint();

console.log('Is Balanced:', tree.isBalanced());

// Rebalance the tree
console.log('Rebalancing Tree');
tree.rebalance();

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

console.log("\nPre-Order Traversal of the tree");
tree.preOrder((node) => console.log(node.data));

console.log("\nDepth of the Tree:");
const nodeToFind = tree.find(7); // Find the node with value 4
console.log(nodeToFind ? `Found node with data: ${nodeToFind.data}` : "Node not found");
const depthOfNode = tree.depth(nodeToFind);
console.log(depthOfNode);  