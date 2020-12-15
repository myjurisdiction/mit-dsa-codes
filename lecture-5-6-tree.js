"use strict";

const { log } = console;

function Node(val) {
  Object.assign(this, { left: null, right: null, val });
}

function newNode(val) {
  return new Node(val);
}

function insert(val, node) {
  if (node === null) return newNode(val);
  else if (val < node.val) node.left = insert(val, node.left);
  else node.right = insert(val, node.right);
  return node;
}

function traverse(root) {
  const array = new Array();
  function inOrder(root) {
    if (root !== null) {
      if (root.left) inOrder(root.left);
      if (root.right) inOrder(root.right);
      array.push(root.val);
    }

    return root;
  }

  inOrder(root);

  return array;
}

/**
 * -> function do delete a node from the binary tree
 */
function remove(node, val) {
  // step 1 : Traverse to the node that is to delete
  if (node === null) return node;
  else if (val < node.val) node.left = remove(node.left, val);
  else if (val > node.val) node.right = remove(node.right, val);
  else {
    /** Now there may arrise 4 cases */
    // case 1 : When the current node is a leaf node
    if (node.left === null && node.right === null) node = null;
    // case 2 : left child donot exists
    else if (!node.left) node = node.right;
    // case 3 : right child donot exists
    else if (!node.right) node = node.left;
    else {
      // case 3 : when the node has both the children
      let nextNode = minNode(node.right);
      node.val = nextNode.val;
      node.right = remove(node.right, nextNode.val);
    }
  }

  return node;
}

/**
 * FUNCTION TO FIND THE MIN-NODE
 */

function minNode(root) {
  if (!root.left) return root;
  return minNode(root.left);
}

function maxNode(root) {
  if (!root.right) return root;
  return maxNode(root.right);
}

function binaryTree() {
  let root = null;
  let list = [25, 10, 45, 35, 50, 55];

  for (let el of list) {
    root = insert(el, root);
  }

  return root;
}

function getBalance(root) {
  if (!root) return root;
  return height(root.left) - height(root.right);
}
/**
 *  Height of a Bianry tree is the longest path from the root to the leaf node.
 *  Height of a node is the longest path from that node to the leaf node.
 */
function height(node) {
  if (node === null) return null;

  return 1 + Math.max(height(node.left), height(node.right));
}

const root = binaryTree();

log(traverse(root));
// remove(root, 55);
// log(minNode(root), maxNode(root));

// log(getBalance(root.right));
// log(traverse(root));

/**
 * AUGMENTED BINARY TREE
 * AVL TREE
 * Named after their inventor Adelson, Velski & Landis, AVL trees are height balancing binary search tree. AVL tree checks the height of the left and the right  sub-trees and assures that the difference is not more than 1
 */

function _Node(val) {
  Object.assign(this, { left: null, right: null, height: 1, val });
}

function avl_insert(root, val) {
  if (root === null) return new _Node(val);
  else if (val < root.val) root.left = avl_insert(root.left, val);
  else root.right = avl_insert(root.right, val);

  // update the height of the parent of the newly created node.
  root.height = height(root);

  const balanceFactor = getBalance(root);

  // left left case
  if (balanceFactor > 1 && val < root.left.val) return rightRotate(root);
  // right right case
  if (balanceFactor < -1 && val > root.right.val) return leftRotate(root);
  // leftRight Case
  if (balanceFactor > 1 && val > root.left.val) {
    root.left = leftRotate(root.left);
    return rightRotate(root);
  }

  // rightleft case
  if (balanceFactor < -1 && val < root.right.val) {
    root.right = rightRotate(root.right);
    return leftRotate(root);
  }

  return root;
}

function rightRotate(root) {
  //  code for right rotate
  if (root === null) return null;

  let x = root.left,
    y = x.right;

  x.right = root;
  root.left = y;

  root.height = height(root);
  x.height = height(x);

  return x;
}

function leftRotate(root) {
  // code for left rotate
  if (root === null) return null;

  let x = root.right,
    y = x.left;

  x.left = root;
  root.right = y;

  root.height = height(root);
  x.height = height(x);

  return x;
}

function avl_tree() {
  let root = null;

  const sortedArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  for (let el of sortedArray) {
    root = avl_insert(root, el);
  }

  return root;
}

function breadthFirstSearch(root) {
  const list = new Array();
  if (root === null) return list;

  const queue = [root];

  while (queue.length) {
    let node = queue.shift();
    list.push(node.val);

    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
  }
  return list;
}

const avl = avl_tree();

log(avl);

log(breadthFirstSearch(avl));
log(traverse(avl));
