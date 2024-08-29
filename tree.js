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

            let mid = arr.length / 2;
            let node = new Node(arr[mid]);

            node.left = build(array.splice(0, mid));
            node.right = build(array.splice(mid, +1))

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
      // root = this.root
      // key == value

      //add value to insert into the node
      //if the root is empty, return the value added first.
      if(node === null) return new Node(value);

      if(value < node.data){
        node.left = this.insert(value, node.left);
      }else if(value > node.data){
        node.right = this.insert(value, node.right);
      }
      prettyPrint(this.root);

      return node;
    }

    deleteItem(value , node = this.root){

    }
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };

function randomArray(size , max = 100){
    return Array.from({length: size}, () => Math.floor(Math.random() * max));
}
const randomNumbers = randomArray(15);  

const tree = new Tree(randomNumbers);
tree.insert(40);
tree.insert(50);
tree.insert(60);


