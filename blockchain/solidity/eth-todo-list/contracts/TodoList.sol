pragma solidity ^0.5.0;

contract TodoList {
    uint public taskCount = 0;

    struct Task {
        uint id;
        string content;
        bool completed;
    }

    mapping(uint => Task) public tasks;

    event TaskCreated(
        uint id,
        string content,
        bool completed
        );

    event TaskChangeStatus(
        uint id,
        bool completed
        );

    constructor() public {
        createTask("First task");
    } 

    function createTask(string memory _content) public {
        bool statusTask = false;

        taskCount ++;
        tasks[taskCount] = Task(taskCount, _content, statusTask);
        emit TaskCreated(taskCount, _content, statusTask);
    }

    function changeStatus(uint _id) public {
        Task memory _task = tasks[_id];
        _task.completed = !_task.completed;
        tasks[_id] = _task;
        emit TaskChangeStatus(_id, _task.completed);
    }

   

}
