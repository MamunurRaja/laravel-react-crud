<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Project;
use App\Models\Task;
use App\repositories\TaskRepository;
use Illuminate\Support\Facades\Validator;


class TasksController extends Controller
{
    public $taskRepository;
    public function __construct(TaskRepository $taskRepository){
        $this->taskRepository=$taskRepository;
    }

    public function index(){
        $projects= $this->taskRepository->getAll();
        return response()->json([
            'success' => true,
            'message' => 'data fetched',
            'data'    => $projects
        ]);
    }

    public function show($id){
        $projects= $this->taskRepository->findById($id);
        if (is_null($projects)) {
            return response()->json([
                'success' => false,
                'message' => 'data not fetched',
                'data'    => null
            ]);            
        }
        return response()->json([
            'success' => true,
            'message' => 'data fetched',
            'data'    => $projects
        ]);
    }

    public function store(Request $request){

        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'description' => 'required',
            'status' => 'required',
            'project_id' => 'required',
        ],[
            'name.required' => 'please Enter the name field',
            'description.required' => 'please Enter the description field',
            'status.required' => 'please Enter the status field',
            'user_id.required' => 'please Enter the user id field',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'error' => $validator->getMessageBag()->first(),
                'data'    => null
            ]); 
        }

        
        $projects= $this->taskRepository->create($request);
        return response()->json([
            'success' => true,
            'message' => 'Data is Saved',
            'data'    => $projects
        ]); 
    }

    public function update(Request $request, $id){
        $projects=$this->taskRepository->findById($id);
        if (is_null($projects)) {
            return response()->json([
                'success' => false,
                'message' => 'Project Not Found',
                'data'    => null
            ]); 
        }
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'description' => 'required',
            'status' => 'required',
            'project_id' => 'required',
        ],[
            'name.required' => 'please Enter the name field',
            'description.required' => 'please Enter the description field',
            'status.required' => 'please Enter the status field',
            'project_id' => 'please Enter the user id field',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'error' => $validator->getMessageBag()->first(),
                'data'    => null
            ]); 
        }

        
        $projects= $this->taskRepository->edit($request, $id);
        return response()->json([
            'success' => true,
            'message' => 'Data is Updated',
            'data'    => $projects
        ]); 
    }

    public function destroy($id){
        $projects=$this->taskRepository->findById($id);
        if (is_null($projects)) {
            return response()->json([
                'success' => false,
                'message' => 'Project Not Found',
                'data'    => null
            ]); 
        }

        $projects=$this->taskRepository->delete($id);
        return response()->json([
            'success' => true,
            'message' => 'deleted Successfully',
            'data'    => $projects
        ]); 
    }
   
}
