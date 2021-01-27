// plain object   // POCO\POJO

let man = {
    name: 'Max',
    age: 31,
    sayName() {
        alert("My name is " + this.name);
    }
}

man.age = 27;
console.log(man.age);
console.log(man.name);
man.sayName();


let content = 'sds';

let page = {
    title: 'js',
    content: ``,

    render() {
        if (this.content === '') {
            alert('Content is unavaiable');
        } else {
            document.title = this.title;
            document.write(this.content);
        }
    }
};

page.content = `<div>Content about React JS</div>`;
page.render();

let page2 = {
    title: 'JS2',
    _content: ``,
    setContent(value) {
        //if (value is ok??)
        this._content = value;
    },
    getContent() {
        return this._content;
    },
    render: function () {
        document.write(this._content);
    }
}

// page2._content = `<div>Content about React JS</div>`;
page2.setContent(`<div>Content about React JS</div>`);
// console.log( page2._content );
console.log(page2.getContent());
page2.render();

let renderPage = (state) => {
    console.log(state);
};

let store = {
    _subscriber() {
        console.log('no subscribers (observers)')
    },
    _state: {
        firstName: 'My socialPage number one',
        lastName: 'SocialPage number two'
    },
    getState() {
        return this._state;
    },
    subscribe(observer) {
        this._subscriber = observer;
    },
    setFirstName(value) {
        // send ajax to server
        this._state.firstName = value;
        this._subscriber();
    }
}
// store._state


let state = store.getState();
store.setFirstName('MySocialNetwork');
state = store.getState();

let subscriber = () => {
    let state = store.getState();
    renderPage(state);
};

store.subscribe(subscriber);