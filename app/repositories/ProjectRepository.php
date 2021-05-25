<?php
namespace App\repositories;
use App\Models\Project;
use App\interfaces\CrudInterface;
use Illuminate\Http\Request;

class ProjectRepository implements CrudInterface
{
    public function getAll(){
    //    $projects=Project::all();
    //    return $projects;
       $project = Project::withCount('tasks')->with('tasks')
            ->get();
        return $project;
    }
    public function findById($id){
        $projects=Project::with('tasks')->withCount('tasks')->find($id);
        // $projects=Project::find($id);
        return $projects;
    }
    public function create(Request $request){
        $projects=new Project();
        $projects->name=$request->name;
        $projects->description=$request->description;
        $projects->status=$request->status;
        $projects->user_id=$request->user_id;
        $projects->save();
        return $projects;
    }

    public function edit(Request $request, $id){
        $projects=$this->findById($id);
        $projects->name=$request->name;
        $projects->description=$request->description;
        $projects->status=$request->status;
        $projects->user_id=$request->user_id;
        $projects->save();
        return $projects;
    }
    public function delete($id){
        $projects=$this->findById($id);
        $projects->delete();
        return $projects;
    }
}
