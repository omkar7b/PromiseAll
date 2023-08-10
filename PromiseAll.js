let posts = [{ title: 'POST1' }, { title: 'POST2' }];

function createPost(post) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            posts.push(post);
            resolve();
        }, 1000);
    });
}

function getPost() {
    setTimeout(() => {
        let output = '';
        for (let i = 0; i < posts.length; i++) {
            output += `<li> ${posts[i].title} </li>`;
        }
        document.body.innerHTML = output;
    }, 1000);
}

function updateLastUserActivityTime() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let lastActivityTime = new Date().getTime();
            resolve(lastActivityTime);
        }, 1000);
    });
}

function deletePost() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (posts.length > 0) {
                resolve(posts.pop());
            } else {
                reject("ERROR: ARRAY IS EMPTY");
            }
        }, 1000);
    });
}

createPost({ title: 'POST3' })
    .then(() => {
        return Promise.all([createPost({ title: 'POST4' }), updateLastUserActivityTime()]);
    })
    .then(([_, lastActivityTime]) => {
        console.log('Last Activity Time:', lastActivityTime);
        return deletePost();
    })
    .then(deletedPost => {
        console.log('Deleted Post:', deletedPost);
        console.log('Remaining Posts:', posts);
    })
    .catch(error => {
        console.error('An error occurred:', error);
    });
