import React, {Component} from "react";
import {Button, FormGroup, FormControl, FormLabel} from "react-bootstrap";
import "./addbot.css";
import axios from 'axios';
import { FilePond } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import history from './history';

class KnowledgeItem extends Component{
    constructor(props) {
        super(props);

        this.state = {
            active: this.props.list.includes(this.props.name) ? true : false,
        };
    }
    toggleClass() {
        const currentState = this.state.active;
        this.setState({ active: !currentState });
        this.props.selectItem(this.props.name);
    };


    render(){
        return(
            <li key={this.props.name} className={this.state.active ? 'knowledgeItem': null}
                onClick={this.toggleClass.bind(this)}
            >
                <img className="img-label" src={require(`../assets/img/${this.props.name.toLocaleLowerCase()}.png`)} alt=''/>
                <span className="knowledge-label">{this.props.name}</span>
            </li>
        )
    }
}

class KnowledgeSelector extends Component{
    constructor(props) {
        super(props);

        this.state = {
           knowledgeList: ['AI','Profile','Computers','Emotion','Food','Gossip','Greetings','Health','History','Humor','Literature','Money','Movies','Politics','Psychology','Science','Sports','Trivia'],
            selected: [],
            showList: false
        };

        this.showList.bind(this);
        this.showElement.bind(this);
    }

    showList(){
        this.setState({
            showList: !this.state.showList
        })
    }

    selectItem(name){
        const selectedItems = [...this.state.selected];

        if(selectedItems.includes(name)) {
            selectedItems.splice(selectedItems.indexOf(name),1);
            this.setState(previousState => ({
                selected: selectedItems
            }));
        }
        else {
            this.setState(previousState => ({
                selected: [...previousState.selected, name]
            }));
        }
        this.props.selectItem(name);
    }

    showElement(knowledge, index){
        return <KnowledgeItem key={knowledge} name={knowledge} list={this.state.selected}  selectItem={(knowledge) => this.selectItem(knowledge)} />;
    }

    render(){
        return(
            <div id='knowledgeSelector'>
                <Button
                    block
                    size="lg"
                    type="button"
                    onClick={this.showList.bind(this)}
                >
                    {this.state.selected.length > 0 ? this.state.selected.length < 5 ? this.state.selected.map((txt, index, knowledgeList) => <span>{txt + (index + 1 === knowledgeList.length ? '' : ',')}</span>) : `Selected (${this.state.selected.length})` : "Select knowledge"}
                </Button>
                {this.state.showList ? <ul>
                    {this.state.knowledgeList.map((knowledge, index) => { return this.showElement(knowledge,index)})}
                </ul> : null}
            </div>
        )
    }
}

export default class Addbot extends Component {
    constructor(props) {
        super(props);
        axios.defaults.withCredentials = true;
        this.state = {
            name: "",
            knowledge: [],
            toIndex: props.toIndex,
            yml_files: [],
            csv_files: []
        };

        this.selectItem.bind(this);
    }

    validateForm() {
        return this.state.name.length > 0;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };

    addNewBot = event => {
        //event.preventDefault();
        var bodyFormData = new FormData();
        bodyFormData.set('name', this.state.name);
        bodyFormData.set('knowledge', this.state.knowledge);

        for (let index = 0; index < this.state.yml_files.length; index++)
            bodyFormData.append('yml_files', this.state.yml_files[index]);

        for (let index = 0; index < this.state.csv_files.length; index++)
            bodyFormData.append('csv_files', this.state.csv_files[index]);

        var token = localStorage.getItem('csrf_token');
        let config = { headers: {'Content-Type' : 'application/json', "X-CSRF-TOKEN": token},
            withCredentials: true,
        };

        axios.defaults.withCredentials = true;
        axios.post(`http://127.0.0.1:5000/create_bot`, bodyFormData, config)
            .then(res => {
                history.push('/main');
            });
    };

    selectItem(name){
        const selectedItems = [...this.state.knowledge];

        if(selectedItems.includes(name)) {
            selectedItems.splice(selectedItems.indexOf(name),1);
            this.setState(previousState => ({
                knowledge: selectedItems
            }));
        }
        else {
            this.setState(previousState => ({
                knowledge: [...previousState.knowledge, name]
            }));
        }
    };

    render() {
        return (<div className="addbotForm">
            {/*<NavigationBar></NavigationBar>*/}
            <form className='col-sm-4 offset-sm-4' onSubmit={this.addNewBot}>
                <FormGroup controlId="name">
                    <FormLabel >Name</FormLabel>
                    <FormControl

                        autoFocus
                        type="name"
                        value={this.state.name}
                        onChange={this.handleChange}
                    />
                </FormGroup>
                <KnowledgeSelector selectedKnowledge={this.state.knowledge} selectItem={(name) => this.selectItem(name)}></KnowledgeSelector>
                <FormGroup controlId="yml_files">
                    <FormLabel>YML Files</FormLabel>
                    <FilePond name="yml_files" allowMultiple={true}
                              onupdatefiles={fileItems => {
                                  // Set currently active file objects to this.state
                                  this.setState({
                                      yml_files: fileItems.map(fileItem => fileItem.file)
                                  });
                              }}
                    />
                </FormGroup>
                <FormGroup controlId="csv_files">
                    <FormLabel>CSV Files</FormLabel>
                    <FilePond name="csv_files" allowMultiple={true}
                              onupdatefiles={fileItems => {
                                  // Set currently active file objects to this.state
                                  this.setState({
                                      csv_files: fileItems.map(fileItem => fileItem.file)
                                  });
                              }}
                    />
                </FormGroup>
                <Button
                    block
                    size="lg"
                    disabled={!this.validateForm()}
                    type="button"
                    onClick={() => this.addNewBot()}
                >
                    Create
                </Button>
            </form>
        </div>)
    }
}