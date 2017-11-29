

var mainVm = new Vue({
  //import Dropdown from 'hsy-vue-dropdown'
  //Vue.use(Dropdown)
    el: '#app',
    data: {
        todos: [],
        newTodo: {
            text: '',
            priority: '',
        }
    },
    methods: {
        postTodo: function(event){
            event.preventDefault()
            // $().serialize() will grab all the named inputs in the form, and put their values into a url-encoded string
            $.post('/todo', mainVm.newTodo, (data)=>{
                mainVm.newTodo = {}
                console.log(data)
                mainVm.getFreshData()
                //this.todos.push(data)
            })
        },

        removeTodo: function(item){
            $.post('/todoRemove', item,(data)=>{
                mainVm.getFreshData()
                //send the object to be removed
                console.log(data)
            })
        },

        getFreshData: function(){
            $.get('/todo', function(data){
                mainVm.todos = data
            })
        },

        sort: function(event){
          // place the sort logic done automatically
          event.preventDefault()
          mainVm.todos.sort(function(a, b){
            if (a.text < b.text)
              {return -1}
            if (a.text > b.text)
              {return 1}
            return 0
          })
        }
    },

    created: function(){
        this.getFreshData()
    }
})
