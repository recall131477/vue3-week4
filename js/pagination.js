export default {
  props: ['pages'],
  methods: {
    changePages(item) {
      this.$emit('change-pages', item);
    }
  },
  template:
    `<nav aria-label="Page navigation example">
      <ul class="pagination justify-content-center">
        <li class="page-item" :class="{'d-none':!pages.has_pre}">
          <a class="page-link" href="javascript:;" aria-label="Previous" @click="changePages(pages.current_page - (pages.total_pages - 1))">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li class="page-item" v-for="(page,index) in pages.total_pages" :key="index" :class="{'active': page === pages.current_page}">
           <a class="page-link" href="javascript:;" @click="changePages(page)">{{ page }}</a>
        </li>
        <li class="page-item" :class="{'d-none':!pages.has_next}">
          <a class="page-link" href="javascript:;" aria-label="Next" @click="changePages(pages.current_page + (pages.total_pages - 1))">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
   `
}