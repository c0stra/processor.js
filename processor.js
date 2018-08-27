/*
 * BSD 2-Clause License
 *
 * Copyright (c) 2018, Ondrej Fischer
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *  Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 *  Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 */


/**
 * Process a DOM node using provided processor.
 *
 * @param node Node to be processed.
 * @param processor Node processor. It accepts 2 arguments: function processor(node, optional output)
 * @param output Output context.
 */
function processNode(node, processor, output) {
    processor(node.nodeName || node.tagName, node, output);
}


/**
 * Process DOM node siblings starting with provided node using specified processor.
 *
 * @param node Node to start processing at.
 * @param processor Node processor.
 * @param output Output context.
 */
function processSiblingsFrom(node, processor, output) {
    for(var sibling = node; sibling != null; sibling = sibling.nextSibling) {
        processNode(sibling, processor, output);
    }
}


/**
 * Process all children of provided node using supplied processor.
 *
 * @param node Parent node, whose children should be processed.
 * @param processor Node processor.
 * @param output Output context.
 */
function processChildrenOf(node, processor, output) {
    processSiblingsFrom(node.firstChild, processor, output);
}


/**
 * Process all attributes of provided node using supplied processor.
 *
 * @param node Node, whose attribute should be processed.
 * @param processor Node processor.
 * @param output Output context.
 */
function processAttributesOf(node, processor, output) {
    for(var i = 0; i < node.attributes.length; i++) {
        processNode(node.attributes[i], processor, output);
    }
}


/**
 * Create processor, that applies rules based on tag name.
 *
 * @param dictionary Dictionary (object) with named rules.
 * @param default processor, if there is no mapping for the element.
 */
function rules(dictionary, defaultProcessor) {
    if(!defaultProcessor) {
        defaultProcessor = ignore;
    }
    function processor(name, node, output) {
        var nodeProcessor = dictionary[name];
        if(nodeProcessor) {
            nodeProcessor(node, output);
        } else {
            defaultProcessor(node, processor, output);
        }
    }
    return processor;
}


/**
 * Simple rule to ignore any further processing.
 */
function ignore() {
}


/**
 * Process all fields of provided object using supplied processor.
 *
 * @param node Node, whose attribute should be processed.
 * @param processor Node processor accepting 3 parameters: function processor(fieldName, value, optional output)
 * @param output Output context.
 */
function processFieldsOf(object, processor, output) {
    for(var field in object) {
        processor(field, object[field], output);
    }
}
