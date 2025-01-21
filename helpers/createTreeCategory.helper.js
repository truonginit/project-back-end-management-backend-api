
function treeCategory(categories, parentId = "") {
    const arr = [];

    categories.forEach(item => {
        const newItem = item;
        if(item.category_parent_categoryId === parentId) {
            const children = treeCategory(categories, item.id);
            if(children.length > 0) newItem.children = children;
            arr.push(newItem);
        }
        
    });
    return arr;
}


module.exports = (categories) => {
    return treeCategory(categories, "");
}