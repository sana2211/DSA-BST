class BinarySearchTree {
    constructor(key = null, value = null, parent = null) {
      this.key = key;
      this.value = value;
      this.parent = parent;
      this.left = null;
      this.right = null;
    }
  
    insert(key, value) {
      //BigO notation: Average case: O(log(n)), worse case (unbalanced tree): O(n)
      //Best case: O(1), empty tree
      // If the tree is empty then this key being inserted is the root node of the tree
      if (this.key === null) {
        this.key = key;
        this.value = value;
      } else if (key < this.key)
      {     
        if (this.left === null) {
          this.left = new BinarySearchTree(key, value, this);
        } else {
           this.left.insert(key, value);
        }
      }
      // Similarly, if the new key is greater than the node's key
      //  then you do the same thing, but on the right-hand side
      else {
        if (this.right === null) 
        {
          this.right = new BinarySearchTree(key, value, this);
        } else 
        {
          this.right.insert(key, value);
        }
      }
    }
    find(key) {
      //BigO notation: Best: O(1) root key === key Average: O(log(n)) don't have to search
      //all the data Worst: O(n), very unbalanced tree
      //check if this.key === key
      // If the item is found at the root then return that value
      if (this.key === key) {
        return this.value;
      } 
      else if (key < this.key && this.left) 
      {        
        return this.left.find(key);
      } 
      else if (key > this.key && this.right)
      {        
        return this.right.find(key);
      }
      // You have searched the tree and the item is not in the tree
      else {
        throw new Error("Key Error");
      }
    }
    remove(key) {
      // BigO notation: Best Case: O(1) - the node is the root
      // Average case: O(log(n)) b/c we are dealing w/ BST. Worst Case O(n): We have a very uneven BST
      //3 scenarios: No children, 1 child, 2 children
      if (this.key === key) {
        if (this.left && this.right) {
          const successor = this.right._findMin();
          this.key = successor.key;
          this.value = successor.value;
          successor.remove(successor.key);
        } else if (this.left) 
        {
          this._replaceWith(this.left);
        } 
        else if (this.right) 
        {
          this._replaceWith(this.right);
        }
         else
        {      
          this._replaceWith(null);
        }
      } else if (key < this.key && this.left) 
      {
        this.left.remove(key);
      }
       else if (key > this.key && this.right)
      {
        this.right.remove(key);
      } else 
      {
        throw new Error("Key Error");
      }
    }
    _replaceWith(node) {
      if (this.parent) {
        if (this === this.parent.left) {
          this.parent.left = node;
        } else if (this === this.parent.right) {
          this.parent.right = node;
        }
  
        if (node) {
          node.parent = this.parent;
        }
      } else {
        if (node) {
          this.key = node.key;
          this.value = node.value;
          this.left = node.left;
          this.right = node.right;
        } else {
          this.key = null;
          this.value = null;
          this.left = null;
          this.right = null;
        }
      }
    }
  
    _findMin() {
      if (!this.left) {
        return this;
      }
      return this.left._findMin();
    }
  }
  
  // What does this program do?
  function tree(t) {
    if (!t) {
      return 0;
    }
    return tree(t.left) + t.value + tree(t.right);
  }
  // ANS: Adds up all of the node values of a given tree recursively
  
  // Height of a BST
  // Run time: O(n), because it is iterating through all nodes to find the height
  function heightOfBST(bst) {
    let leftHeight = 0;
    let rightHeight = 0;
    if (!bst) 
    {
      return 0;
    }
    else
    {
      leftHeight = heightOfBST(bst.left);
      rightHeight = heightOfBST(bst.right);
      if (leftHeight > rightHeight)
      {
        return leftHeight + 1;
      } else 
      {
        return rightHeight + 1;
      }
    }
  }
  
  // Is it a BST?
  function isBst(bst) {
    if (!bst.key) {
      return false;
    }
    if (bst.left) {
      // check to see if the values to the left are less than root
      if (bst.left.key > bst.key) {
        return false;
      } else {
        return isBst(bst.left);
      }
    }
    // check to see if the values to the right are less than root
    if (bst.right) {
      if (bst.right.key < bst.key) {
        return false;
      } else {
        return isBst(bst.right);
      }
    }
    // check for 2 children
    if (bst.right && bst.left) {
      isBst(bst.right);
      isBst(bst.left);
    }
    // check for end of the tree
    if (!bst.right && !bst.left) {
      return true;
    }
  }
  
  // Alternative solution
  function is_bst(tree, minimum, maximum) {
    if (minimum !== undefined && tree.key < minimum) return false;
    if (maximum !== undefined && tree.key > maximum) return false;
    if (tree.left && !is_bst(tree.left, minimum, tree.key)) return false;
    if (tree.right && !is_bst(tree.right, tree.key, maximum)) return false;
    return true;
  }
  
  // 3rd largest node
  function treeValues(bst) {
    // do we have to sort the keys in order and subtract length by 3?
    // helper function with a generic amt that could be given
    let resultsString = "";
    if (!bst) {
      return "";
    } else {
      resultsString +=
        `${bst.value}_` + treeValues(bst.left) + treeValues(bst.right);
    }
    return resultsString;
  }
  
  // alternative third largest
  function thirdLargest(str) {
    let results = [];
    let arr = str.split("_");
    for (let i = 0; i < arr.length - 1; i++) {
      results.push(arr[i]);
    }
    return results.sort()[results.length - 3];
  }
  
  // Alternative Solution
  // Write an algorithm to find the third largest value in a binary search tree
  function nth_largest(tree, state) {
    //Finding the largest node means traversing the right first.
    if (tree.right) {
      nth_largest(tree.right, state);
      if (state.result) return;
    }
    if (!--state.n) {
      //Found it.
      state.result = tree.key;
      return;
    }
    if (tree.left) nth_largest(tree.left, state);
  }
  
  function third_largest(tree) {
    //Special case: empty tree.
    if (tree.key == null) return null;
    let state = { n: 3, result: null };
    nth_largest(tree, state);
    return state.result;
  }
  
  // Balanced BST
  function balanced(bst) {
    let leftHeight = heightOfBST(bst.left);
    let rightHeight = heightOfBST(bst.right);
  
    if (Math.abs(rightHeight - leftHeight) <= 1) {
      return true;
    } else if (Math.abs(rightHeight - leftHeight) > 1) {
      return false;
    }
  }
  
  // Alt solution
  //Implement a function to check if a tree is balanced (i.e. a tree where no two leaves differ
  //in distance from the root by more than one).
  function isBalanced(tree) {
    if (!tree.left) {
      return !(tree.right && (tree.right.left || tree.right.right));
    }
    if (!tree.right) {
      return !(tree.left && (tree.left.left || tree.left.right));
    }
    return isBalanced(tree.left) && isBalanced(tree.right);
  }
  
  /* Are they the same BSTs?
  // Rules: Don't construct the BST
  // arr1: [3, 5, 4, 6, 1, 0, 2]
  // arr2: [3, 1, 5, 2, 4, 6, 0]
   expected output: true
  */
  
  let arr1 = [3, 5, 4, 6, 1, 0, 2];
  let arr2 = [3, 1, 5, 2, 4, 6, 0];
  
  function sameBSTs(arr1, arr2) {
    // works better with arrLength, index1, index2 as extra params
    // index1 === arrLength
    // base case
    if (arr1[0] !== arr2[0]) {
      return false;
    }
    if (arr1.length !== arr2.length) {
      return false;
    }
    if (arr1.length === 1 && arr2.length === 1) {
      return true;
    }
    let root = arr1[0];
    // make sure both BSTs are the same height
    // if a child is < root then apply recursive fn on left child for node comparison
    // if a child is > root then apply recursive fn on right child for node comparison
    let leftArray1 = [];
    let rightArray1 = [];
    let leftArray2 = [];
    let rightArray2 = [];
    for (let i = 1; i < arr1.length; i++) {
      if (arr1[i] < root) {
        leftArray1.push(arr1[i]);
      } else if (arr1[i] > root) {
        rightArray1.push(arr1[i]);
      }
      if (arr2[i] < root) {
        leftArray2.push(arr2[i]);
      } else if (arr2[i] > root) {
        rightArray2.push(arr2[i]);
      }
    }
    return sameBSTs(leftArray1, leftArray2) && sameBSTs(rightArray1, rightArray2);
  }
  
  function main() {
    const BST = new BinarySearchTree();
    BST.insert(3, 3);
    BST.insert(1, 1);
    BST.insert(4, 4);
    BST.insert(6, 6);
    BST.insert(9, 9);
    BST.insert(2, 2);
    BST.insert(5, 5);
    BST.insert(7, 7);
    // console.log(BST);
    // console.log(tree(BST));
    // console.log(heightOfBST(BST));
    // console.log(isBst(BST));
    // console.log(isBst(''));
    // console.log(treeValues(BST));
    // console.log(thirdLargest(treeValues(BST)));
    // console.log(balanced(BST));
    let Min = Number.MIN_VALUE;
    let Max = Number.MAX_VALUE;
    console.log(is_bst(tree, Min, Max));
    console.log(sameBSTs([3, 5, 4, 6, 1, 0, 2], [3, 1, 5, 2, 4, 6, 0]));
  }
  
  main();
