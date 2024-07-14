<template>
  <div class="data-table">
    <div class="table-controls mb-3">
      <div class="search-filter">
        <input
          type="text"
          class="form-control"
          v-model="searchTerm"
          placeholder="Search..."
        />
        <button class="btn btn-primary" @click="filterData">
          <i class="bi bi-funnel"></i>
        </button>
      </div> 
      <div class="pagination">
        <button
          class="btn btn-outline-secondary"
          :disabled="currentPage === 1"
          @click="prevPage"
        >
          <i class="bi bi-rewind fs-4"></i>
        </button>
        <span class="mx-2">Page {{ currentPage }} sur {{ totalPages }}</span>
        <button
          class="btn btn-outline-secondary"
          :disabled="currentPage === totalPages"
          @click="nextPage"
        >
          <i class="bi bi-fast-forward fs-4"></i>
        </button>
      </div>
    </div>
    <table class="table table-striped table-bordered">
      <thead>
        <tr>
          <th
            class="clickable"
            v-for="(header, index) in headers"
            :key="index"
            @click="sortBy(header.field)"
          >
            {{ header.label }}
            <span
              v-if="sortField === header.field"
              :class="['sort-icon', sortDirection]"
            >
              <i v-if="sortDirection === 'asc'" class="bi bi-caret-up fs-4"></i>
              <i v-else class="bi bi-caret-down-fill fs-4"></i>
            </span>
            <span
              v-else-if="sortField !== header.field"
              :class="['sort-icon', sortDirection]"
            >
              <i class="bi bi-caret-up fs-4"></i>
            </span>
          </th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(row, index) in paginatedData"
          :key="index"
          :class="{ 'table-primary': selectedRows.includes(row) }"
        >
          <td v-for="(column, columnIndex) in headers" :key="columnIndex">
            <slot :name="`cell-${column.field}`" :row="row" :column="column">
              {{ row[column.field] }}
            </slot>
          </td>
          <td>
            <div class="btn-group">
              <button
                v-for="(button, buttonIndex) in buttons"
                :key="buttonIndex"
                class="btn"
                :class="button.class"
                @click="button.handler(row)"
              >
                <i v-if="button.icon" :class="button.icon"></i>
                {{ button.label }}
              </button>
            </div>
          </td>
        </tr>
      </tbody>
      
      <tfoot>
        <tr>
          <td v-for="(header, index) in headers" :key="index" :class="getFooterClass(header.field)">
            <slot :name="`sum-${header.field}`" :sum="sums[header.field]">
              <span v-if="isSummableColumn(header.field)" :class="getFooterClass(header.field)">
                {{ parseFloat(sums[header.field]).toFixed(2) }}
              </span>
            </slot>
          </td>
          <td></td>
        </tr>
      </tfoot>

    </table>
  </div>
</template>


<script>
export default {
  name: "DataTable",
  props: {
    headers: {
      type: Array,
      required: true,
    },
    data: {
      type: Array,
      required: true,
    },
    itemsPerPage: {
      type: Number,
      default: 10,
    },
    buttons: {
      type: Array,
      default: () => []
    },
    summableColumns: {
      type: Array,
      default: () => []
    },
    
  },
  data() {
    return {
      searchTerm: "",
      currentPage: 1,
      sortField: null,
      sortDirection: "asc",
      selectedRows: [],
    };
  },
  computed: {
    filteredData() {
      return this.data.filter((row) => {
        return Object.values(row).some((value) => {
          return value
            .toString()
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase());
        });
      });
    },
    sortedData() {
      if (!this.sortField) return this.filteredData;
      return this.filteredData.sort((a, b) => {
        if (a[this.sortField] < b[this.sortField])
          return this.sortDirection === "asc" ? -1 : 1;
        if (a[this.sortField] > b[this.sortField])
          return this.sortDirection === "asc" ? 1 : -1;
        return 0;
      });
    },
    paginatedData() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.sortedData.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.filteredData.length / this.itemsPerPage);
    },
    sums() {
      const sums = {};
      this.summableColumns.forEach(column => {
        sums[column] = this.filteredData.reduce((total, row) => {
          return total + (parseFloat(row[column]) || 0);
        }, 0);
      });
      return sums;
    }
  },
  methods: {
    sortBy(field) {
      if (this.sortField === field) {
        this.sortDirection = this.sortDirection === "asc" ? "desc" : "asc";
      } else {
        this.sortField = field;
        this.sortDirection = "asc";
      }
    },
    filterData() {
      this.currentPage = 1;
    },
    prevPage() {
      this.currentPage--;
    },
    nextPage() {
      this.currentPage++;
    },
    isSummableColumn(field) {
      return this.summableColumns.includes(field);
    },
    getFooterClass(field) {
      const summableColumn = this.summableColumns.find((column) => column.field === field);
      return summableColumn ? summableColumn.footerClass : '';

    },
  }
};
</script>


<style scoped>
.data-table {
  width: 100%;
}

.table-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.search-filter {
  display: flex;
  align-items: center;
}

.search-filter input {
  margin-right: 0.5rem;
}

.pagination {
  display: flex;
  align-items: center;
}

.clickable {
  cursor: pointer;
}

.sort-icon {
  display: inline-block;
  margin-left: 0.5rem;
}

.sort-icon.asc:before {
  font-weight: normal !important;
  background: #c4c4c4;
}

.sort-icon.desc:before {
  font-weight: bolder !important;
  background: #ffbaba;
}

.btn i {
  margin-right: 0.3rem;
}
</style>
