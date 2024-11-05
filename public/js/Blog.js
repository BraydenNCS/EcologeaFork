async function deleteResource(req, res) {
    try {
    const id = req.params.id;
    const confirmDelete = req.body.confirmDelete
    const allResources = await readJSON('utils/resources.json');
    var index = -1;
    for (var i = 0; i < allResources.length; i++) {
    var curcurrResource = allResources[i];
    if (curcurrResource.id == id)
    index = i;
    }
    if (index != -1) {
        if(confirmDelete == 'Confirm'){
            allResources.splice(index, 1);
            await fs.writeFile('utils/resources.json', JSON.stringify(allResources), 'utf8');
            return res.status(201).json({ message: 'Resource deleted successfully!' });}
        else{
            return res.status(500).json({ message: 'PLease enter \'Confirm\' to confirm the deletetion of your post' });
        }
    } else {
    return res.status(500).json({ message: 'Error occurred, unable to delete!' });
    }
    } catch (error) {
    return res.status(500).json({ message: error.message });
    }
    }