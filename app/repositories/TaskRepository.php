<?php
namespace App\repositories;
use App\Models\Project;
use App\Models\Task;
use App\interfaces\CrudInterface;
use Illuminate\Http\Request;

class TaskRepository implements CrudInterface
{
    public function getAll(){
       $tasks=Task::all();
       return $tasks;
    }
    public function findById($id){
        $tasks=Task::find($id);
        return $tasks;
    }
    public function create(Request $request){
        $tasks=new Task();
        $tasks->name=$request->name;
        $tasks->description=$request->description;
        $tasks->status=$request->status;
        $tasks->project_id=$request->project_id;
        $tasks->save();
        return $tasks;
    }

    public function edit(Request $request, $id){
        $tasks=$this->findById($id);
        $tasks->name=$request->name;
        $tasks->description=$request->description;
        $tasks->status=$request->status;
        $tasks->project_id=$request->project_id;
        $tasks->save();
        return $tasks;
    }
    public function delete($id){
        $tasks=$this->findById($id);
        $tasks->delete();
        return $tasks;
    }
}
