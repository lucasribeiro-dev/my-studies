const { assert } = require("chai");

const TodoList = artifacts.require('./TodoList.sol')

contract('TodoList', (accounts) =>{
    before(async () =>{
        this.todoList = await TodoList.deployed();
    })

    it('deploys successfully', async () =>{
        const address = await this.todoList.address;
        const adressNotFound = [0x0, '', null, undefined];
        expect(adressNotFound).to.be.an('array').that.does.not.include(address);
    });

    it('lists tasks', async () => {
        const firstTask = ['First task', 1, false]
        
        const taskCount = await this.todoList.taskCount();
        const task = await this.todoList.tasks(taskCount);
        const result = [task.content,task.id.toNumber(), task.completed]

        expect(firstTask).to.include.members(result);
    });

    it('creates task', async () => {
        const resultExpected = ['Second task', 2, false]

        const resultTask = await this.todoList.createTask(resultExpected[0]);
        const event = resultTask.logs[0].args
        const result = [event.content,event.id.toNumber(), event.completed]

        expect(resultExpected).to.include.members(result);

    }); 

    it('change status task', async () => {
        const _id = 1;

        const resultTask = await this.todoList.changeStatus(_id);

        const event = resultTask.logs[0].args

        const result = [event.id.toNumber(), event.completed]
        const resultExpected = [_id, true]

        expect(resultExpected).to.include.members(result);

    }); 
})