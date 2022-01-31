export class TreeNode {
    name: string;
    parent: TreeNode;
    childerns: Array<TreeNode>;
    constructor(obj) {
        this.name = obj.name;
        this.parent = obj.parent;
        this.childerns = obj.childerns ? obj.childerns: new Array<TreeNode>();

    }

    addChild(childNode: TreeNode) {
       this.childerns = this.childerns ? this.childerns: new Array<TreeNode>();
       this.childerns.push(childNode);
    }

    getLevelOfNode() {
        let level = 0;
        let cParent = this.parent;
        while(cParent != null) {
            level++;
            cParent = cParent.parent;
        }
        return level;
    }
} 