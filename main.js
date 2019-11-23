new Vue({
    el: '#vapp',
    data:{ 
        photos: [],
        categories: [1,2,3,4,5,6,7,8,9,10],
        title: '',
        selected: '',
        limit: 15
    },
    methods: {
        handleSubmit() {
            const {title} = this
            const newTitle = {
                id: Math.random() * 10,
                title
            }
            this.addPhoto(newTitle)
        },
        getPhotos() {
            axios.get("https://jsonplaceholder.typicode.com/photos")
            .then(res => {
                const append = res.data.slice(this.photos.length, this.photos.length + this.limit )         
                this.photos = this.photos.concat(append)
            })
        },
        getPhotosById(category) {
            axios.get(`https://jsonplaceholder.typicode.com/photos?albumId=${category}`)
            .then(res => {
                this.photos = []   
                this.photos = res.data;
            })
        },
        addPhoto(newTitle) {
            axios.post('https://jsonplaceholder.typicode.com/photos', newTitle)
            .then(res => this.photos = [...this.photos, res.data])
        },
        deletePhoto(id) {
            axios.delete(`https://jsonplaceholder.typicode.com/photos/${id}`)
            .then(res => this.photos = this.photos.filter(photo => photo.id !== id))
        }
    },
    mounted() {
        observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if(entry.isIntersecting) {
                    setTimeout(() => {
                        this.getPhotos()
                    }, 500)            
                }
            })
        })
    
        const container = document.querySelector(".load-more-container")
    
        observer.observe(container)
    }
})