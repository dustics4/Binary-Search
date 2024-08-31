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

            node.left = build(array.splice(0, mid));
            node.right = build(array.splice(mid +1))

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

console.log("\nDeleting node with value 40:");
tree.deleteItem(40);
tree.prettyPrint();

console.log("\nDeleting node with value 50:");
tree.deleteItem(50);
tree.prettyPrint();

