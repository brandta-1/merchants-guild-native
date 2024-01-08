export const cleanseArray = (arr) => {
    const filtered = arr.filter((i) => i.name != undefined);

    filtered.forEach((i) => {
        //see earlier comment, this is done for the sake of brevity, and should be safe in this case
        delete i.id;
        i.enchantments = i.enchantments.filter((i) => i.property);
        //remove React array ids, and any empty values
        i.enchantments.forEach((i) => {
            delete i.id
            if (!i.value) {
                delete i.value
            } else {
                //getting a GQL type error without this,
                // this is being caused by the textInput component being used for values
                i.value = parseInt(i.value, 10);
            }
        })
    });
    return filtered;
}