

### DataTable Component

A Vue.js component for displaying and managing data in a table format with features like search, sorting, pagination, and customizable action buttons.

### Features

- **Search**: Filter data by entering search terms.
- **Sorting**: Click on headers to sort data.
- **Pagination**: Navigate through data pages.
- **Action Buttons**: Customizable action buttons for each row.
- **Summable Columns**: Sum up values of specified columns.

### Installation

### npm

```bash
npm install @your-username/data-table
```

### yarn

```bash
yarn add @your-username/data-table
```

## Usage

### Import and Register the Component

```javascript
import DataTable from '@your-username/data-table';

export default {
  components: {
    DataTable
  }
};
```

### Template

```html
<template>
  <div>
    <DataTable
      :headers="headers"
      :data="data"
      :itemsPerPage="10"
      :buttons="buttons"
      :summableColumns="summableColumns"
    />
  </div>
</template>
```

### Script

```javascript
<script>
export default {
  data() {
    return {
      headers: [
        { label: 'Name', field: 'name' },
        { label: 'Age', field: 'age' },
        { label: 'Salary', field: 'salary' }
      ],
      data: [
        { name: 'John Doe', age: 28, salary: 50000 },
        { name: 'Jane Smith', age: 34, salary: 60000 },
        // More data...
      ],
      buttons: [
        {
          label: 'Edit',
          class: 'btn btn-primary',
          icon: 'bi bi-pencil',
          handler: (row) => { console.log('Edit', row); }
        },
        {
          label: 'Delete',
          class: 'btn btn-danger',
          icon: 'bi bi-trash',
          handler: (row) => { console.log('Delete', row); }
        }
      ],
      summableColumns: ['salary']
    };
  }
};
</script>
```

### Styles

```css
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
```

## Props

- `headers` (Array, required): Column headers for the table.
- `data` (Array, required): Data to be displayed in the table.
- `itemsPerPage` (Number, default: 10): Number of items per page.
- `buttons` (Array, default: []): Action buttons for each row.
- `summableColumns` (Array, default: []): Columns to sum up.

## Example

```html
<template>
  <div>
    <DataTable
      :headers="[
        { label: 'Name', field: 'name' },
        { label: 'Age', field: 'age' },
        { label: 'Salary', field: 'salary' }
      ]"
      :data="[
        { name: 'John Doe', age: 28, salary: 50000 },
        { name: 'Jane Smith', age: 34, salary: 60000 }
      ]"
      :itemsPerPage="5"
      :buttons="[
        {
          label: 'Edit',
          class: 'btn btn-primary',
          icon: 'bi bi-pencil',
          handler: (row) => { console.log('Edit', row); }
        },
        {
          label: 'Delete',
          class: 'btn btn-danger',
          icon: 'bi bi-trash',
          handler: (row) => { console.log('Delete', row); }
        }
      ]"
      :summableColumns="['salary']"
    />
  </div>
</template>
```

## License

MIT
```

This complete README file includes detailed information on features, installation, usage, example code, and styling for your DataTable component.