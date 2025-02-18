﻿
namespace q {

    export function initDetailEditor(dialog: _Ext.DialogBase<any, any>, editor: _Ext.GridEditorBase<any>, options: GridEditorOptions = {}): void {

        if (options.showCaption != true) {
            editor.element.siblings('.caption').hide();
        }
        if (options.hideToolbar == true) {
            editor.element.find('.grid-toolbar').hide()
        }
        if (options.isReadOnly == true) {
            editor.set_readOnly(options.isReadOnly);
        }
        editor.parentDialog = dialog;

        dialog.afterSetDialogSize = () => {

            if (options.height) {
                editor.slickGrid.setOptions({ autoHeight: false });
                editor.element.find('.grid-container').height(options.height);

                editor.slickGrid.resizeCanvas();
            }

            if (options.width) {
                editor.element.find('.grid-container').width(options.width);

                editor.slickGrid.resizeCanvas();
            }
            //else {
            //    editor.element.find('.grid-container').width('100%');
            //}

        }

    }

    export function setGridEditorHeight(editor: JQuery, heightInPx: number) {
        editor.css('height', heightInPx + 'px');
        editor.find('.grid-container')
            .css('height', (heightInPx - 25) + 'px')
            .height(heightInPx);
    }

    export function addNotificationIcon(editor: Serenity.StringEditor, isSuccess: boolean): void {

        let isAddOnInitialized = editor.element.data('isAddOnInitialized');

        if (isAddOnInitialized != true) {
            editor.element.after('<span class="text text-danger" style="padding:3px"><i class="fa fa-times"></i></span>');
            editor.element.data('isAddOnInitialized', true);
        }

        if (isSuccess == true) {
            editor.element.switchClass('bg-danger', 'bg-success')
                .siblings('.text').switchClass('text-danger', 'text-success')
                .children().switchClass('fa-times', 'fa-check');
        } else {
            editor.element.switchClass('bg-success', 'bg-danger')
                .siblings('.text').switchClass('text-success', 'text-danger')
                .children().switchClass('fa-check', 'fa-times');

        }
    }

    export function setEditorLabel(editor: Serenity.Widget<any>, value: string) {

        editor.element.siblings('label').text(value);
    }

    export function hideEditorLabel(editor: Serenity.Widget<any>) {

        editor.element.siblings('label').hide();
    }

    export function setEditorCategoryLabel(editor: Serenity.Widget<any>, value: string) {
        let categoryAnchor = editor.element.closest('.category').find('.category-anchor');
        categoryAnchor.text(value);

        let categoryAnchorName = categoryAnchor.attr('name');
        categoryAnchor.closest('.s-PropertyGrid').find(`a[href='#${categoryAnchorName}']`).text(value);
    }

    export function hideEditorCategory(editor: Serenity.Widget<any>, value: boolean = true) {
        if (value == true)
            editor.element.closest('.category').hide();
        else
            editor.element.closest('.category').show();

        let categoryAnchor = editor.element.closest('.category').find('.category-anchor');

        let categoryAnchorName = categoryAnchor.attr('name');
        if (value == true)
            categoryAnchor.closest('.s-PropertyGrid').find(`a[href='#${categoryAnchorName}']`).hide();
        else
            categoryAnchor.closest('.s-PropertyGrid').find(`a[href='#${categoryAnchorName}']`).show();
    }

    export function hideField(editor: Serenity.Widget<any>, value: boolean = true) {
        if (value == true)
            editor.element.closest('.field').hide();
        else
            editor.element.closest('.field').show();
    }
    export function showField(editor: Serenity.Widget<any>, value: boolean = true) {
        if (value == true)
            editor.element.closest('.field').show();
        else
            editor.element.closest('.field').hide();
    }

    export function hideEditorTab(editor: Serenity.Widget<any>, value: boolean = true) {
        let tabId = editor.element.closest('.tab-pane').hide().attr('id');

        let tabAnchor = editor.element.closest('.s-PropertyGrid').find(`a[href='#${tabId}']`);

        tabAnchor.closest('li').hide();
    }

    export function readOnlyEditorTab(editor: Serenity.Widget<any>, value: boolean = true) {
        let $editors = editor.element.closest('.tab-pane').find('.editor');

        Serenity.EditorUtils.setReadonly($editors, value);
    }
        
    export function readOnlyEditorCategory(editor: Serenity.Widget<any>, value: boolean = true) {
        let $editors = editor.element.closest('.category').find('.editor');
        
        Serenity.EditorUtils.setReadonly($editors, value);
    }
    export function readonlyEditorCategory($editor: JQuery, value: boolean = true) {
        let $editors = $editor.closest('.category').find('.editor');
        Serenity.EditorUtils.setReadonly($editors, value);
    }

    export function readOnlyEditor(editor: Serenity.Widget<any>, value: boolean = true) {
        Serenity.EditorUtils.setReadOnly(editor, value);
    }

    export function readonlyEditor($editor: JQuery, value: boolean = true) {
        Serenity.EditorUtils.setReadonly($editor, value);
    }

    export function moveEditorFromTab(editor: Serenity.Widget<any>, toElement: JQuery, isPrepend = false) {
        let fieldDiv = editor.element.closest('.field');

        if (isPrepend == true)
            fieldDiv.prependTo(toElement);
        else
            fieldDiv.appendTo(toElement);
    }

    export function moveEditorCategoryFromTab(editor: Serenity.Widget<any>, toElement: JQuery, isPrepend = false) {
        let fieldDiv = editor.element.closest('.field');
        let categoryDiv = editor.element.closest('.category');

        if (isPrepend == true)
            categoryDiv.prependTo(toElement);
        else
            categoryDiv.appendTo(toElement);

        //hide category navigation link
        let categoryAnchor = categoryDiv.find('.category-anchor');
        let categoryAnchorName = categoryAnchor.attr('name');
        categoryAnchor.closest('.s-PropertyGrid').find(`a[href='#${categoryAnchorName}']`).hide();

    }

    export function selectEditorTab(editor: Serenity.Widget<any>) {
        let tabId = editor.element.closest('.tab-pane').attr('id');

        let tabAnchor = editor.element.closest('.s-PropertyGrid').find(`a[href='#${tabId}']`);

        (tabAnchor as any).tab('show');
    }

    // for select2 lookup editor
    export function getSelectedRow<TRow>(e: JQueryEventObject) {
        let selectedItem: Serenity.Select2Item = (e as any).added;
        let selectedRow: TRow = selectedItem.source;

        return selectedRow;
    }

}
