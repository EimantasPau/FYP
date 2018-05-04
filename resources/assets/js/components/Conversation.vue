<template>
   <div v-if="user && conversation">
       <h1 class="grey--text text--darken-1">Talking to {{userWith.name}}</h1>
       <v-divider></v-divider>

       <v-layout row>
           <!--<vue-scrollbar ref="Scrollbar">-->
               <v-flex id="messageContainer" style="max-height: 50vh; overflow-y:auto">
                   <div :key="message.id" v-for="message in conversation.conversations" class="container" :class="{darker: message.user_id != user.id}">
                       <template v-if="message.user_id == userWith.id">
                           <img :src="userWith.file ? '/storage/' + userWith.file.file_path : '/images/default-profile.png'" alt="Avatar">
                       </template>
                       <template v-else>
                           <img :src="user.file ? '/storage/' + user.file.file_path : '/images/default-profile.png'" alt="Avatar">
                       </template>
                       <p>{{message.message}}</p>
                       <span class="time-right">{{message.created_at}}</span>
                   </div>
               </v-flex>
           <!--</vue-scrollbar>-->
       </v-layout>

       <v-layout row>
           <v-flex>
               <v-text-field v-model="message" @keyup.enter="sendMessage" multiLine label="Enter your message"></v-text-field>
           </v-flex>
       </v-layout>
       <v-layout row>
           <v-flex>
               <v-btn @click="sendMessage">Send</v-btn>
           </v-flex>
       </v-layout>

   </div>
</template>

<script>
    import VueScrollbar from 'vue2-scrollbar'
    export default {
        name: "Conversation",
        props: ['id'],
        data(){
            return {
                message: ''
            }
        },
        mounted() {
            let div = document.getElementById('messageContainer')
            div.scrollTop = div.scrollHeight
        },
        updated() {
            let div = document.getElementById('messageContainer')
            div.scrollTop = div.scrollHeight
        },
        components:{
            VueScrollbar
        },
        computed: {
            conversation() {
                return this.$store.getters.conversations.find(conversation => conversation.id == this.id)
            },
            user() {
                return this.$store.getters.user
            },
            userWith() {
                return this.conversation.users.find(user => user.id != this.user.id)
            }
        },
        methods: {
            sendMessage() {
                let formData = {
                    message: this.message,
                    group_id: this.id
                }
                this.message = ''
                this.$store.dispatch('addMessage', formData)
                    .then(()=>{
                        let div = document.getElementById('messageContainer')
                        div.scrollTop = div.scrollHeight - div.clientHeight
                        // let currentHeight = document.getElementById('messageContainer').scrollHeight;
                        // this.$refs.Scrollbar.scrollToY(currentHeight)
                    })


            }
        },


    }
</script>

<style scoped>
    .vue-scrollbar__wrapper{
        width: 100%;
    }
    ::-webkit-scrollbar {
        width: 10px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
        background: #f1f1f1;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: #888;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
        background: #555;
    }
    /* Chat containers */
    .container {
        border: 2px solid #dedede;
        background-color: #f1f1f1;
        border-radius: 5px;
        padding: 10px;
        margin: 10px 0;
    }

    /* Darker chat container */
    .darker {
        border-color: #ccc;
        background-color: #ddd;
    }

    /* Clear floats */
    .container::after {
        content: "";
        clear: both;
        display: table;
    }

    /* Style images */
    .container img {
        float: left;
        max-width: 60px;
        width: 100%;
        margin-right: 20px;
        border-radius: 50%;
    }

    /* Style the right image */
    .container img.right {
        float: right;
        margin-left: 20px;
        margin-right:0;
    }

    /* Style time text */
    .time-right {
        float: right;
        color: #aaa;
    }

    /* Style time text */
    .time-left {
        float: left;
        color: #999;
    }
</style>