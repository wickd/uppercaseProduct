let h = require('../administrator/helpers');
let f = require('../administrator/helpers/functions');
let Paginator = require('paginator');

class Pagination {

    /**
     * Pagination constructor.
     *
     * @param items
     * @param perPage
     * @param numberOfPages
     * @param currentPage
     * @param count
     */
    constructor(items, perPage = 15, numberOfPages = 5, currentPage = 1, count = 0)
    {
        this.items = items;
        this.count = count;
        this.perPage = perPage;
        this.numberOfPages = numberOfPages;
        this.currentPage = currentPage;
        this.paginator = this.build();

        this.result = this.sliceItems();
    }

    /**
     * Build paginator instance.
     *
     * @return {{total_pages, pages, current_page, first_page, last_page, previous_page, next_page, has_previous_page, has_next_page, total_results, results, first_result, last_result}}
     */
    build()
    {
        this.count = this.count
            ? this.count
            : this.getItems().count();

        return (new Paginator(this.getPerPage(), this.getNumberOfPages()))
            .build(this.count, this.getCurrentPage());
    }

    /**
     * Slice items for current page.
     *
     * @return {{}}
     */
    sliceItems()
    {
        let result = {};

        if (this.getPaginator()) {
            result = this.getItems().slice(this.firstResult(), this.lastResult());
        } else {
            console.log('Something wrong on initialize pagination.');

            result = {};
        }

        return result;
    }

    /**
     * Render html.
     *
     * return string.
     */
    render()
    {
            return f.view('../eloquentable/paginator.pug', {paginator: this});
    }

    /**
     * Getter paginator.
     *
     * @return {{total_pages, pages, current_page, first_page, last_page, previous_page, next_page, has_previous_page, has_next_page, total_results, results, first_result, last_result}|*}
     */
    getPaginator()
    {
            return this.paginator;
    }

    /**
     * Getter current page.
     *
     * @return {number|*}
     */
    getCurrentPage()
    {
            return this.currentPage;
    }

    /**
     * Getter number of pages.
     *
     * @return {number|*}
     */
    getNumberOfPages()
    {
            return this.numberOfPages;
    }

    /**
     * Getter original pack items before slice.
     *
     * @return {*}
     */
    getItems()
    {
            return this.items;
    }

    /**
     * Getter per page number.
     *
     * @return {number|*}
     */
    getPerPage()
    {
            return this.perPage;
    }

    /**
     * Getter last page.
     *
     * @return {Number}
     */
    getLastPage()
    {
            return this.getPaginator().last_page;
    }

    /**
     * Getter result.
     *
     * @return {*|null}
     */
    getResult()
    {
            return this.result;
    }

    /**
     * First result item.
     *
     * @return {*}
     */
    firstResult()
    {
            return this.getPaginator().first_result;
    }

    /**
     * Last result item.
     *
     * @return {*}
     */
    lastResult()
    {
            return this.getPaginator().last_result;
    }

    /**
     * Getter next page.
     *
     * @return {Number}
     */
    getNextPage()
    {
            return this.getPaginator().next_page;
    }

    /**
     * Getter previous page.
     *
     * @return {Nubmer}
     */
    getPreviousPage()
    {
            return this.getPaginator().previous_page;
    }

    /**
     * Check if paginator instance have previous page.
     *
     * @return {Boolean}
     */
    hasPreviousPage()
    {
            return this.getPaginator().has_previous_page;
    }

    /**
     * Check if paginator instance have next page.
     *
     * @return {Boolean}
     */
    hasNextPage()
    {
            return this.getPaginator().has_next_page;
    }

    /**
     * Getter total results number.
     *
     * @return {Number}
     */
    getTotalResults()
    {
            return this.getPaginator().total_results;
    }

    /**
     * Getter slice items result.
     *
     * @return {Collection}
     */
    getResults()
    {
            return this.getPaginator().results;
    }

    /**
     * Ovveride, getter current page.
     *
     * @return {*}
     */
    getCurrentPage()
    {
        let app = global.dashboard;

        return (app.request.query.page) ? app.request.query.page : 1;
    }

    /**
     * Getter all pages.
     *
     * @return {Number}
     */
    getPages()
    {
            return this.getPaginator().pages;
    }

    /**
     * Total number of pages.
     *
     * @return {Number}
     */
    totalPages()
    {
            return this.getPaginator().total_pages;
    }

    /**
     * Check if pagination need be a rendered.
     *
     * @return {Boolean}
     */
    showPagination()
    {
            return this.getTotalResults() > this.getPerPage();
    }
}

module.exports = Pagination;