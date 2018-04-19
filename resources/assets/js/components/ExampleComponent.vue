<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <v-data-table
                        :headers="headers"
                        :items="users"
                        hide-actions
                        class="elevation-1"
                >
                    <template slot="items" slot-scope="props">
                        <td>{{ props.item.id }}</td>
                        <td class="text-xs">{{ props.item.name }}</td>
                        <td class="text-xs">{{ props.item.email }}</td>
                        <td class="text-xs">{{ props.item.created_at }}</td>
                    </template>
                </v-data-table>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                headers: [
                    { text: 'ID', value: 'id'},
                    { text: 'Name', value: 'name'},
                    { text: 'Email', value: 'email'},
                    { text: 'Created at', value: 'created_at'}
                ],
                items: []
            }
        },
        computed: {
            users() {
                return this.$store.getters.users
            }
        }

    }
</script>
