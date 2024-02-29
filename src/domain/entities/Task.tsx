export class Task{
    id: string
    name: string
    isComplete: boolean
    isEditing: boolean

    constructor(id: string, name: string, isComplete: boolean, isEditing: boolean){
        this.id = id;
        this.name = name;
        this.isComplete = isComplete;
        this.isEditing = isEditing;
    }
}