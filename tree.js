import Node from "./node.js";

class Tree{
    constructor(array){
        this.root = this.buildTree(array); 
    }

    buildTree(array){
        //create a sorted array ( use .. Set)
        const sortedArray = [...new Set((array).sort((a,b) => a - b))] //removes duplicates and sorts
        //create function build/ takes in arr
        //base case - length of array === 0 return null
        //calculate the mid
        //let node = new Node(array[mid])

        //node.left = // recursive function
        //node.right = // recursive function

        //return the node

        const build = (arr) => {
            if(arr.length === 0) return null;

            let mid = Math.floor(arr.length / 2);
            let node = new Node(arr[mid]);

            node.left = build(arr.slice(0, mid));
            node.right = build(arr.slice(mid +1))

            return node
        }

        return build(sortedArray);
        //return build (sortedarray);
    }
//will insert a value in to the tree
    insert(value, node = this.root){
      //check current value with node value
      // if value is less than node value , move to the left subtree
      //else move the value to the right tree.

      //add value to insert into the node
      //if the root is empty, return the value added first.
      if(node === null) return new Node(value);

      if(value < node.data){
        node.left = this.insert(value, node.left);
      }else if(value > node.data){
        node.right = this.insert(value, node.right);
      }
      return node;
    }

    deleteItem(value , node = this.root){
      if(node === null) return null;
      //A check makde to see if the value is less than the current nodes value, to search the left tree.
      if(value < node.data){
        node.left = this.deleteItem(value , node.left);
      }else if ( value > node.data){
        node.right = this.deleteItem(value , node.right);
      }else{
      //if the node to delete is found
          if(node.left === null) return node.right;
          if(node.right === null) return node.left;
      
      //we find the smallest value in the right subtree
          node.data = this.minValue(node.right);

      //we delete the smallest value as it has been copied
          node.right = this.deleteItem(node.data, node.right);
      }
      //return the node to maintain the tree's links
      return node;
    }
//successor finction, find's the smallest value in tree
    minValue(node){
      let current = node;

      while(current.left !== null){
        current = current.left //traverse until the left most child
      }
      return current.data //return the smallest value
    }
//function to find node in the tree
    find(value , node = this.root){
      //If node is null return node 
      //And node value is equal to value return node
      if(node === null) return null;

      if(node.data === value) return node;
      //only if the value is less than the current node value search in left, else search in right
      //search in left node recursively
      //search in  right node  recursively
      if(value < node.data){
        return this.find(value, node.left);
      }
      else
      {
        return this.find(value, node.right);
      }
    }

    levelOrder(callback , node = this.root){
      if(!callback) throw new Error ("Callback function required"); // To ensure a callback is provided

      let queue = [node]; // Initialize the queue with root node
      //traverse the queue
      while(queue.length > 0){
        let currentNode = queue.shift(); //dequeue the front node

        callback(currentNode); //Process the current node with the provided callback

        if(currentNode.left !== null){ //enqueue left child
          queue.push(currentNode.left)
        }
        if(currentNode.right !== null){ //enqueue right child
          queue.push(currentNode.right);
        }
      }
    }

    inOrder(callback, node = this.root){
      if(!callback) throw new Error ('Callback function required'); // To ensure a callback is provided
      if(node === null) return;

      this.inOrder(callback , node.left);
      callback(node);
      this.inOrder(callback, node.right);

    }
//returns the given node’s height. 
    height(node){
      //check if node is null - return -1 for the height
      if(node === null) return -1;

      const leftHeight = this.height(node.left);
      const rigthHeight = this.height(node.right);
      //recursively calculate the left subtree height
      // then the right subtree
      return Math.max(leftHeight, rigthHeight) + 1;
      //use math.max to calculate the hight, and add +1 to the height to calculate the node
    }

    prettyPrint(node = this.root, prefix = "", isLeft = true) {
      if(node === null) return;
      if (node.right !== null) {
        this.prettyPrint(node.left, `${prefix}${isLeft ? '|   ' : '    '}`, false)
      }
      console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
      if (node.left !== null) {
        this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '|   '}`, true)
      }
    }
}


function randomArray(size , max = 100){
    return Array.from({length: size}, () => Math.floor(Math.random() * max));
}
const randomNumbers = randomArray(15);  
const randomNumbersTest = [22, 15, 34, 7, 18, 45, 3, 26, 39, 50, 11, 55, 17, 2, 9];


const tree = new Tree(randomNumbersTest);
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
console.log(foundNode1 ? `Found: ${foundNode1.data}` : "Not Found"); //Not Found

console.log("\nLevel order traversal of the tree:");
tree.levelOrder((node) => console.log(node.data)); // Pass a callback that logs the data of each node

console.log("\nIn-Order Traversal of the tree:");
tree.inOrder((node) => console.log(node.data)); // Pass a callback that logs the data of each node