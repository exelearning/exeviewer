(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // node_modules/@xmldom/xmldom/lib/conventions.js
  var require_conventions = __commonJS({
    "node_modules/@xmldom/xmldom/lib/conventions.js"(exports) {
      "use strict";
      function find(list, predicate, ac) {
        if (ac === void 0) {
          ac = Array.prototype;
        }
        if (list && typeof ac.find === "function") {
          return ac.find.call(list, predicate);
        }
        for (var i = 0; i < list.length; i++) {
          if (Object.prototype.hasOwnProperty.call(list, i)) {
            var item = list[i];
            if (predicate.call(void 0, item, i, list)) {
              return item;
            }
          }
        }
      }
      function freeze(object, oc) {
        if (oc === void 0) {
          oc = Object;
        }
        return oc && typeof oc.freeze === "function" ? oc.freeze(object) : object;
      }
      function assign(target, source) {
        if (target === null || typeof target !== "object") {
          throw new TypeError("target is not an object");
        }
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
        return target;
      }
      var MIME_TYPE = freeze({
        /**
         * `text/html`, the only mime type that triggers treating an XML document as HTML.
         *
         * @see DOMParser.SupportedType.isHTML
         * @see https://www.iana.org/assignments/media-types/text/html IANA MimeType registration
         * @see https://en.wikipedia.org/wiki/HTML Wikipedia
         * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMParser/parseFromString MDN
         * @see https://html.spec.whatwg.org/multipage/dynamic-markup-insertion.html#dom-domparser-parsefromstring WHATWG HTML Spec
         */
        HTML: "text/html",
        /**
         * Helper method to check a mime type if it indicates an HTML document
         *
         * @param {string} [value]
         * @returns {boolean}
         *
         * @see https://www.iana.org/assignments/media-types/text/html IANA MimeType registration
         * @see https://en.wikipedia.org/wiki/HTML Wikipedia
         * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMParser/parseFromString MDN
         * @see https://html.spec.whatwg.org/multipage/dynamic-markup-insertion.html#dom-domparser-parsefromstring 	 */
        isHTML: function(value) {
          return value === MIME_TYPE.HTML;
        },
        /**
         * `application/xml`, the standard mime type for XML documents.
         *
         * @see https://www.iana.org/assignments/media-types/application/xml IANA MimeType registration
         * @see https://tools.ietf.org/html/rfc7303#section-9.1 RFC 7303
         * @see https://en.wikipedia.org/wiki/XML_and_MIME Wikipedia
         */
        XML_APPLICATION: "application/xml",
        /**
         * `text/html`, an alias for `application/xml`.
         *
         * @see https://tools.ietf.org/html/rfc7303#section-9.2 RFC 7303
         * @see https://www.iana.org/assignments/media-types/text/xml IANA MimeType registration
         * @see https://en.wikipedia.org/wiki/XML_and_MIME Wikipedia
         */
        XML_TEXT: "text/xml",
        /**
         * `application/xhtml+xml`, indicates an XML document that has the default HTML namespace,
         * but is parsed as an XML document.
         *
         * @see https://www.iana.org/assignments/media-types/application/xhtml+xml IANA MimeType registration
         * @see https://dom.spec.whatwg.org/#dom-domimplementation-createdocument WHATWG DOM Spec
         * @see https://en.wikipedia.org/wiki/XHTML Wikipedia
         */
        XML_XHTML_APPLICATION: "application/xhtml+xml",
        /**
         * `image/svg+xml`,
         *
         * @see https://www.iana.org/assignments/media-types/image/svg+xml IANA MimeType registration
         * @see https://www.w3.org/TR/SVG11/ W3C SVG 1.1
         * @see https://en.wikipedia.org/wiki/Scalable_Vector_Graphics Wikipedia
         */
        XML_SVG_IMAGE: "image/svg+xml"
      });
      var NAMESPACE = freeze({
        /**
         * The XHTML namespace.
         *
         * @see http://www.w3.org/1999/xhtml
         */
        HTML: "http://www.w3.org/1999/xhtml",
        /**
         * Checks if `uri` equals `NAMESPACE.HTML`.
         *
         * @param {string} [uri]
         *
         * @see NAMESPACE.HTML
         */
        isHTML: function(uri) {
          return uri === NAMESPACE.HTML;
        },
        /**
         * The SVG namespace.
         *
         * @see http://www.w3.org/2000/svg
         */
        SVG: "http://www.w3.org/2000/svg",
        /**
         * The `xml:` namespace.
         *
         * @see http://www.w3.org/XML/1998/namespace
         */
        XML: "http://www.w3.org/XML/1998/namespace",
        /**
         * The `xmlns:` namespace
         *
         * @see https://www.w3.org/2000/xmlns/
         */
        XMLNS: "http://www.w3.org/2000/xmlns/"
      });
      exports.assign = assign;
      exports.find = find;
      exports.freeze = freeze;
      exports.MIME_TYPE = MIME_TYPE;
      exports.NAMESPACE = NAMESPACE;
    }
  });

  // node_modules/@xmldom/xmldom/lib/dom.js
  var require_dom = __commonJS({
    "node_modules/@xmldom/xmldom/lib/dom.js"(exports) {
      var conventions = require_conventions();
      var find = conventions.find;
      var NAMESPACE = conventions.NAMESPACE;
      function notEmptyString(input) {
        return input !== "";
      }
      function splitOnASCIIWhitespace(input) {
        return input ? input.split(/[\t\n\f\r ]+/).filter(notEmptyString) : [];
      }
      function orderedSetReducer(current, element) {
        if (!current.hasOwnProperty(element)) {
          current[element] = true;
        }
        return current;
      }
      function toOrderedSet(input) {
        if (!input) return [];
        var list = splitOnASCIIWhitespace(input);
        return Object.keys(list.reduce(orderedSetReducer, {}));
      }
      function arrayIncludes(list) {
        return function(element) {
          return list && list.indexOf(element) !== -1;
        };
      }
      function copy(src, dest) {
        for (var p in src) {
          if (Object.prototype.hasOwnProperty.call(src, p)) {
            dest[p] = src[p];
          }
        }
      }
      function _extends(Class, Super) {
        var pt = Class.prototype;
        if (!(pt instanceof Super)) {
          let t2 = function() {
          };
          var t = t2;
          ;
          t2.prototype = Super.prototype;
          t2 = new t2();
          copy(pt, t2);
          Class.prototype = pt = t2;
        }
        if (pt.constructor != Class) {
          if (typeof Class != "function") {
            console.error("unknown Class:" + Class);
          }
          pt.constructor = Class;
        }
      }
      var NodeType = {};
      var ELEMENT_NODE = NodeType.ELEMENT_NODE = 1;
      var ATTRIBUTE_NODE = NodeType.ATTRIBUTE_NODE = 2;
      var TEXT_NODE = NodeType.TEXT_NODE = 3;
      var CDATA_SECTION_NODE = NodeType.CDATA_SECTION_NODE = 4;
      var ENTITY_REFERENCE_NODE = NodeType.ENTITY_REFERENCE_NODE = 5;
      var ENTITY_NODE = NodeType.ENTITY_NODE = 6;
      var PROCESSING_INSTRUCTION_NODE = NodeType.PROCESSING_INSTRUCTION_NODE = 7;
      var COMMENT_NODE = NodeType.COMMENT_NODE = 8;
      var DOCUMENT_NODE = NodeType.DOCUMENT_NODE = 9;
      var DOCUMENT_TYPE_NODE = NodeType.DOCUMENT_TYPE_NODE = 10;
      var DOCUMENT_FRAGMENT_NODE = NodeType.DOCUMENT_FRAGMENT_NODE = 11;
      var NOTATION_NODE = NodeType.NOTATION_NODE = 12;
      var ExceptionCode = {};
      var ExceptionMessage = {};
      var INDEX_SIZE_ERR = ExceptionCode.INDEX_SIZE_ERR = (ExceptionMessage[1] = "Index size error", 1);
      var DOMSTRING_SIZE_ERR = ExceptionCode.DOMSTRING_SIZE_ERR = (ExceptionMessage[2] = "DOMString size error", 2);
      var HIERARCHY_REQUEST_ERR = ExceptionCode.HIERARCHY_REQUEST_ERR = (ExceptionMessage[3] = "Hierarchy request error", 3);
      var WRONG_DOCUMENT_ERR = ExceptionCode.WRONG_DOCUMENT_ERR = (ExceptionMessage[4] = "Wrong document", 4);
      var INVALID_CHARACTER_ERR = ExceptionCode.INVALID_CHARACTER_ERR = (ExceptionMessage[5] = "Invalid character", 5);
      var NO_DATA_ALLOWED_ERR = ExceptionCode.NO_DATA_ALLOWED_ERR = (ExceptionMessage[6] = "No data allowed", 6);
      var NO_MODIFICATION_ALLOWED_ERR = ExceptionCode.NO_MODIFICATION_ALLOWED_ERR = (ExceptionMessage[7] = "No modification allowed", 7);
      var NOT_FOUND_ERR = ExceptionCode.NOT_FOUND_ERR = (ExceptionMessage[8] = "Not found", 8);
      var NOT_SUPPORTED_ERR = ExceptionCode.NOT_SUPPORTED_ERR = (ExceptionMessage[9] = "Not supported", 9);
      var INUSE_ATTRIBUTE_ERR = ExceptionCode.INUSE_ATTRIBUTE_ERR = (ExceptionMessage[10] = "Attribute in use", 10);
      var INVALID_STATE_ERR = ExceptionCode.INVALID_STATE_ERR = (ExceptionMessage[11] = "Invalid state", 11);
      var SYNTAX_ERR = ExceptionCode.SYNTAX_ERR = (ExceptionMessage[12] = "Syntax error", 12);
      var INVALID_MODIFICATION_ERR = ExceptionCode.INVALID_MODIFICATION_ERR = (ExceptionMessage[13] = "Invalid modification", 13);
      var NAMESPACE_ERR = ExceptionCode.NAMESPACE_ERR = (ExceptionMessage[14] = "Invalid namespace", 14);
      var INVALID_ACCESS_ERR = ExceptionCode.INVALID_ACCESS_ERR = (ExceptionMessage[15] = "Invalid access", 15);
      function DOMException(code, message) {
        if (message instanceof Error) {
          var error = message;
        } else {
          error = this;
          Error.call(this, ExceptionMessage[code]);
          this.message = ExceptionMessage[code];
          if (Error.captureStackTrace) Error.captureStackTrace(this, DOMException);
        }
        error.code = code;
        if (message) this.message = this.message + ": " + message;
        return error;
      }
      DOMException.prototype = Error.prototype;
      copy(ExceptionCode, DOMException);
      function NodeList() {
      }
      NodeList.prototype = {
        /**
         * The number of nodes in the list. The range of valid child node indices is 0 to length-1 inclusive.
         * @standard level1
         */
        length: 0,
        /**
         * Returns the indexth item in the collection. If index is greater than or equal to the number of nodes in the list, this returns null.
         * @standard level1
         * @param index  unsigned long
         *   Index into the collection.
         * @return Node
         * 	The node at the indexth position in the NodeList, or null if that is not a valid index.
         */
        item: function(index) {
          return index >= 0 && index < this.length ? this[index] : null;
        },
        toString: function(isHTML, nodeFilter) {
          for (var buf = [], i = 0; i < this.length; i++) {
            serializeToString(this[i], buf, isHTML, nodeFilter);
          }
          return buf.join("");
        },
        /**
         * @private
         * @param {function (Node):boolean} predicate
         * @returns {Node[]}
         */
        filter: function(predicate) {
          return Array.prototype.filter.call(this, predicate);
        },
        /**
         * @private
         * @param {Node} item
         * @returns {number}
         */
        indexOf: function(item) {
          return Array.prototype.indexOf.call(this, item);
        }
      };
      function LiveNodeList(node, refresh) {
        this._node = node;
        this._refresh = refresh;
        _updateLiveList(this);
      }
      function _updateLiveList(list) {
        var inc = list._node._inc || list._node.ownerDocument._inc;
        if (list._inc !== inc) {
          var ls = list._refresh(list._node);
          __set__(list, "length", ls.length);
          if (!list.$$length || ls.length < list.$$length) {
            for (var i = ls.length; i in list; i++) {
              if (Object.prototype.hasOwnProperty.call(list, i)) {
                delete list[i];
              }
            }
          }
          copy(ls, list);
          list._inc = inc;
        }
      }
      LiveNodeList.prototype.item = function(i) {
        _updateLiveList(this);
        return this[i] || null;
      };
      _extends(LiveNodeList, NodeList);
      function NamedNodeMap() {
      }
      function _findNodeIndex(list, node) {
        var i = list.length;
        while (i--) {
          if (list[i] === node) {
            return i;
          }
        }
      }
      function _addNamedNode(el, list, newAttr, oldAttr) {
        if (oldAttr) {
          list[_findNodeIndex(list, oldAttr)] = newAttr;
        } else {
          list[list.length++] = newAttr;
        }
        if (el) {
          newAttr.ownerElement = el;
          var doc = el.ownerDocument;
          if (doc) {
            oldAttr && _onRemoveAttribute(doc, el, oldAttr);
            _onAddAttribute(doc, el, newAttr);
          }
        }
      }
      function _removeNamedNode(el, list, attr) {
        var i = _findNodeIndex(list, attr);
        if (i >= 0) {
          var lastIndex = list.length - 1;
          while (i < lastIndex) {
            list[i] = list[++i];
          }
          list.length = lastIndex;
          if (el) {
            var doc = el.ownerDocument;
            if (doc) {
              _onRemoveAttribute(doc, el, attr);
              attr.ownerElement = null;
            }
          }
        } else {
          throw new DOMException(NOT_FOUND_ERR, new Error(el.tagName + "@" + attr));
        }
      }
      NamedNodeMap.prototype = {
        length: 0,
        item: NodeList.prototype.item,
        getNamedItem: function(key) {
          var i = this.length;
          while (i--) {
            var attr = this[i];
            if (attr.nodeName == key) {
              return attr;
            }
          }
        },
        setNamedItem: function(attr) {
          var el = attr.ownerElement;
          if (el && el != this._ownerElement) {
            throw new DOMException(INUSE_ATTRIBUTE_ERR);
          }
          var oldAttr = this.getNamedItem(attr.nodeName);
          _addNamedNode(this._ownerElement, this, attr, oldAttr);
          return oldAttr;
        },
        /* returns Node */
        setNamedItemNS: function(attr) {
          var el = attr.ownerElement, oldAttr;
          if (el && el != this._ownerElement) {
            throw new DOMException(INUSE_ATTRIBUTE_ERR);
          }
          oldAttr = this.getNamedItemNS(attr.namespaceURI, attr.localName);
          _addNamedNode(this._ownerElement, this, attr, oldAttr);
          return oldAttr;
        },
        /* returns Node */
        removeNamedItem: function(key) {
          var attr = this.getNamedItem(key);
          _removeNamedNode(this._ownerElement, this, attr);
          return attr;
        },
        // raises: NOT_FOUND_ERR,NO_MODIFICATION_ALLOWED_ERR
        //for level2
        removeNamedItemNS: function(namespaceURI, localName) {
          var attr = this.getNamedItemNS(namespaceURI, localName);
          _removeNamedNode(this._ownerElement, this, attr);
          return attr;
        },
        getNamedItemNS: function(namespaceURI, localName) {
          var i = this.length;
          while (i--) {
            var node = this[i];
            if (node.localName == localName && node.namespaceURI == namespaceURI) {
              return node;
            }
          }
          return null;
        }
      };
      function DOMImplementation() {
      }
      DOMImplementation.prototype = {
        /**
         * The DOMImplementation.hasFeature() method returns a Boolean flag indicating if a given feature is supported.
         * The different implementations fairly diverged in what kind of features were reported.
         * The latest version of the spec settled to force this method to always return true, where the functionality was accurate and in use.
         *
         * @deprecated It is deprecated and modern browsers return true in all cases.
         *
         * @param {string} feature
         * @param {string} [version]
         * @returns {boolean} always true
         *
         * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMImplementation/hasFeature MDN
         * @see https://www.w3.org/TR/REC-DOM-Level-1/level-one-core.html#ID-5CED94D7 DOM Level 1 Core
         * @see https://dom.spec.whatwg.org/#dom-domimplementation-hasfeature DOM Living Standard
         */
        hasFeature: function(feature, version) {
          return true;
        },
        /**
         * Creates an XML Document object of the specified type with its document element.
         *
         * __It behaves slightly different from the description in the living standard__:
         * - There is no interface/class `XMLDocument`, it returns a `Document` instance.
         * - `contentType`, `encoding`, `mode`, `origin`, `url` fields are currently not declared.
         * - this implementation is not validating names or qualified names
         *   (when parsing XML strings, the SAX parser takes care of that)
         *
         * @param {string|null} namespaceURI
         * @param {string} qualifiedName
         * @param {DocumentType=null} doctype
         * @returns {Document}
         *
         * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMImplementation/createDocument MDN
         * @see https://www.w3.org/TR/DOM-Level-2-Core/core.html#Level-2-Core-DOM-createDocument DOM Level 2 Core (initial)
         * @see https://dom.spec.whatwg.org/#dom-domimplementation-createdocument  DOM Level 2 Core
         *
         * @see https://dom.spec.whatwg.org/#validate-and-extract DOM: Validate and extract
         * @see https://www.w3.org/TR/xml/#NT-NameStartChar XML Spec: Names
         * @see https://www.w3.org/TR/xml-names/#ns-qualnames XML Namespaces: Qualified names
         */
        createDocument: function(namespaceURI, qualifiedName, doctype) {
          var doc = new Document();
          doc.implementation = this;
          doc.childNodes = new NodeList();
          doc.doctype = doctype || null;
          if (doctype) {
            doc.appendChild(doctype);
          }
          if (qualifiedName) {
            var root = doc.createElementNS(namespaceURI, qualifiedName);
            doc.appendChild(root);
          }
          return doc;
        },
        /**
         * Returns a doctype, with the given `qualifiedName`, `publicId`, and `systemId`.
         *
         * __This behavior is slightly different from the in the specs__:
         * - this implementation is not validating names or qualified names
         *   (when parsing XML strings, the SAX parser takes care of that)
         *
         * @param {string} qualifiedName
         * @param {string} [publicId]
         * @param {string} [systemId]
         * @returns {DocumentType} which can either be used with `DOMImplementation.createDocument` upon document creation
         * 				  or can be put into the document via methods like `Node.insertBefore()` or `Node.replaceChild()`
         *
         * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMImplementation/createDocumentType MDN
         * @see https://www.w3.org/TR/DOM-Level-2-Core/core.html#Level-2-Core-DOM-createDocType DOM Level 2 Core
         * @see https://dom.spec.whatwg.org/#dom-domimplementation-createdocumenttype DOM Living Standard
         *
         * @see https://dom.spec.whatwg.org/#validate-and-extract DOM: Validate and extract
         * @see https://www.w3.org/TR/xml/#NT-NameStartChar XML Spec: Names
         * @see https://www.w3.org/TR/xml-names/#ns-qualnames XML Namespaces: Qualified names
         */
        createDocumentType: function(qualifiedName, publicId, systemId) {
          var node = new DocumentType();
          node.name = qualifiedName;
          node.nodeName = qualifiedName;
          node.publicId = publicId || "";
          node.systemId = systemId || "";
          return node;
        }
      };
      function Node() {
      }
      Node.prototype = {
        firstChild: null,
        lastChild: null,
        previousSibling: null,
        nextSibling: null,
        attributes: null,
        parentNode: null,
        childNodes: null,
        ownerDocument: null,
        nodeValue: null,
        namespaceURI: null,
        prefix: null,
        localName: null,
        // Modified in DOM Level 2:
        insertBefore: function(newChild, refChild) {
          return _insertBefore(this, newChild, refChild);
        },
        replaceChild: function(newChild, oldChild) {
          _insertBefore(this, newChild, oldChild, assertPreReplacementValidityInDocument);
          if (oldChild) {
            this.removeChild(oldChild);
          }
        },
        removeChild: function(oldChild) {
          return _removeChild(this, oldChild);
        },
        appendChild: function(newChild) {
          return this.insertBefore(newChild, null);
        },
        hasChildNodes: function() {
          return this.firstChild != null;
        },
        cloneNode: function(deep) {
          return cloneNode(this.ownerDocument || this, this, deep);
        },
        // Modified in DOM Level 2:
        normalize: function() {
          var child = this.firstChild;
          while (child) {
            var next = child.nextSibling;
            if (next && next.nodeType == TEXT_NODE && child.nodeType == TEXT_NODE) {
              this.removeChild(next);
              child.appendData(next.data);
            } else {
              child.normalize();
              child = next;
            }
          }
        },
        // Introduced in DOM Level 2:
        isSupported: function(feature, version) {
          return this.ownerDocument.implementation.hasFeature(feature, version);
        },
        // Introduced in DOM Level 2:
        hasAttributes: function() {
          return this.attributes.length > 0;
        },
        /**
         * Look up the prefix associated to the given namespace URI, starting from this node.
         * **The default namespace declarations are ignored by this method.**
         * See Namespace Prefix Lookup for details on the algorithm used by this method.
         *
         * _Note: The implementation seems to be incomplete when compared to the algorithm described in the specs._
         *
         * @param {string | null} namespaceURI
         * @returns {string | null}
         * @see https://www.w3.org/TR/DOM-Level-3-Core/core.html#Node3-lookupNamespacePrefix
         * @see https://www.w3.org/TR/DOM-Level-3-Core/namespaces-algorithms.html#lookupNamespacePrefixAlgo
         * @see https://dom.spec.whatwg.org/#dom-node-lookupprefix
         * @see https://github.com/xmldom/xmldom/issues/322
         */
        lookupPrefix: function(namespaceURI) {
          var el = this;
          while (el) {
            var map = el._nsMap;
            if (map) {
              for (var n in map) {
                if (Object.prototype.hasOwnProperty.call(map, n) && map[n] === namespaceURI) {
                  return n;
                }
              }
            }
            el = el.nodeType == ATTRIBUTE_NODE ? el.ownerDocument : el.parentNode;
          }
          return null;
        },
        // Introduced in DOM Level 3:
        lookupNamespaceURI: function(prefix) {
          var el = this;
          while (el) {
            var map = el._nsMap;
            if (map) {
              if (Object.prototype.hasOwnProperty.call(map, prefix)) {
                return map[prefix];
              }
            }
            el = el.nodeType == ATTRIBUTE_NODE ? el.ownerDocument : el.parentNode;
          }
          return null;
        },
        // Introduced in DOM Level 3:
        isDefaultNamespace: function(namespaceURI) {
          var prefix = this.lookupPrefix(namespaceURI);
          return prefix == null;
        }
      };
      function _xmlEncoder(c) {
        return c == "<" && "&lt;" || c == ">" && "&gt;" || c == "&" && "&amp;" || c == '"' && "&quot;" || "&#" + c.charCodeAt() + ";";
      }
      copy(NodeType, Node);
      copy(NodeType, Node.prototype);
      function _visitNode(node, callback) {
        if (callback(node)) {
          return true;
        }
        if (node = node.firstChild) {
          do {
            if (_visitNode(node, callback)) {
              return true;
            }
          } while (node = node.nextSibling);
        }
      }
      function Document() {
        this.ownerDocument = this;
      }
      function _onAddAttribute(doc, el, newAttr) {
        doc && doc._inc++;
        var ns = newAttr.namespaceURI;
        if (ns === NAMESPACE.XMLNS) {
          el._nsMap[newAttr.prefix ? newAttr.localName : ""] = newAttr.value;
        }
      }
      function _onRemoveAttribute(doc, el, newAttr, remove) {
        doc && doc._inc++;
        var ns = newAttr.namespaceURI;
        if (ns === NAMESPACE.XMLNS) {
          delete el._nsMap[newAttr.prefix ? newAttr.localName : ""];
        }
      }
      function _onUpdateChild(doc, el, newChild) {
        if (doc && doc._inc) {
          doc._inc++;
          var cs = el.childNodes;
          if (newChild) {
            cs[cs.length++] = newChild;
          } else {
            var child = el.firstChild;
            var i = 0;
            while (child) {
              cs[i++] = child;
              child = child.nextSibling;
            }
            cs.length = i;
            delete cs[cs.length];
          }
        }
      }
      function _removeChild(parentNode, child) {
        var previous = child.previousSibling;
        var next = child.nextSibling;
        if (previous) {
          previous.nextSibling = next;
        } else {
          parentNode.firstChild = next;
        }
        if (next) {
          next.previousSibling = previous;
        } else {
          parentNode.lastChild = previous;
        }
        child.parentNode = null;
        child.previousSibling = null;
        child.nextSibling = null;
        _onUpdateChild(parentNode.ownerDocument, parentNode);
        return child;
      }
      function hasValidParentNodeType(node) {
        return node && (node.nodeType === Node.DOCUMENT_NODE || node.nodeType === Node.DOCUMENT_FRAGMENT_NODE || node.nodeType === Node.ELEMENT_NODE);
      }
      function hasInsertableNodeType(node) {
        return node && (isElementNode(node) || isTextNode(node) || isDocTypeNode(node) || node.nodeType === Node.DOCUMENT_FRAGMENT_NODE || node.nodeType === Node.COMMENT_NODE || node.nodeType === Node.PROCESSING_INSTRUCTION_NODE);
      }
      function isDocTypeNode(node) {
        return node && node.nodeType === Node.DOCUMENT_TYPE_NODE;
      }
      function isElementNode(node) {
        return node && node.nodeType === Node.ELEMENT_NODE;
      }
      function isTextNode(node) {
        return node && node.nodeType === Node.TEXT_NODE;
      }
      function isElementInsertionPossible(doc, child) {
        var parentChildNodes = doc.childNodes || [];
        if (find(parentChildNodes, isElementNode) || isDocTypeNode(child)) {
          return false;
        }
        var docTypeNode = find(parentChildNodes, isDocTypeNode);
        return !(child && docTypeNode && parentChildNodes.indexOf(docTypeNode) > parentChildNodes.indexOf(child));
      }
      function isElementReplacementPossible(doc, child) {
        var parentChildNodes = doc.childNodes || [];
        function hasElementChildThatIsNotChild(node) {
          return isElementNode(node) && node !== child;
        }
        if (find(parentChildNodes, hasElementChildThatIsNotChild)) {
          return false;
        }
        var docTypeNode = find(parentChildNodes, isDocTypeNode);
        return !(child && docTypeNode && parentChildNodes.indexOf(docTypeNode) > parentChildNodes.indexOf(child));
      }
      function assertPreInsertionValidity1to5(parent, node, child) {
        if (!hasValidParentNodeType(parent)) {
          throw new DOMException(HIERARCHY_REQUEST_ERR, "Unexpected parent node type " + parent.nodeType);
        }
        if (child && child.parentNode !== parent) {
          throw new DOMException(NOT_FOUND_ERR, "child not in parent");
        }
        if (
          // 4. If `node` is not a DocumentFragment, DocumentType, Element, or CharacterData node, then throw a "HierarchyRequestError" DOMException.
          !hasInsertableNodeType(node) || // 5. If either `node` is a Text node and `parent` is a document,
          // the sax parser currently adds top level text nodes, this will be fixed in 0.9.0
          // || (node.nodeType === Node.TEXT_NODE && parent.nodeType === Node.DOCUMENT_NODE)
          // or `node` is a doctype and `parent` is not a document, then throw a "HierarchyRequestError" DOMException.
          isDocTypeNode(node) && parent.nodeType !== Node.DOCUMENT_NODE
        ) {
          throw new DOMException(
            HIERARCHY_REQUEST_ERR,
            "Unexpected node type " + node.nodeType + " for parent node type " + parent.nodeType
          );
        }
      }
      function assertPreInsertionValidityInDocument(parent, node, child) {
        var parentChildNodes = parent.childNodes || [];
        var nodeChildNodes = node.childNodes || [];
        if (node.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
          var nodeChildElements = nodeChildNodes.filter(isElementNode);
          if (nodeChildElements.length > 1 || find(nodeChildNodes, isTextNode)) {
            throw new DOMException(HIERARCHY_REQUEST_ERR, "More than one element or text in fragment");
          }
          if (nodeChildElements.length === 1 && !isElementInsertionPossible(parent, child)) {
            throw new DOMException(HIERARCHY_REQUEST_ERR, "Element in fragment can not be inserted before doctype");
          }
        }
        if (isElementNode(node)) {
          if (!isElementInsertionPossible(parent, child)) {
            throw new DOMException(HIERARCHY_REQUEST_ERR, "Only one element can be added and only after doctype");
          }
        }
        if (isDocTypeNode(node)) {
          if (find(parentChildNodes, isDocTypeNode)) {
            throw new DOMException(HIERARCHY_REQUEST_ERR, "Only one doctype is allowed");
          }
          var parentElementChild = find(parentChildNodes, isElementNode);
          if (child && parentChildNodes.indexOf(parentElementChild) < parentChildNodes.indexOf(child)) {
            throw new DOMException(HIERARCHY_REQUEST_ERR, "Doctype can only be inserted before an element");
          }
          if (!child && parentElementChild) {
            throw new DOMException(HIERARCHY_REQUEST_ERR, "Doctype can not be appended since element is present");
          }
        }
      }
      function assertPreReplacementValidityInDocument(parent, node, child) {
        var parentChildNodes = parent.childNodes || [];
        var nodeChildNodes = node.childNodes || [];
        if (node.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
          var nodeChildElements = nodeChildNodes.filter(isElementNode);
          if (nodeChildElements.length > 1 || find(nodeChildNodes, isTextNode)) {
            throw new DOMException(HIERARCHY_REQUEST_ERR, "More than one element or text in fragment");
          }
          if (nodeChildElements.length === 1 && !isElementReplacementPossible(parent, child)) {
            throw new DOMException(HIERARCHY_REQUEST_ERR, "Element in fragment can not be inserted before doctype");
          }
        }
        if (isElementNode(node)) {
          if (!isElementReplacementPossible(parent, child)) {
            throw new DOMException(HIERARCHY_REQUEST_ERR, "Only one element can be added and only after doctype");
          }
        }
        if (isDocTypeNode(node)) {
          let hasDoctypeChildThatIsNotChild2 = function(node2) {
            return isDocTypeNode(node2) && node2 !== child;
          };
          var hasDoctypeChildThatIsNotChild = hasDoctypeChildThatIsNotChild2;
          if (find(parentChildNodes, hasDoctypeChildThatIsNotChild2)) {
            throw new DOMException(HIERARCHY_REQUEST_ERR, "Only one doctype is allowed");
          }
          var parentElementChild = find(parentChildNodes, isElementNode);
          if (child && parentChildNodes.indexOf(parentElementChild) < parentChildNodes.indexOf(child)) {
            throw new DOMException(HIERARCHY_REQUEST_ERR, "Doctype can only be inserted before an element");
          }
        }
      }
      function _insertBefore(parent, node, child, _inDocumentAssertion) {
        assertPreInsertionValidity1to5(parent, node, child);
        if (parent.nodeType === Node.DOCUMENT_NODE) {
          (_inDocumentAssertion || assertPreInsertionValidityInDocument)(parent, node, child);
        }
        var cp = node.parentNode;
        if (cp) {
          cp.removeChild(node);
        }
        if (node.nodeType === DOCUMENT_FRAGMENT_NODE) {
          var newFirst = node.firstChild;
          if (newFirst == null) {
            return node;
          }
          var newLast = node.lastChild;
        } else {
          newFirst = newLast = node;
        }
        var pre = child ? child.previousSibling : parent.lastChild;
        newFirst.previousSibling = pre;
        newLast.nextSibling = child;
        if (pre) {
          pre.nextSibling = newFirst;
        } else {
          parent.firstChild = newFirst;
        }
        if (child == null) {
          parent.lastChild = newLast;
        } else {
          child.previousSibling = newLast;
        }
        do {
          newFirst.parentNode = parent;
          var targetDoc = parent.ownerDocument || parent;
          _updateOwnerDocument(newFirst, targetDoc);
        } while (newFirst !== newLast && (newFirst = newFirst.nextSibling));
        _onUpdateChild(parent.ownerDocument || parent, parent);
        if (node.nodeType == DOCUMENT_FRAGMENT_NODE) {
          node.firstChild = node.lastChild = null;
        }
        return node;
      }
      function _updateOwnerDocument(node, newOwnerDocument) {
        if (node.ownerDocument === newOwnerDocument) {
          return;
        }
        node.ownerDocument = newOwnerDocument;
        if (node.nodeType === ELEMENT_NODE && node.attributes) {
          for (var i = 0; i < node.attributes.length; i++) {
            var attr = node.attributes.item(i);
            if (attr) {
              attr.ownerDocument = newOwnerDocument;
            }
          }
        }
        var child = node.firstChild;
        while (child) {
          _updateOwnerDocument(child, newOwnerDocument);
          child = child.nextSibling;
        }
      }
      function _appendSingleChild(parentNode, newChild) {
        if (newChild.parentNode) {
          newChild.parentNode.removeChild(newChild);
        }
        newChild.parentNode = parentNode;
        newChild.previousSibling = parentNode.lastChild;
        newChild.nextSibling = null;
        if (newChild.previousSibling) {
          newChild.previousSibling.nextSibling = newChild;
        } else {
          parentNode.firstChild = newChild;
        }
        parentNode.lastChild = newChild;
        _onUpdateChild(parentNode.ownerDocument, parentNode, newChild);
        var targetDoc = parentNode.ownerDocument || parentNode;
        _updateOwnerDocument(newChild, targetDoc);
        return newChild;
      }
      Document.prototype = {
        //implementation : null,
        nodeName: "#document",
        nodeType: DOCUMENT_NODE,
        /**
         * The DocumentType node of the document.
         *
         * @readonly
         * @type DocumentType
         */
        doctype: null,
        documentElement: null,
        _inc: 1,
        insertBefore: function(newChild, refChild) {
          if (newChild.nodeType == DOCUMENT_FRAGMENT_NODE) {
            var child = newChild.firstChild;
            while (child) {
              var next = child.nextSibling;
              this.insertBefore(child, refChild);
              child = next;
            }
            return newChild;
          }
          _insertBefore(this, newChild, refChild);
          _updateOwnerDocument(newChild, this);
          if (this.documentElement === null && newChild.nodeType === ELEMENT_NODE) {
            this.documentElement = newChild;
          }
          return newChild;
        },
        removeChild: function(oldChild) {
          if (this.documentElement == oldChild) {
            this.documentElement = null;
          }
          return _removeChild(this, oldChild);
        },
        replaceChild: function(newChild, oldChild) {
          _insertBefore(this, newChild, oldChild, assertPreReplacementValidityInDocument);
          _updateOwnerDocument(newChild, this);
          if (oldChild) {
            this.removeChild(oldChild);
          }
          if (isElementNode(newChild)) {
            this.documentElement = newChild;
          }
        },
        // Introduced in DOM Level 2:
        importNode: function(importedNode, deep) {
          return importNode(this, importedNode, deep);
        },
        // Introduced in DOM Level 2:
        getElementById: function(id) {
          var rtv = null;
          _visitNode(this.documentElement, function(node) {
            if (node.nodeType == ELEMENT_NODE) {
              if (node.getAttribute("id") == id) {
                rtv = node;
                return true;
              }
            }
          });
          return rtv;
        },
        /**
         * The `getElementsByClassName` method of `Document` interface returns an array-like object
         * of all child elements which have **all** of the given class name(s).
         *
         * Returns an empty list if `classeNames` is an empty string or only contains HTML white space characters.
         *
         *
         * Warning: This is a live LiveNodeList.
         * Changes in the DOM will reflect in the array as the changes occur.
         * If an element selected by this array no longer qualifies for the selector,
         * it will automatically be removed. Be aware of this for iteration purposes.
         *
         * @param {string} classNames is a string representing the class name(s) to match; multiple class names are separated by (ASCII-)whitespace
         *
         * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementsByClassName
         * @see https://dom.spec.whatwg.org/#concept-getelementsbyclassname
         */
        getElementsByClassName: function(classNames) {
          var classNamesSet = toOrderedSet(classNames);
          return new LiveNodeList(this, function(base) {
            var ls = [];
            if (classNamesSet.length > 0) {
              _visitNode(base.documentElement, function(node) {
                if (node !== base && node.nodeType === ELEMENT_NODE) {
                  var nodeClassNames = node.getAttribute("class");
                  if (nodeClassNames) {
                    var matches = classNames === nodeClassNames;
                    if (!matches) {
                      var nodeClassNamesSet = toOrderedSet(nodeClassNames);
                      matches = classNamesSet.every(arrayIncludes(nodeClassNamesSet));
                    }
                    if (matches) {
                      ls.push(node);
                    }
                  }
                }
              });
            }
            return ls;
          });
        },
        //document factory method:
        createElement: function(tagName) {
          var node = new Element();
          node.ownerDocument = this;
          node.nodeName = tagName;
          node.tagName = tagName;
          node.localName = tagName;
          node.childNodes = new NodeList();
          var attrs = node.attributes = new NamedNodeMap();
          attrs._ownerElement = node;
          return node;
        },
        createDocumentFragment: function() {
          var node = new DocumentFragment();
          node.ownerDocument = this;
          node.childNodes = new NodeList();
          return node;
        },
        createTextNode: function(data) {
          var node = new Text2();
          node.ownerDocument = this;
          node.appendData(data);
          return node;
        },
        createComment: function(data) {
          var node = new Comment();
          node.ownerDocument = this;
          node.appendData(data);
          return node;
        },
        createCDATASection: function(data) {
          var node = new CDATASection();
          node.ownerDocument = this;
          node.appendData(data);
          return node;
        },
        createProcessingInstruction: function(target, data) {
          var node = new ProcessingInstruction();
          node.ownerDocument = this;
          node.tagName = node.nodeName = node.target = target;
          node.nodeValue = node.data = data;
          return node;
        },
        createAttribute: function(name) {
          var node = new Attr();
          node.ownerDocument = this;
          node.name = name;
          node.nodeName = name;
          node.localName = name;
          node.specified = true;
          return node;
        },
        createEntityReference: function(name) {
          var node = new EntityReference();
          node.ownerDocument = this;
          node.nodeName = name;
          return node;
        },
        // Introduced in DOM Level 2:
        createElementNS: function(namespaceURI, qualifiedName) {
          var node = new Element();
          var pl = qualifiedName.split(":");
          var attrs = node.attributes = new NamedNodeMap();
          node.childNodes = new NodeList();
          node.ownerDocument = this;
          node.nodeName = qualifiedName;
          node.tagName = qualifiedName;
          node.namespaceURI = namespaceURI;
          if (pl.length == 2) {
            node.prefix = pl[0];
            node.localName = pl[1];
          } else {
            node.localName = qualifiedName;
          }
          attrs._ownerElement = node;
          return node;
        },
        // Introduced in DOM Level 2:
        createAttributeNS: function(namespaceURI, qualifiedName) {
          var node = new Attr();
          var pl = qualifiedName.split(":");
          node.ownerDocument = this;
          node.nodeName = qualifiedName;
          node.name = qualifiedName;
          node.namespaceURI = namespaceURI;
          node.specified = true;
          if (pl.length == 2) {
            node.prefix = pl[0];
            node.localName = pl[1];
          } else {
            node.localName = qualifiedName;
          }
          return node;
        }
      };
      _extends(Document, Node);
      function Element() {
        this._nsMap = {};
      }
      Element.prototype = {
        nodeType: ELEMENT_NODE,
        hasAttribute: function(name) {
          return this.getAttributeNode(name) != null;
        },
        getAttribute: function(name) {
          var attr = this.getAttributeNode(name);
          return attr && attr.value || "";
        },
        getAttributeNode: function(name) {
          return this.attributes.getNamedItem(name);
        },
        setAttribute: function(name, value) {
          var attr = this.ownerDocument.createAttribute(name);
          attr.value = attr.nodeValue = "" + value;
          this.setAttributeNode(attr);
        },
        removeAttribute: function(name) {
          var attr = this.getAttributeNode(name);
          attr && this.removeAttributeNode(attr);
        },
        //four real opeartion method
        appendChild: function(newChild) {
          if (newChild.nodeType === DOCUMENT_FRAGMENT_NODE) {
            return this.insertBefore(newChild, null);
          } else {
            return _appendSingleChild(this, newChild);
          }
        },
        setAttributeNode: function(newAttr) {
          return this.attributes.setNamedItem(newAttr);
        },
        setAttributeNodeNS: function(newAttr) {
          return this.attributes.setNamedItemNS(newAttr);
        },
        removeAttributeNode: function(oldAttr) {
          return this.attributes.removeNamedItem(oldAttr.nodeName);
        },
        //get real attribute name,and remove it by removeAttributeNode
        removeAttributeNS: function(namespaceURI, localName) {
          var old = this.getAttributeNodeNS(namespaceURI, localName);
          old && this.removeAttributeNode(old);
        },
        hasAttributeNS: function(namespaceURI, localName) {
          return this.getAttributeNodeNS(namespaceURI, localName) != null;
        },
        getAttributeNS: function(namespaceURI, localName) {
          var attr = this.getAttributeNodeNS(namespaceURI, localName);
          return attr && attr.value || "";
        },
        setAttributeNS: function(namespaceURI, qualifiedName, value) {
          var attr = this.ownerDocument.createAttributeNS(namespaceURI, qualifiedName);
          attr.value = attr.nodeValue = "" + value;
          this.setAttributeNode(attr);
        },
        getAttributeNodeNS: function(namespaceURI, localName) {
          return this.attributes.getNamedItemNS(namespaceURI, localName);
        },
        getElementsByTagName: function(tagName) {
          return new LiveNodeList(this, function(base) {
            var ls = [];
            _visitNode(base, function(node) {
              if (node !== base && node.nodeType == ELEMENT_NODE && (tagName === "*" || node.tagName == tagName)) {
                ls.push(node);
              }
            });
            return ls;
          });
        },
        getElementsByTagNameNS: function(namespaceURI, localName) {
          return new LiveNodeList(this, function(base) {
            var ls = [];
            _visitNode(base, function(node) {
              if (node !== base && node.nodeType === ELEMENT_NODE && (namespaceURI === "*" || node.namespaceURI === namespaceURI) && (localName === "*" || node.localName == localName)) {
                ls.push(node);
              }
            });
            return ls;
          });
        }
      };
      Document.prototype.getElementsByTagName = Element.prototype.getElementsByTagName;
      Document.prototype.getElementsByTagNameNS = Element.prototype.getElementsByTagNameNS;
      _extends(Element, Node);
      function Attr() {
      }
      Attr.prototype.nodeType = ATTRIBUTE_NODE;
      _extends(Attr, Node);
      function CharacterData() {
      }
      CharacterData.prototype = {
        data: "",
        substringData: function(offset, count) {
          return this.data.substring(offset, offset + count);
        },
        appendData: function(text) {
          text = this.data + text;
          this.nodeValue = this.data = text;
          this.length = text.length;
        },
        insertData: function(offset, text) {
          this.replaceData(offset, 0, text);
        },
        appendChild: function(newChild) {
          throw new Error(ExceptionMessage[HIERARCHY_REQUEST_ERR]);
        },
        deleteData: function(offset, count) {
          this.replaceData(offset, count, "");
        },
        replaceData: function(offset, count, text) {
          var start = this.data.substring(0, offset);
          var end = this.data.substring(offset + count);
          text = start + text + end;
          this.nodeValue = this.data = text;
          this.length = text.length;
        }
      };
      _extends(CharacterData, Node);
      function Text2() {
      }
      Text2.prototype = {
        nodeName: "#text",
        nodeType: TEXT_NODE,
        splitText: function(offset) {
          var text = this.data;
          var newText = text.substring(offset);
          text = text.substring(0, offset);
          this.data = this.nodeValue = text;
          this.length = text.length;
          var newNode = this.ownerDocument.createTextNode(newText);
          if (this.parentNode) {
            this.parentNode.insertBefore(newNode, this.nextSibling);
          }
          return newNode;
        }
      };
      _extends(Text2, CharacterData);
      function Comment() {
      }
      Comment.prototype = {
        nodeName: "#comment",
        nodeType: COMMENT_NODE
      };
      _extends(Comment, CharacterData);
      function CDATASection() {
      }
      CDATASection.prototype = {
        nodeName: "#cdata-section",
        nodeType: CDATA_SECTION_NODE
      };
      _extends(CDATASection, CharacterData);
      function DocumentType() {
      }
      DocumentType.prototype.nodeType = DOCUMENT_TYPE_NODE;
      _extends(DocumentType, Node);
      function Notation() {
      }
      Notation.prototype.nodeType = NOTATION_NODE;
      _extends(Notation, Node);
      function Entity() {
      }
      Entity.prototype.nodeType = ENTITY_NODE;
      _extends(Entity, Node);
      function EntityReference() {
      }
      EntityReference.prototype.nodeType = ENTITY_REFERENCE_NODE;
      _extends(EntityReference, Node);
      function DocumentFragment() {
      }
      DocumentFragment.prototype.nodeName = "#document-fragment";
      DocumentFragment.prototype.nodeType = DOCUMENT_FRAGMENT_NODE;
      _extends(DocumentFragment, Node);
      function ProcessingInstruction() {
      }
      ProcessingInstruction.prototype.nodeType = PROCESSING_INSTRUCTION_NODE;
      _extends(ProcessingInstruction, Node);
      function XMLSerializer() {
      }
      XMLSerializer.prototype.serializeToString = function(node, isHtml, nodeFilter) {
        return nodeSerializeToString.call(node, isHtml, nodeFilter);
      };
      Node.prototype.toString = nodeSerializeToString;
      function nodeSerializeToString(isHtml, nodeFilter) {
        var buf = [];
        var refNode = this.nodeType == 9 && this.documentElement || this;
        var prefix = refNode.prefix;
        var uri = refNode.namespaceURI;
        if (uri && prefix == null) {
          var prefix = refNode.lookupPrefix(uri);
          if (prefix == null) {
            var visibleNamespaces = [
              { namespace: uri, prefix: null }
              //{namespace:uri,prefix:''}
            ];
          }
        }
        serializeToString(this, buf, isHtml, nodeFilter, visibleNamespaces);
        return buf.join("");
      }
      function needNamespaceDefine(node, isHTML, visibleNamespaces) {
        var prefix = node.prefix || "";
        var uri = node.namespaceURI;
        if (!uri) {
          return false;
        }
        if (prefix === "xml" && uri === NAMESPACE.XML || uri === NAMESPACE.XMLNS) {
          return false;
        }
        var i = visibleNamespaces.length;
        while (i--) {
          var ns = visibleNamespaces[i];
          if (ns.prefix === prefix) {
            return ns.namespace !== uri;
          }
        }
        return true;
      }
      function addSerializedAttribute(buf, qualifiedName, value) {
        buf.push(" ", qualifiedName, '="', value.replace(/[<>&"\t\n\r]/g, _xmlEncoder), '"');
      }
      function serializeToString(node, buf, isHTML, nodeFilter, visibleNamespaces) {
        if (!visibleNamespaces) {
          visibleNamespaces = [];
        }
        if (nodeFilter) {
          node = nodeFilter(node);
          if (node) {
            if (typeof node == "string") {
              buf.push(node);
              return;
            }
          } else {
            return;
          }
        }
        switch (node.nodeType) {
          case ELEMENT_NODE:
            var attrs = node.attributes;
            var len = attrs.length;
            var child = node.firstChild;
            var nodeName = node.tagName;
            isHTML = NAMESPACE.isHTML(node.namespaceURI) || isHTML;
            var prefixedNodeName = nodeName;
            if (!isHTML && !node.prefix && node.namespaceURI) {
              var defaultNS;
              for (var ai = 0; ai < attrs.length; ai++) {
                if (attrs.item(ai).name === "xmlns") {
                  defaultNS = attrs.item(ai).value;
                  break;
                }
              }
              if (!defaultNS) {
                for (var nsi = visibleNamespaces.length - 1; nsi >= 0; nsi--) {
                  var namespace = visibleNamespaces[nsi];
                  if (namespace.prefix === "" && namespace.namespace === node.namespaceURI) {
                    defaultNS = namespace.namespace;
                    break;
                  }
                }
              }
              if (defaultNS !== node.namespaceURI) {
                for (var nsi = visibleNamespaces.length - 1; nsi >= 0; nsi--) {
                  var namespace = visibleNamespaces[nsi];
                  if (namespace.namespace === node.namespaceURI) {
                    if (namespace.prefix) {
                      prefixedNodeName = namespace.prefix + ":" + nodeName;
                    }
                    break;
                  }
                }
              }
            }
            buf.push("<", prefixedNodeName);
            for (var i = 0; i < len; i++) {
              var attr = attrs.item(i);
              if (attr.prefix == "xmlns") {
                visibleNamespaces.push({ prefix: attr.localName, namespace: attr.value });
              } else if (attr.nodeName == "xmlns") {
                visibleNamespaces.push({ prefix: "", namespace: attr.value });
              }
            }
            for (var i = 0; i < len; i++) {
              var attr = attrs.item(i);
              if (needNamespaceDefine(attr, isHTML, visibleNamespaces)) {
                var prefix = attr.prefix || "";
                var uri = attr.namespaceURI;
                addSerializedAttribute(buf, prefix ? "xmlns:" + prefix : "xmlns", uri);
                visibleNamespaces.push({ prefix, namespace: uri });
              }
              serializeToString(attr, buf, isHTML, nodeFilter, visibleNamespaces);
            }
            if (nodeName === prefixedNodeName && needNamespaceDefine(node, isHTML, visibleNamespaces)) {
              var prefix = node.prefix || "";
              var uri = node.namespaceURI;
              addSerializedAttribute(buf, prefix ? "xmlns:" + prefix : "xmlns", uri);
              visibleNamespaces.push({ prefix, namespace: uri });
            }
            if (child || isHTML && !/^(?:meta|link|img|br|hr|input)$/i.test(nodeName)) {
              buf.push(">");
              if (isHTML && /^script$/i.test(nodeName)) {
                while (child) {
                  if (child.data) {
                    buf.push(child.data);
                  } else {
                    serializeToString(child, buf, isHTML, nodeFilter, visibleNamespaces.slice());
                  }
                  child = child.nextSibling;
                }
              } else {
                while (child) {
                  serializeToString(child, buf, isHTML, nodeFilter, visibleNamespaces.slice());
                  child = child.nextSibling;
                }
              }
              buf.push("</", prefixedNodeName, ">");
            } else {
              buf.push("/>");
            }
            return;
          case DOCUMENT_NODE:
          case DOCUMENT_FRAGMENT_NODE:
            var child = node.firstChild;
            while (child) {
              serializeToString(child, buf, isHTML, nodeFilter, visibleNamespaces.slice());
              child = child.nextSibling;
            }
            return;
          case ATTRIBUTE_NODE:
            return addSerializedAttribute(buf, node.name, node.value);
          case TEXT_NODE:
            return buf.push(
              node.data.replace(/[<&>]/g, _xmlEncoder)
            );
          case CDATA_SECTION_NODE:
            return buf.push("<![CDATA[", node.data, "]]>");
          case COMMENT_NODE:
            return buf.push("<!--", node.data, "-->");
          case DOCUMENT_TYPE_NODE:
            var pubid = node.publicId;
            var sysid = node.systemId;
            buf.push("<!DOCTYPE ", node.name);
            if (pubid) {
              buf.push(" PUBLIC ", pubid);
              if (sysid && sysid != ".") {
                buf.push(" ", sysid);
              }
              buf.push(">");
            } else if (sysid && sysid != ".") {
              buf.push(" SYSTEM ", sysid, ">");
            } else {
              var sub = node.internalSubset;
              if (sub) {
                buf.push(" [", sub, "]");
              }
              buf.push(">");
            }
            return;
          case PROCESSING_INSTRUCTION_NODE:
            return buf.push("<?", node.target, " ", node.data, "?>");
          case ENTITY_REFERENCE_NODE:
            return buf.push("&", node.nodeName, ";");
          //case ENTITY_NODE:
          //case NOTATION_NODE:
          default:
            buf.push("??", node.nodeName);
        }
      }
      function importNode(doc, node, deep) {
        var node2;
        switch (node.nodeType) {
          case ELEMENT_NODE:
            node2 = node.cloneNode(false);
            node2.ownerDocument = doc;
          //var attrs = node2.attributes;
          //var len = attrs.length;
          //for(var i=0;i<len;i++){
          //node2.setAttributeNodeNS(importNode(doc,attrs.item(i),deep));
          //}
          case DOCUMENT_FRAGMENT_NODE:
            break;
          case ATTRIBUTE_NODE:
            deep = true;
            break;
        }
        if (!node2) {
          node2 = node.cloneNode(false);
        }
        node2.ownerDocument = doc;
        node2.parentNode = null;
        if (deep) {
          var child = node.firstChild;
          while (child) {
            node2.appendChild(importNode(doc, child, deep));
            child = child.nextSibling;
          }
        }
        return node2;
      }
      function cloneNode(doc, node, deep) {
        var node2 = new node.constructor();
        for (var n in node) {
          if (Object.prototype.hasOwnProperty.call(node, n)) {
            var v = node[n];
            if (typeof v != "object") {
              if (v != node2[n]) {
                node2[n] = v;
              }
            }
          }
        }
        if (node.childNodes) {
          node2.childNodes = new NodeList();
        }
        node2.ownerDocument = doc;
        switch (node2.nodeType) {
          case ELEMENT_NODE:
            var attrs = node.attributes;
            var attrs2 = node2.attributes = new NamedNodeMap();
            var len = attrs.length;
            attrs2._ownerElement = node2;
            for (var i = 0; i < len; i++) {
              node2.setAttributeNode(cloneNode(doc, attrs.item(i), true));
            }
            break;
            ;
          case ATTRIBUTE_NODE:
            deep = true;
        }
        if (deep) {
          var child = node.firstChild;
          while (child) {
            node2.appendChild(cloneNode(doc, child, deep));
            child = child.nextSibling;
          }
        }
        return node2;
      }
      function __set__(object, key, value) {
        object[key] = value;
      }
      try {
        if (Object.defineProperty) {
          let getTextContent2 = function(node) {
            switch (node.nodeType) {
              case ELEMENT_NODE:
              case DOCUMENT_FRAGMENT_NODE:
                var buf = [];
                node = node.firstChild;
                while (node) {
                  if (node.nodeType !== 7 && node.nodeType !== 8) {
                    buf.push(getTextContent2(node));
                  }
                  node = node.nextSibling;
                }
                return buf.join("");
              default:
                return node.nodeValue;
            }
          };
          getTextContent = getTextContent2;
          Object.defineProperty(LiveNodeList.prototype, "length", {
            get: function() {
              _updateLiveList(this);
              return this.$$length;
            }
          });
          Object.defineProperty(Node.prototype, "textContent", {
            get: function() {
              return getTextContent2(this);
            },
            set: function(data) {
              switch (this.nodeType) {
                case ELEMENT_NODE:
                case DOCUMENT_FRAGMENT_NODE:
                  while (this.firstChild) {
                    this.removeChild(this.firstChild);
                  }
                  if (data || String(data)) {
                    this.appendChild(this.ownerDocument.createTextNode(data));
                  }
                  break;
                default:
                  this.data = data;
                  this.value = data;
                  this.nodeValue = data;
              }
            }
          });
          __set__ = function(object, key, value) {
            object["$$" + key] = value;
          };
        }
      } catch (e) {
      }
      var getTextContent;
      exports.DocumentType = DocumentType;
      exports.DOMException = DOMException;
      exports.DOMImplementation = DOMImplementation;
      exports.Element = Element;
      exports.Node = Node;
      exports.NodeList = NodeList;
      exports.XMLSerializer = XMLSerializer;
    }
  });

  // node_modules/@xmldom/xmldom/lib/entities.js
  var require_entities = __commonJS({
    "node_modules/@xmldom/xmldom/lib/entities.js"(exports) {
      "use strict";
      var freeze = require_conventions().freeze;
      exports.XML_ENTITIES = freeze({
        amp: "&",
        apos: "'",
        gt: ">",
        lt: "<",
        quot: '"'
      });
      exports.HTML_ENTITIES = freeze({
        Aacute: "\xC1",
        aacute: "\xE1",
        Abreve: "\u0102",
        abreve: "\u0103",
        ac: "\u223E",
        acd: "\u223F",
        acE: "\u223E\u0333",
        Acirc: "\xC2",
        acirc: "\xE2",
        acute: "\xB4",
        Acy: "\u0410",
        acy: "\u0430",
        AElig: "\xC6",
        aelig: "\xE6",
        af: "\u2061",
        Afr: "\u{1D504}",
        afr: "\u{1D51E}",
        Agrave: "\xC0",
        agrave: "\xE0",
        alefsym: "\u2135",
        aleph: "\u2135",
        Alpha: "\u0391",
        alpha: "\u03B1",
        Amacr: "\u0100",
        amacr: "\u0101",
        amalg: "\u2A3F",
        AMP: "&",
        amp: "&",
        And: "\u2A53",
        and: "\u2227",
        andand: "\u2A55",
        andd: "\u2A5C",
        andslope: "\u2A58",
        andv: "\u2A5A",
        ang: "\u2220",
        ange: "\u29A4",
        angle: "\u2220",
        angmsd: "\u2221",
        angmsdaa: "\u29A8",
        angmsdab: "\u29A9",
        angmsdac: "\u29AA",
        angmsdad: "\u29AB",
        angmsdae: "\u29AC",
        angmsdaf: "\u29AD",
        angmsdag: "\u29AE",
        angmsdah: "\u29AF",
        angrt: "\u221F",
        angrtvb: "\u22BE",
        angrtvbd: "\u299D",
        angsph: "\u2222",
        angst: "\xC5",
        angzarr: "\u237C",
        Aogon: "\u0104",
        aogon: "\u0105",
        Aopf: "\u{1D538}",
        aopf: "\u{1D552}",
        ap: "\u2248",
        apacir: "\u2A6F",
        apE: "\u2A70",
        ape: "\u224A",
        apid: "\u224B",
        apos: "'",
        ApplyFunction: "\u2061",
        approx: "\u2248",
        approxeq: "\u224A",
        Aring: "\xC5",
        aring: "\xE5",
        Ascr: "\u{1D49C}",
        ascr: "\u{1D4B6}",
        Assign: "\u2254",
        ast: "*",
        asymp: "\u2248",
        asympeq: "\u224D",
        Atilde: "\xC3",
        atilde: "\xE3",
        Auml: "\xC4",
        auml: "\xE4",
        awconint: "\u2233",
        awint: "\u2A11",
        backcong: "\u224C",
        backepsilon: "\u03F6",
        backprime: "\u2035",
        backsim: "\u223D",
        backsimeq: "\u22CD",
        Backslash: "\u2216",
        Barv: "\u2AE7",
        barvee: "\u22BD",
        Barwed: "\u2306",
        barwed: "\u2305",
        barwedge: "\u2305",
        bbrk: "\u23B5",
        bbrktbrk: "\u23B6",
        bcong: "\u224C",
        Bcy: "\u0411",
        bcy: "\u0431",
        bdquo: "\u201E",
        becaus: "\u2235",
        Because: "\u2235",
        because: "\u2235",
        bemptyv: "\u29B0",
        bepsi: "\u03F6",
        bernou: "\u212C",
        Bernoullis: "\u212C",
        Beta: "\u0392",
        beta: "\u03B2",
        beth: "\u2136",
        between: "\u226C",
        Bfr: "\u{1D505}",
        bfr: "\u{1D51F}",
        bigcap: "\u22C2",
        bigcirc: "\u25EF",
        bigcup: "\u22C3",
        bigodot: "\u2A00",
        bigoplus: "\u2A01",
        bigotimes: "\u2A02",
        bigsqcup: "\u2A06",
        bigstar: "\u2605",
        bigtriangledown: "\u25BD",
        bigtriangleup: "\u25B3",
        biguplus: "\u2A04",
        bigvee: "\u22C1",
        bigwedge: "\u22C0",
        bkarow: "\u290D",
        blacklozenge: "\u29EB",
        blacksquare: "\u25AA",
        blacktriangle: "\u25B4",
        blacktriangledown: "\u25BE",
        blacktriangleleft: "\u25C2",
        blacktriangleright: "\u25B8",
        blank: "\u2423",
        blk12: "\u2592",
        blk14: "\u2591",
        blk34: "\u2593",
        block: "\u2588",
        bne: "=\u20E5",
        bnequiv: "\u2261\u20E5",
        bNot: "\u2AED",
        bnot: "\u2310",
        Bopf: "\u{1D539}",
        bopf: "\u{1D553}",
        bot: "\u22A5",
        bottom: "\u22A5",
        bowtie: "\u22C8",
        boxbox: "\u29C9",
        boxDL: "\u2557",
        boxDl: "\u2556",
        boxdL: "\u2555",
        boxdl: "\u2510",
        boxDR: "\u2554",
        boxDr: "\u2553",
        boxdR: "\u2552",
        boxdr: "\u250C",
        boxH: "\u2550",
        boxh: "\u2500",
        boxHD: "\u2566",
        boxHd: "\u2564",
        boxhD: "\u2565",
        boxhd: "\u252C",
        boxHU: "\u2569",
        boxHu: "\u2567",
        boxhU: "\u2568",
        boxhu: "\u2534",
        boxminus: "\u229F",
        boxplus: "\u229E",
        boxtimes: "\u22A0",
        boxUL: "\u255D",
        boxUl: "\u255C",
        boxuL: "\u255B",
        boxul: "\u2518",
        boxUR: "\u255A",
        boxUr: "\u2559",
        boxuR: "\u2558",
        boxur: "\u2514",
        boxV: "\u2551",
        boxv: "\u2502",
        boxVH: "\u256C",
        boxVh: "\u256B",
        boxvH: "\u256A",
        boxvh: "\u253C",
        boxVL: "\u2563",
        boxVl: "\u2562",
        boxvL: "\u2561",
        boxvl: "\u2524",
        boxVR: "\u2560",
        boxVr: "\u255F",
        boxvR: "\u255E",
        boxvr: "\u251C",
        bprime: "\u2035",
        Breve: "\u02D8",
        breve: "\u02D8",
        brvbar: "\xA6",
        Bscr: "\u212C",
        bscr: "\u{1D4B7}",
        bsemi: "\u204F",
        bsim: "\u223D",
        bsime: "\u22CD",
        bsol: "\\",
        bsolb: "\u29C5",
        bsolhsub: "\u27C8",
        bull: "\u2022",
        bullet: "\u2022",
        bump: "\u224E",
        bumpE: "\u2AAE",
        bumpe: "\u224F",
        Bumpeq: "\u224E",
        bumpeq: "\u224F",
        Cacute: "\u0106",
        cacute: "\u0107",
        Cap: "\u22D2",
        cap: "\u2229",
        capand: "\u2A44",
        capbrcup: "\u2A49",
        capcap: "\u2A4B",
        capcup: "\u2A47",
        capdot: "\u2A40",
        CapitalDifferentialD: "\u2145",
        caps: "\u2229\uFE00",
        caret: "\u2041",
        caron: "\u02C7",
        Cayleys: "\u212D",
        ccaps: "\u2A4D",
        Ccaron: "\u010C",
        ccaron: "\u010D",
        Ccedil: "\xC7",
        ccedil: "\xE7",
        Ccirc: "\u0108",
        ccirc: "\u0109",
        Cconint: "\u2230",
        ccups: "\u2A4C",
        ccupssm: "\u2A50",
        Cdot: "\u010A",
        cdot: "\u010B",
        cedil: "\xB8",
        Cedilla: "\xB8",
        cemptyv: "\u29B2",
        cent: "\xA2",
        CenterDot: "\xB7",
        centerdot: "\xB7",
        Cfr: "\u212D",
        cfr: "\u{1D520}",
        CHcy: "\u0427",
        chcy: "\u0447",
        check: "\u2713",
        checkmark: "\u2713",
        Chi: "\u03A7",
        chi: "\u03C7",
        cir: "\u25CB",
        circ: "\u02C6",
        circeq: "\u2257",
        circlearrowleft: "\u21BA",
        circlearrowright: "\u21BB",
        circledast: "\u229B",
        circledcirc: "\u229A",
        circleddash: "\u229D",
        CircleDot: "\u2299",
        circledR: "\xAE",
        circledS: "\u24C8",
        CircleMinus: "\u2296",
        CirclePlus: "\u2295",
        CircleTimes: "\u2297",
        cirE: "\u29C3",
        cire: "\u2257",
        cirfnint: "\u2A10",
        cirmid: "\u2AEF",
        cirscir: "\u29C2",
        ClockwiseContourIntegral: "\u2232",
        CloseCurlyDoubleQuote: "\u201D",
        CloseCurlyQuote: "\u2019",
        clubs: "\u2663",
        clubsuit: "\u2663",
        Colon: "\u2237",
        colon: ":",
        Colone: "\u2A74",
        colone: "\u2254",
        coloneq: "\u2254",
        comma: ",",
        commat: "@",
        comp: "\u2201",
        compfn: "\u2218",
        complement: "\u2201",
        complexes: "\u2102",
        cong: "\u2245",
        congdot: "\u2A6D",
        Congruent: "\u2261",
        Conint: "\u222F",
        conint: "\u222E",
        ContourIntegral: "\u222E",
        Copf: "\u2102",
        copf: "\u{1D554}",
        coprod: "\u2210",
        Coproduct: "\u2210",
        COPY: "\xA9",
        copy: "\xA9",
        copysr: "\u2117",
        CounterClockwiseContourIntegral: "\u2233",
        crarr: "\u21B5",
        Cross: "\u2A2F",
        cross: "\u2717",
        Cscr: "\u{1D49E}",
        cscr: "\u{1D4B8}",
        csub: "\u2ACF",
        csube: "\u2AD1",
        csup: "\u2AD0",
        csupe: "\u2AD2",
        ctdot: "\u22EF",
        cudarrl: "\u2938",
        cudarrr: "\u2935",
        cuepr: "\u22DE",
        cuesc: "\u22DF",
        cularr: "\u21B6",
        cularrp: "\u293D",
        Cup: "\u22D3",
        cup: "\u222A",
        cupbrcap: "\u2A48",
        CupCap: "\u224D",
        cupcap: "\u2A46",
        cupcup: "\u2A4A",
        cupdot: "\u228D",
        cupor: "\u2A45",
        cups: "\u222A\uFE00",
        curarr: "\u21B7",
        curarrm: "\u293C",
        curlyeqprec: "\u22DE",
        curlyeqsucc: "\u22DF",
        curlyvee: "\u22CE",
        curlywedge: "\u22CF",
        curren: "\xA4",
        curvearrowleft: "\u21B6",
        curvearrowright: "\u21B7",
        cuvee: "\u22CE",
        cuwed: "\u22CF",
        cwconint: "\u2232",
        cwint: "\u2231",
        cylcty: "\u232D",
        Dagger: "\u2021",
        dagger: "\u2020",
        daleth: "\u2138",
        Darr: "\u21A1",
        dArr: "\u21D3",
        darr: "\u2193",
        dash: "\u2010",
        Dashv: "\u2AE4",
        dashv: "\u22A3",
        dbkarow: "\u290F",
        dblac: "\u02DD",
        Dcaron: "\u010E",
        dcaron: "\u010F",
        Dcy: "\u0414",
        dcy: "\u0434",
        DD: "\u2145",
        dd: "\u2146",
        ddagger: "\u2021",
        ddarr: "\u21CA",
        DDotrahd: "\u2911",
        ddotseq: "\u2A77",
        deg: "\xB0",
        Del: "\u2207",
        Delta: "\u0394",
        delta: "\u03B4",
        demptyv: "\u29B1",
        dfisht: "\u297F",
        Dfr: "\u{1D507}",
        dfr: "\u{1D521}",
        dHar: "\u2965",
        dharl: "\u21C3",
        dharr: "\u21C2",
        DiacriticalAcute: "\xB4",
        DiacriticalDot: "\u02D9",
        DiacriticalDoubleAcute: "\u02DD",
        DiacriticalGrave: "`",
        DiacriticalTilde: "\u02DC",
        diam: "\u22C4",
        Diamond: "\u22C4",
        diamond: "\u22C4",
        diamondsuit: "\u2666",
        diams: "\u2666",
        die: "\xA8",
        DifferentialD: "\u2146",
        digamma: "\u03DD",
        disin: "\u22F2",
        div: "\xF7",
        divide: "\xF7",
        divideontimes: "\u22C7",
        divonx: "\u22C7",
        DJcy: "\u0402",
        djcy: "\u0452",
        dlcorn: "\u231E",
        dlcrop: "\u230D",
        dollar: "$",
        Dopf: "\u{1D53B}",
        dopf: "\u{1D555}",
        Dot: "\xA8",
        dot: "\u02D9",
        DotDot: "\u20DC",
        doteq: "\u2250",
        doteqdot: "\u2251",
        DotEqual: "\u2250",
        dotminus: "\u2238",
        dotplus: "\u2214",
        dotsquare: "\u22A1",
        doublebarwedge: "\u2306",
        DoubleContourIntegral: "\u222F",
        DoubleDot: "\xA8",
        DoubleDownArrow: "\u21D3",
        DoubleLeftArrow: "\u21D0",
        DoubleLeftRightArrow: "\u21D4",
        DoubleLeftTee: "\u2AE4",
        DoubleLongLeftArrow: "\u27F8",
        DoubleLongLeftRightArrow: "\u27FA",
        DoubleLongRightArrow: "\u27F9",
        DoubleRightArrow: "\u21D2",
        DoubleRightTee: "\u22A8",
        DoubleUpArrow: "\u21D1",
        DoubleUpDownArrow: "\u21D5",
        DoubleVerticalBar: "\u2225",
        DownArrow: "\u2193",
        Downarrow: "\u21D3",
        downarrow: "\u2193",
        DownArrowBar: "\u2913",
        DownArrowUpArrow: "\u21F5",
        DownBreve: "\u0311",
        downdownarrows: "\u21CA",
        downharpoonleft: "\u21C3",
        downharpoonright: "\u21C2",
        DownLeftRightVector: "\u2950",
        DownLeftTeeVector: "\u295E",
        DownLeftVector: "\u21BD",
        DownLeftVectorBar: "\u2956",
        DownRightTeeVector: "\u295F",
        DownRightVector: "\u21C1",
        DownRightVectorBar: "\u2957",
        DownTee: "\u22A4",
        DownTeeArrow: "\u21A7",
        drbkarow: "\u2910",
        drcorn: "\u231F",
        drcrop: "\u230C",
        Dscr: "\u{1D49F}",
        dscr: "\u{1D4B9}",
        DScy: "\u0405",
        dscy: "\u0455",
        dsol: "\u29F6",
        Dstrok: "\u0110",
        dstrok: "\u0111",
        dtdot: "\u22F1",
        dtri: "\u25BF",
        dtrif: "\u25BE",
        duarr: "\u21F5",
        duhar: "\u296F",
        dwangle: "\u29A6",
        DZcy: "\u040F",
        dzcy: "\u045F",
        dzigrarr: "\u27FF",
        Eacute: "\xC9",
        eacute: "\xE9",
        easter: "\u2A6E",
        Ecaron: "\u011A",
        ecaron: "\u011B",
        ecir: "\u2256",
        Ecirc: "\xCA",
        ecirc: "\xEA",
        ecolon: "\u2255",
        Ecy: "\u042D",
        ecy: "\u044D",
        eDDot: "\u2A77",
        Edot: "\u0116",
        eDot: "\u2251",
        edot: "\u0117",
        ee: "\u2147",
        efDot: "\u2252",
        Efr: "\u{1D508}",
        efr: "\u{1D522}",
        eg: "\u2A9A",
        Egrave: "\xC8",
        egrave: "\xE8",
        egs: "\u2A96",
        egsdot: "\u2A98",
        el: "\u2A99",
        Element: "\u2208",
        elinters: "\u23E7",
        ell: "\u2113",
        els: "\u2A95",
        elsdot: "\u2A97",
        Emacr: "\u0112",
        emacr: "\u0113",
        empty: "\u2205",
        emptyset: "\u2205",
        EmptySmallSquare: "\u25FB",
        emptyv: "\u2205",
        EmptyVerySmallSquare: "\u25AB",
        emsp: "\u2003",
        emsp13: "\u2004",
        emsp14: "\u2005",
        ENG: "\u014A",
        eng: "\u014B",
        ensp: "\u2002",
        Eogon: "\u0118",
        eogon: "\u0119",
        Eopf: "\u{1D53C}",
        eopf: "\u{1D556}",
        epar: "\u22D5",
        eparsl: "\u29E3",
        eplus: "\u2A71",
        epsi: "\u03B5",
        Epsilon: "\u0395",
        epsilon: "\u03B5",
        epsiv: "\u03F5",
        eqcirc: "\u2256",
        eqcolon: "\u2255",
        eqsim: "\u2242",
        eqslantgtr: "\u2A96",
        eqslantless: "\u2A95",
        Equal: "\u2A75",
        equals: "=",
        EqualTilde: "\u2242",
        equest: "\u225F",
        Equilibrium: "\u21CC",
        equiv: "\u2261",
        equivDD: "\u2A78",
        eqvparsl: "\u29E5",
        erarr: "\u2971",
        erDot: "\u2253",
        Escr: "\u2130",
        escr: "\u212F",
        esdot: "\u2250",
        Esim: "\u2A73",
        esim: "\u2242",
        Eta: "\u0397",
        eta: "\u03B7",
        ETH: "\xD0",
        eth: "\xF0",
        Euml: "\xCB",
        euml: "\xEB",
        euro: "\u20AC",
        excl: "!",
        exist: "\u2203",
        Exists: "\u2203",
        expectation: "\u2130",
        ExponentialE: "\u2147",
        exponentiale: "\u2147",
        fallingdotseq: "\u2252",
        Fcy: "\u0424",
        fcy: "\u0444",
        female: "\u2640",
        ffilig: "\uFB03",
        fflig: "\uFB00",
        ffllig: "\uFB04",
        Ffr: "\u{1D509}",
        ffr: "\u{1D523}",
        filig: "\uFB01",
        FilledSmallSquare: "\u25FC",
        FilledVerySmallSquare: "\u25AA",
        fjlig: "fj",
        flat: "\u266D",
        fllig: "\uFB02",
        fltns: "\u25B1",
        fnof: "\u0192",
        Fopf: "\u{1D53D}",
        fopf: "\u{1D557}",
        ForAll: "\u2200",
        forall: "\u2200",
        fork: "\u22D4",
        forkv: "\u2AD9",
        Fouriertrf: "\u2131",
        fpartint: "\u2A0D",
        frac12: "\xBD",
        frac13: "\u2153",
        frac14: "\xBC",
        frac15: "\u2155",
        frac16: "\u2159",
        frac18: "\u215B",
        frac23: "\u2154",
        frac25: "\u2156",
        frac34: "\xBE",
        frac35: "\u2157",
        frac38: "\u215C",
        frac45: "\u2158",
        frac56: "\u215A",
        frac58: "\u215D",
        frac78: "\u215E",
        frasl: "\u2044",
        frown: "\u2322",
        Fscr: "\u2131",
        fscr: "\u{1D4BB}",
        gacute: "\u01F5",
        Gamma: "\u0393",
        gamma: "\u03B3",
        Gammad: "\u03DC",
        gammad: "\u03DD",
        gap: "\u2A86",
        Gbreve: "\u011E",
        gbreve: "\u011F",
        Gcedil: "\u0122",
        Gcirc: "\u011C",
        gcirc: "\u011D",
        Gcy: "\u0413",
        gcy: "\u0433",
        Gdot: "\u0120",
        gdot: "\u0121",
        gE: "\u2267",
        ge: "\u2265",
        gEl: "\u2A8C",
        gel: "\u22DB",
        geq: "\u2265",
        geqq: "\u2267",
        geqslant: "\u2A7E",
        ges: "\u2A7E",
        gescc: "\u2AA9",
        gesdot: "\u2A80",
        gesdoto: "\u2A82",
        gesdotol: "\u2A84",
        gesl: "\u22DB\uFE00",
        gesles: "\u2A94",
        Gfr: "\u{1D50A}",
        gfr: "\u{1D524}",
        Gg: "\u22D9",
        gg: "\u226B",
        ggg: "\u22D9",
        gimel: "\u2137",
        GJcy: "\u0403",
        gjcy: "\u0453",
        gl: "\u2277",
        gla: "\u2AA5",
        glE: "\u2A92",
        glj: "\u2AA4",
        gnap: "\u2A8A",
        gnapprox: "\u2A8A",
        gnE: "\u2269",
        gne: "\u2A88",
        gneq: "\u2A88",
        gneqq: "\u2269",
        gnsim: "\u22E7",
        Gopf: "\u{1D53E}",
        gopf: "\u{1D558}",
        grave: "`",
        GreaterEqual: "\u2265",
        GreaterEqualLess: "\u22DB",
        GreaterFullEqual: "\u2267",
        GreaterGreater: "\u2AA2",
        GreaterLess: "\u2277",
        GreaterSlantEqual: "\u2A7E",
        GreaterTilde: "\u2273",
        Gscr: "\u{1D4A2}",
        gscr: "\u210A",
        gsim: "\u2273",
        gsime: "\u2A8E",
        gsiml: "\u2A90",
        Gt: "\u226B",
        GT: ">",
        gt: ">",
        gtcc: "\u2AA7",
        gtcir: "\u2A7A",
        gtdot: "\u22D7",
        gtlPar: "\u2995",
        gtquest: "\u2A7C",
        gtrapprox: "\u2A86",
        gtrarr: "\u2978",
        gtrdot: "\u22D7",
        gtreqless: "\u22DB",
        gtreqqless: "\u2A8C",
        gtrless: "\u2277",
        gtrsim: "\u2273",
        gvertneqq: "\u2269\uFE00",
        gvnE: "\u2269\uFE00",
        Hacek: "\u02C7",
        hairsp: "\u200A",
        half: "\xBD",
        hamilt: "\u210B",
        HARDcy: "\u042A",
        hardcy: "\u044A",
        hArr: "\u21D4",
        harr: "\u2194",
        harrcir: "\u2948",
        harrw: "\u21AD",
        Hat: "^",
        hbar: "\u210F",
        Hcirc: "\u0124",
        hcirc: "\u0125",
        hearts: "\u2665",
        heartsuit: "\u2665",
        hellip: "\u2026",
        hercon: "\u22B9",
        Hfr: "\u210C",
        hfr: "\u{1D525}",
        HilbertSpace: "\u210B",
        hksearow: "\u2925",
        hkswarow: "\u2926",
        hoarr: "\u21FF",
        homtht: "\u223B",
        hookleftarrow: "\u21A9",
        hookrightarrow: "\u21AA",
        Hopf: "\u210D",
        hopf: "\u{1D559}",
        horbar: "\u2015",
        HorizontalLine: "\u2500",
        Hscr: "\u210B",
        hscr: "\u{1D4BD}",
        hslash: "\u210F",
        Hstrok: "\u0126",
        hstrok: "\u0127",
        HumpDownHump: "\u224E",
        HumpEqual: "\u224F",
        hybull: "\u2043",
        hyphen: "\u2010",
        Iacute: "\xCD",
        iacute: "\xED",
        ic: "\u2063",
        Icirc: "\xCE",
        icirc: "\xEE",
        Icy: "\u0418",
        icy: "\u0438",
        Idot: "\u0130",
        IEcy: "\u0415",
        iecy: "\u0435",
        iexcl: "\xA1",
        iff: "\u21D4",
        Ifr: "\u2111",
        ifr: "\u{1D526}",
        Igrave: "\xCC",
        igrave: "\xEC",
        ii: "\u2148",
        iiiint: "\u2A0C",
        iiint: "\u222D",
        iinfin: "\u29DC",
        iiota: "\u2129",
        IJlig: "\u0132",
        ijlig: "\u0133",
        Im: "\u2111",
        Imacr: "\u012A",
        imacr: "\u012B",
        image: "\u2111",
        ImaginaryI: "\u2148",
        imagline: "\u2110",
        imagpart: "\u2111",
        imath: "\u0131",
        imof: "\u22B7",
        imped: "\u01B5",
        Implies: "\u21D2",
        in: "\u2208",
        incare: "\u2105",
        infin: "\u221E",
        infintie: "\u29DD",
        inodot: "\u0131",
        Int: "\u222C",
        int: "\u222B",
        intcal: "\u22BA",
        integers: "\u2124",
        Integral: "\u222B",
        intercal: "\u22BA",
        Intersection: "\u22C2",
        intlarhk: "\u2A17",
        intprod: "\u2A3C",
        InvisibleComma: "\u2063",
        InvisibleTimes: "\u2062",
        IOcy: "\u0401",
        iocy: "\u0451",
        Iogon: "\u012E",
        iogon: "\u012F",
        Iopf: "\u{1D540}",
        iopf: "\u{1D55A}",
        Iota: "\u0399",
        iota: "\u03B9",
        iprod: "\u2A3C",
        iquest: "\xBF",
        Iscr: "\u2110",
        iscr: "\u{1D4BE}",
        isin: "\u2208",
        isindot: "\u22F5",
        isinE: "\u22F9",
        isins: "\u22F4",
        isinsv: "\u22F3",
        isinv: "\u2208",
        it: "\u2062",
        Itilde: "\u0128",
        itilde: "\u0129",
        Iukcy: "\u0406",
        iukcy: "\u0456",
        Iuml: "\xCF",
        iuml: "\xEF",
        Jcirc: "\u0134",
        jcirc: "\u0135",
        Jcy: "\u0419",
        jcy: "\u0439",
        Jfr: "\u{1D50D}",
        jfr: "\u{1D527}",
        jmath: "\u0237",
        Jopf: "\u{1D541}",
        jopf: "\u{1D55B}",
        Jscr: "\u{1D4A5}",
        jscr: "\u{1D4BF}",
        Jsercy: "\u0408",
        jsercy: "\u0458",
        Jukcy: "\u0404",
        jukcy: "\u0454",
        Kappa: "\u039A",
        kappa: "\u03BA",
        kappav: "\u03F0",
        Kcedil: "\u0136",
        kcedil: "\u0137",
        Kcy: "\u041A",
        kcy: "\u043A",
        Kfr: "\u{1D50E}",
        kfr: "\u{1D528}",
        kgreen: "\u0138",
        KHcy: "\u0425",
        khcy: "\u0445",
        KJcy: "\u040C",
        kjcy: "\u045C",
        Kopf: "\u{1D542}",
        kopf: "\u{1D55C}",
        Kscr: "\u{1D4A6}",
        kscr: "\u{1D4C0}",
        lAarr: "\u21DA",
        Lacute: "\u0139",
        lacute: "\u013A",
        laemptyv: "\u29B4",
        lagran: "\u2112",
        Lambda: "\u039B",
        lambda: "\u03BB",
        Lang: "\u27EA",
        lang: "\u27E8",
        langd: "\u2991",
        langle: "\u27E8",
        lap: "\u2A85",
        Laplacetrf: "\u2112",
        laquo: "\xAB",
        Larr: "\u219E",
        lArr: "\u21D0",
        larr: "\u2190",
        larrb: "\u21E4",
        larrbfs: "\u291F",
        larrfs: "\u291D",
        larrhk: "\u21A9",
        larrlp: "\u21AB",
        larrpl: "\u2939",
        larrsim: "\u2973",
        larrtl: "\u21A2",
        lat: "\u2AAB",
        lAtail: "\u291B",
        latail: "\u2919",
        late: "\u2AAD",
        lates: "\u2AAD\uFE00",
        lBarr: "\u290E",
        lbarr: "\u290C",
        lbbrk: "\u2772",
        lbrace: "{",
        lbrack: "[",
        lbrke: "\u298B",
        lbrksld: "\u298F",
        lbrkslu: "\u298D",
        Lcaron: "\u013D",
        lcaron: "\u013E",
        Lcedil: "\u013B",
        lcedil: "\u013C",
        lceil: "\u2308",
        lcub: "{",
        Lcy: "\u041B",
        lcy: "\u043B",
        ldca: "\u2936",
        ldquo: "\u201C",
        ldquor: "\u201E",
        ldrdhar: "\u2967",
        ldrushar: "\u294B",
        ldsh: "\u21B2",
        lE: "\u2266",
        le: "\u2264",
        LeftAngleBracket: "\u27E8",
        LeftArrow: "\u2190",
        Leftarrow: "\u21D0",
        leftarrow: "\u2190",
        LeftArrowBar: "\u21E4",
        LeftArrowRightArrow: "\u21C6",
        leftarrowtail: "\u21A2",
        LeftCeiling: "\u2308",
        LeftDoubleBracket: "\u27E6",
        LeftDownTeeVector: "\u2961",
        LeftDownVector: "\u21C3",
        LeftDownVectorBar: "\u2959",
        LeftFloor: "\u230A",
        leftharpoondown: "\u21BD",
        leftharpoonup: "\u21BC",
        leftleftarrows: "\u21C7",
        LeftRightArrow: "\u2194",
        Leftrightarrow: "\u21D4",
        leftrightarrow: "\u2194",
        leftrightarrows: "\u21C6",
        leftrightharpoons: "\u21CB",
        leftrightsquigarrow: "\u21AD",
        LeftRightVector: "\u294E",
        LeftTee: "\u22A3",
        LeftTeeArrow: "\u21A4",
        LeftTeeVector: "\u295A",
        leftthreetimes: "\u22CB",
        LeftTriangle: "\u22B2",
        LeftTriangleBar: "\u29CF",
        LeftTriangleEqual: "\u22B4",
        LeftUpDownVector: "\u2951",
        LeftUpTeeVector: "\u2960",
        LeftUpVector: "\u21BF",
        LeftUpVectorBar: "\u2958",
        LeftVector: "\u21BC",
        LeftVectorBar: "\u2952",
        lEg: "\u2A8B",
        leg: "\u22DA",
        leq: "\u2264",
        leqq: "\u2266",
        leqslant: "\u2A7D",
        les: "\u2A7D",
        lescc: "\u2AA8",
        lesdot: "\u2A7F",
        lesdoto: "\u2A81",
        lesdotor: "\u2A83",
        lesg: "\u22DA\uFE00",
        lesges: "\u2A93",
        lessapprox: "\u2A85",
        lessdot: "\u22D6",
        lesseqgtr: "\u22DA",
        lesseqqgtr: "\u2A8B",
        LessEqualGreater: "\u22DA",
        LessFullEqual: "\u2266",
        LessGreater: "\u2276",
        lessgtr: "\u2276",
        LessLess: "\u2AA1",
        lesssim: "\u2272",
        LessSlantEqual: "\u2A7D",
        LessTilde: "\u2272",
        lfisht: "\u297C",
        lfloor: "\u230A",
        Lfr: "\u{1D50F}",
        lfr: "\u{1D529}",
        lg: "\u2276",
        lgE: "\u2A91",
        lHar: "\u2962",
        lhard: "\u21BD",
        lharu: "\u21BC",
        lharul: "\u296A",
        lhblk: "\u2584",
        LJcy: "\u0409",
        ljcy: "\u0459",
        Ll: "\u22D8",
        ll: "\u226A",
        llarr: "\u21C7",
        llcorner: "\u231E",
        Lleftarrow: "\u21DA",
        llhard: "\u296B",
        lltri: "\u25FA",
        Lmidot: "\u013F",
        lmidot: "\u0140",
        lmoust: "\u23B0",
        lmoustache: "\u23B0",
        lnap: "\u2A89",
        lnapprox: "\u2A89",
        lnE: "\u2268",
        lne: "\u2A87",
        lneq: "\u2A87",
        lneqq: "\u2268",
        lnsim: "\u22E6",
        loang: "\u27EC",
        loarr: "\u21FD",
        lobrk: "\u27E6",
        LongLeftArrow: "\u27F5",
        Longleftarrow: "\u27F8",
        longleftarrow: "\u27F5",
        LongLeftRightArrow: "\u27F7",
        Longleftrightarrow: "\u27FA",
        longleftrightarrow: "\u27F7",
        longmapsto: "\u27FC",
        LongRightArrow: "\u27F6",
        Longrightarrow: "\u27F9",
        longrightarrow: "\u27F6",
        looparrowleft: "\u21AB",
        looparrowright: "\u21AC",
        lopar: "\u2985",
        Lopf: "\u{1D543}",
        lopf: "\u{1D55D}",
        loplus: "\u2A2D",
        lotimes: "\u2A34",
        lowast: "\u2217",
        lowbar: "_",
        LowerLeftArrow: "\u2199",
        LowerRightArrow: "\u2198",
        loz: "\u25CA",
        lozenge: "\u25CA",
        lozf: "\u29EB",
        lpar: "(",
        lparlt: "\u2993",
        lrarr: "\u21C6",
        lrcorner: "\u231F",
        lrhar: "\u21CB",
        lrhard: "\u296D",
        lrm: "\u200E",
        lrtri: "\u22BF",
        lsaquo: "\u2039",
        Lscr: "\u2112",
        lscr: "\u{1D4C1}",
        Lsh: "\u21B0",
        lsh: "\u21B0",
        lsim: "\u2272",
        lsime: "\u2A8D",
        lsimg: "\u2A8F",
        lsqb: "[",
        lsquo: "\u2018",
        lsquor: "\u201A",
        Lstrok: "\u0141",
        lstrok: "\u0142",
        Lt: "\u226A",
        LT: "<",
        lt: "<",
        ltcc: "\u2AA6",
        ltcir: "\u2A79",
        ltdot: "\u22D6",
        lthree: "\u22CB",
        ltimes: "\u22C9",
        ltlarr: "\u2976",
        ltquest: "\u2A7B",
        ltri: "\u25C3",
        ltrie: "\u22B4",
        ltrif: "\u25C2",
        ltrPar: "\u2996",
        lurdshar: "\u294A",
        luruhar: "\u2966",
        lvertneqq: "\u2268\uFE00",
        lvnE: "\u2268\uFE00",
        macr: "\xAF",
        male: "\u2642",
        malt: "\u2720",
        maltese: "\u2720",
        Map: "\u2905",
        map: "\u21A6",
        mapsto: "\u21A6",
        mapstodown: "\u21A7",
        mapstoleft: "\u21A4",
        mapstoup: "\u21A5",
        marker: "\u25AE",
        mcomma: "\u2A29",
        Mcy: "\u041C",
        mcy: "\u043C",
        mdash: "\u2014",
        mDDot: "\u223A",
        measuredangle: "\u2221",
        MediumSpace: "\u205F",
        Mellintrf: "\u2133",
        Mfr: "\u{1D510}",
        mfr: "\u{1D52A}",
        mho: "\u2127",
        micro: "\xB5",
        mid: "\u2223",
        midast: "*",
        midcir: "\u2AF0",
        middot: "\xB7",
        minus: "\u2212",
        minusb: "\u229F",
        minusd: "\u2238",
        minusdu: "\u2A2A",
        MinusPlus: "\u2213",
        mlcp: "\u2ADB",
        mldr: "\u2026",
        mnplus: "\u2213",
        models: "\u22A7",
        Mopf: "\u{1D544}",
        mopf: "\u{1D55E}",
        mp: "\u2213",
        Mscr: "\u2133",
        mscr: "\u{1D4C2}",
        mstpos: "\u223E",
        Mu: "\u039C",
        mu: "\u03BC",
        multimap: "\u22B8",
        mumap: "\u22B8",
        nabla: "\u2207",
        Nacute: "\u0143",
        nacute: "\u0144",
        nang: "\u2220\u20D2",
        nap: "\u2249",
        napE: "\u2A70\u0338",
        napid: "\u224B\u0338",
        napos: "\u0149",
        napprox: "\u2249",
        natur: "\u266E",
        natural: "\u266E",
        naturals: "\u2115",
        nbsp: "\xA0",
        nbump: "\u224E\u0338",
        nbumpe: "\u224F\u0338",
        ncap: "\u2A43",
        Ncaron: "\u0147",
        ncaron: "\u0148",
        Ncedil: "\u0145",
        ncedil: "\u0146",
        ncong: "\u2247",
        ncongdot: "\u2A6D\u0338",
        ncup: "\u2A42",
        Ncy: "\u041D",
        ncy: "\u043D",
        ndash: "\u2013",
        ne: "\u2260",
        nearhk: "\u2924",
        neArr: "\u21D7",
        nearr: "\u2197",
        nearrow: "\u2197",
        nedot: "\u2250\u0338",
        NegativeMediumSpace: "\u200B",
        NegativeThickSpace: "\u200B",
        NegativeThinSpace: "\u200B",
        NegativeVeryThinSpace: "\u200B",
        nequiv: "\u2262",
        nesear: "\u2928",
        nesim: "\u2242\u0338",
        NestedGreaterGreater: "\u226B",
        NestedLessLess: "\u226A",
        NewLine: "\n",
        nexist: "\u2204",
        nexists: "\u2204",
        Nfr: "\u{1D511}",
        nfr: "\u{1D52B}",
        ngE: "\u2267\u0338",
        nge: "\u2271",
        ngeq: "\u2271",
        ngeqq: "\u2267\u0338",
        ngeqslant: "\u2A7E\u0338",
        nges: "\u2A7E\u0338",
        nGg: "\u22D9\u0338",
        ngsim: "\u2275",
        nGt: "\u226B\u20D2",
        ngt: "\u226F",
        ngtr: "\u226F",
        nGtv: "\u226B\u0338",
        nhArr: "\u21CE",
        nharr: "\u21AE",
        nhpar: "\u2AF2",
        ni: "\u220B",
        nis: "\u22FC",
        nisd: "\u22FA",
        niv: "\u220B",
        NJcy: "\u040A",
        njcy: "\u045A",
        nlArr: "\u21CD",
        nlarr: "\u219A",
        nldr: "\u2025",
        nlE: "\u2266\u0338",
        nle: "\u2270",
        nLeftarrow: "\u21CD",
        nleftarrow: "\u219A",
        nLeftrightarrow: "\u21CE",
        nleftrightarrow: "\u21AE",
        nleq: "\u2270",
        nleqq: "\u2266\u0338",
        nleqslant: "\u2A7D\u0338",
        nles: "\u2A7D\u0338",
        nless: "\u226E",
        nLl: "\u22D8\u0338",
        nlsim: "\u2274",
        nLt: "\u226A\u20D2",
        nlt: "\u226E",
        nltri: "\u22EA",
        nltrie: "\u22EC",
        nLtv: "\u226A\u0338",
        nmid: "\u2224",
        NoBreak: "\u2060",
        NonBreakingSpace: "\xA0",
        Nopf: "\u2115",
        nopf: "\u{1D55F}",
        Not: "\u2AEC",
        not: "\xAC",
        NotCongruent: "\u2262",
        NotCupCap: "\u226D",
        NotDoubleVerticalBar: "\u2226",
        NotElement: "\u2209",
        NotEqual: "\u2260",
        NotEqualTilde: "\u2242\u0338",
        NotExists: "\u2204",
        NotGreater: "\u226F",
        NotGreaterEqual: "\u2271",
        NotGreaterFullEqual: "\u2267\u0338",
        NotGreaterGreater: "\u226B\u0338",
        NotGreaterLess: "\u2279",
        NotGreaterSlantEqual: "\u2A7E\u0338",
        NotGreaterTilde: "\u2275",
        NotHumpDownHump: "\u224E\u0338",
        NotHumpEqual: "\u224F\u0338",
        notin: "\u2209",
        notindot: "\u22F5\u0338",
        notinE: "\u22F9\u0338",
        notinva: "\u2209",
        notinvb: "\u22F7",
        notinvc: "\u22F6",
        NotLeftTriangle: "\u22EA",
        NotLeftTriangleBar: "\u29CF\u0338",
        NotLeftTriangleEqual: "\u22EC",
        NotLess: "\u226E",
        NotLessEqual: "\u2270",
        NotLessGreater: "\u2278",
        NotLessLess: "\u226A\u0338",
        NotLessSlantEqual: "\u2A7D\u0338",
        NotLessTilde: "\u2274",
        NotNestedGreaterGreater: "\u2AA2\u0338",
        NotNestedLessLess: "\u2AA1\u0338",
        notni: "\u220C",
        notniva: "\u220C",
        notnivb: "\u22FE",
        notnivc: "\u22FD",
        NotPrecedes: "\u2280",
        NotPrecedesEqual: "\u2AAF\u0338",
        NotPrecedesSlantEqual: "\u22E0",
        NotReverseElement: "\u220C",
        NotRightTriangle: "\u22EB",
        NotRightTriangleBar: "\u29D0\u0338",
        NotRightTriangleEqual: "\u22ED",
        NotSquareSubset: "\u228F\u0338",
        NotSquareSubsetEqual: "\u22E2",
        NotSquareSuperset: "\u2290\u0338",
        NotSquareSupersetEqual: "\u22E3",
        NotSubset: "\u2282\u20D2",
        NotSubsetEqual: "\u2288",
        NotSucceeds: "\u2281",
        NotSucceedsEqual: "\u2AB0\u0338",
        NotSucceedsSlantEqual: "\u22E1",
        NotSucceedsTilde: "\u227F\u0338",
        NotSuperset: "\u2283\u20D2",
        NotSupersetEqual: "\u2289",
        NotTilde: "\u2241",
        NotTildeEqual: "\u2244",
        NotTildeFullEqual: "\u2247",
        NotTildeTilde: "\u2249",
        NotVerticalBar: "\u2224",
        npar: "\u2226",
        nparallel: "\u2226",
        nparsl: "\u2AFD\u20E5",
        npart: "\u2202\u0338",
        npolint: "\u2A14",
        npr: "\u2280",
        nprcue: "\u22E0",
        npre: "\u2AAF\u0338",
        nprec: "\u2280",
        npreceq: "\u2AAF\u0338",
        nrArr: "\u21CF",
        nrarr: "\u219B",
        nrarrc: "\u2933\u0338",
        nrarrw: "\u219D\u0338",
        nRightarrow: "\u21CF",
        nrightarrow: "\u219B",
        nrtri: "\u22EB",
        nrtrie: "\u22ED",
        nsc: "\u2281",
        nsccue: "\u22E1",
        nsce: "\u2AB0\u0338",
        Nscr: "\u{1D4A9}",
        nscr: "\u{1D4C3}",
        nshortmid: "\u2224",
        nshortparallel: "\u2226",
        nsim: "\u2241",
        nsime: "\u2244",
        nsimeq: "\u2244",
        nsmid: "\u2224",
        nspar: "\u2226",
        nsqsube: "\u22E2",
        nsqsupe: "\u22E3",
        nsub: "\u2284",
        nsubE: "\u2AC5\u0338",
        nsube: "\u2288",
        nsubset: "\u2282\u20D2",
        nsubseteq: "\u2288",
        nsubseteqq: "\u2AC5\u0338",
        nsucc: "\u2281",
        nsucceq: "\u2AB0\u0338",
        nsup: "\u2285",
        nsupE: "\u2AC6\u0338",
        nsupe: "\u2289",
        nsupset: "\u2283\u20D2",
        nsupseteq: "\u2289",
        nsupseteqq: "\u2AC6\u0338",
        ntgl: "\u2279",
        Ntilde: "\xD1",
        ntilde: "\xF1",
        ntlg: "\u2278",
        ntriangleleft: "\u22EA",
        ntrianglelefteq: "\u22EC",
        ntriangleright: "\u22EB",
        ntrianglerighteq: "\u22ED",
        Nu: "\u039D",
        nu: "\u03BD",
        num: "#",
        numero: "\u2116",
        numsp: "\u2007",
        nvap: "\u224D\u20D2",
        nVDash: "\u22AF",
        nVdash: "\u22AE",
        nvDash: "\u22AD",
        nvdash: "\u22AC",
        nvge: "\u2265\u20D2",
        nvgt: ">\u20D2",
        nvHarr: "\u2904",
        nvinfin: "\u29DE",
        nvlArr: "\u2902",
        nvle: "\u2264\u20D2",
        nvlt: "<\u20D2",
        nvltrie: "\u22B4\u20D2",
        nvrArr: "\u2903",
        nvrtrie: "\u22B5\u20D2",
        nvsim: "\u223C\u20D2",
        nwarhk: "\u2923",
        nwArr: "\u21D6",
        nwarr: "\u2196",
        nwarrow: "\u2196",
        nwnear: "\u2927",
        Oacute: "\xD3",
        oacute: "\xF3",
        oast: "\u229B",
        ocir: "\u229A",
        Ocirc: "\xD4",
        ocirc: "\xF4",
        Ocy: "\u041E",
        ocy: "\u043E",
        odash: "\u229D",
        Odblac: "\u0150",
        odblac: "\u0151",
        odiv: "\u2A38",
        odot: "\u2299",
        odsold: "\u29BC",
        OElig: "\u0152",
        oelig: "\u0153",
        ofcir: "\u29BF",
        Ofr: "\u{1D512}",
        ofr: "\u{1D52C}",
        ogon: "\u02DB",
        Ograve: "\xD2",
        ograve: "\xF2",
        ogt: "\u29C1",
        ohbar: "\u29B5",
        ohm: "\u03A9",
        oint: "\u222E",
        olarr: "\u21BA",
        olcir: "\u29BE",
        olcross: "\u29BB",
        oline: "\u203E",
        olt: "\u29C0",
        Omacr: "\u014C",
        omacr: "\u014D",
        Omega: "\u03A9",
        omega: "\u03C9",
        Omicron: "\u039F",
        omicron: "\u03BF",
        omid: "\u29B6",
        ominus: "\u2296",
        Oopf: "\u{1D546}",
        oopf: "\u{1D560}",
        opar: "\u29B7",
        OpenCurlyDoubleQuote: "\u201C",
        OpenCurlyQuote: "\u2018",
        operp: "\u29B9",
        oplus: "\u2295",
        Or: "\u2A54",
        or: "\u2228",
        orarr: "\u21BB",
        ord: "\u2A5D",
        order: "\u2134",
        orderof: "\u2134",
        ordf: "\xAA",
        ordm: "\xBA",
        origof: "\u22B6",
        oror: "\u2A56",
        orslope: "\u2A57",
        orv: "\u2A5B",
        oS: "\u24C8",
        Oscr: "\u{1D4AA}",
        oscr: "\u2134",
        Oslash: "\xD8",
        oslash: "\xF8",
        osol: "\u2298",
        Otilde: "\xD5",
        otilde: "\xF5",
        Otimes: "\u2A37",
        otimes: "\u2297",
        otimesas: "\u2A36",
        Ouml: "\xD6",
        ouml: "\xF6",
        ovbar: "\u233D",
        OverBar: "\u203E",
        OverBrace: "\u23DE",
        OverBracket: "\u23B4",
        OverParenthesis: "\u23DC",
        par: "\u2225",
        para: "\xB6",
        parallel: "\u2225",
        parsim: "\u2AF3",
        parsl: "\u2AFD",
        part: "\u2202",
        PartialD: "\u2202",
        Pcy: "\u041F",
        pcy: "\u043F",
        percnt: "%",
        period: ".",
        permil: "\u2030",
        perp: "\u22A5",
        pertenk: "\u2031",
        Pfr: "\u{1D513}",
        pfr: "\u{1D52D}",
        Phi: "\u03A6",
        phi: "\u03C6",
        phiv: "\u03D5",
        phmmat: "\u2133",
        phone: "\u260E",
        Pi: "\u03A0",
        pi: "\u03C0",
        pitchfork: "\u22D4",
        piv: "\u03D6",
        planck: "\u210F",
        planckh: "\u210E",
        plankv: "\u210F",
        plus: "+",
        plusacir: "\u2A23",
        plusb: "\u229E",
        pluscir: "\u2A22",
        plusdo: "\u2214",
        plusdu: "\u2A25",
        pluse: "\u2A72",
        PlusMinus: "\xB1",
        plusmn: "\xB1",
        plussim: "\u2A26",
        plustwo: "\u2A27",
        pm: "\xB1",
        Poincareplane: "\u210C",
        pointint: "\u2A15",
        Popf: "\u2119",
        popf: "\u{1D561}",
        pound: "\xA3",
        Pr: "\u2ABB",
        pr: "\u227A",
        prap: "\u2AB7",
        prcue: "\u227C",
        prE: "\u2AB3",
        pre: "\u2AAF",
        prec: "\u227A",
        precapprox: "\u2AB7",
        preccurlyeq: "\u227C",
        Precedes: "\u227A",
        PrecedesEqual: "\u2AAF",
        PrecedesSlantEqual: "\u227C",
        PrecedesTilde: "\u227E",
        preceq: "\u2AAF",
        precnapprox: "\u2AB9",
        precneqq: "\u2AB5",
        precnsim: "\u22E8",
        precsim: "\u227E",
        Prime: "\u2033",
        prime: "\u2032",
        primes: "\u2119",
        prnap: "\u2AB9",
        prnE: "\u2AB5",
        prnsim: "\u22E8",
        prod: "\u220F",
        Product: "\u220F",
        profalar: "\u232E",
        profline: "\u2312",
        profsurf: "\u2313",
        prop: "\u221D",
        Proportion: "\u2237",
        Proportional: "\u221D",
        propto: "\u221D",
        prsim: "\u227E",
        prurel: "\u22B0",
        Pscr: "\u{1D4AB}",
        pscr: "\u{1D4C5}",
        Psi: "\u03A8",
        psi: "\u03C8",
        puncsp: "\u2008",
        Qfr: "\u{1D514}",
        qfr: "\u{1D52E}",
        qint: "\u2A0C",
        Qopf: "\u211A",
        qopf: "\u{1D562}",
        qprime: "\u2057",
        Qscr: "\u{1D4AC}",
        qscr: "\u{1D4C6}",
        quaternions: "\u210D",
        quatint: "\u2A16",
        quest: "?",
        questeq: "\u225F",
        QUOT: '"',
        quot: '"',
        rAarr: "\u21DB",
        race: "\u223D\u0331",
        Racute: "\u0154",
        racute: "\u0155",
        radic: "\u221A",
        raemptyv: "\u29B3",
        Rang: "\u27EB",
        rang: "\u27E9",
        rangd: "\u2992",
        range: "\u29A5",
        rangle: "\u27E9",
        raquo: "\xBB",
        Rarr: "\u21A0",
        rArr: "\u21D2",
        rarr: "\u2192",
        rarrap: "\u2975",
        rarrb: "\u21E5",
        rarrbfs: "\u2920",
        rarrc: "\u2933",
        rarrfs: "\u291E",
        rarrhk: "\u21AA",
        rarrlp: "\u21AC",
        rarrpl: "\u2945",
        rarrsim: "\u2974",
        Rarrtl: "\u2916",
        rarrtl: "\u21A3",
        rarrw: "\u219D",
        rAtail: "\u291C",
        ratail: "\u291A",
        ratio: "\u2236",
        rationals: "\u211A",
        RBarr: "\u2910",
        rBarr: "\u290F",
        rbarr: "\u290D",
        rbbrk: "\u2773",
        rbrace: "}",
        rbrack: "]",
        rbrke: "\u298C",
        rbrksld: "\u298E",
        rbrkslu: "\u2990",
        Rcaron: "\u0158",
        rcaron: "\u0159",
        Rcedil: "\u0156",
        rcedil: "\u0157",
        rceil: "\u2309",
        rcub: "}",
        Rcy: "\u0420",
        rcy: "\u0440",
        rdca: "\u2937",
        rdldhar: "\u2969",
        rdquo: "\u201D",
        rdquor: "\u201D",
        rdsh: "\u21B3",
        Re: "\u211C",
        real: "\u211C",
        realine: "\u211B",
        realpart: "\u211C",
        reals: "\u211D",
        rect: "\u25AD",
        REG: "\xAE",
        reg: "\xAE",
        ReverseElement: "\u220B",
        ReverseEquilibrium: "\u21CB",
        ReverseUpEquilibrium: "\u296F",
        rfisht: "\u297D",
        rfloor: "\u230B",
        Rfr: "\u211C",
        rfr: "\u{1D52F}",
        rHar: "\u2964",
        rhard: "\u21C1",
        rharu: "\u21C0",
        rharul: "\u296C",
        Rho: "\u03A1",
        rho: "\u03C1",
        rhov: "\u03F1",
        RightAngleBracket: "\u27E9",
        RightArrow: "\u2192",
        Rightarrow: "\u21D2",
        rightarrow: "\u2192",
        RightArrowBar: "\u21E5",
        RightArrowLeftArrow: "\u21C4",
        rightarrowtail: "\u21A3",
        RightCeiling: "\u2309",
        RightDoubleBracket: "\u27E7",
        RightDownTeeVector: "\u295D",
        RightDownVector: "\u21C2",
        RightDownVectorBar: "\u2955",
        RightFloor: "\u230B",
        rightharpoondown: "\u21C1",
        rightharpoonup: "\u21C0",
        rightleftarrows: "\u21C4",
        rightleftharpoons: "\u21CC",
        rightrightarrows: "\u21C9",
        rightsquigarrow: "\u219D",
        RightTee: "\u22A2",
        RightTeeArrow: "\u21A6",
        RightTeeVector: "\u295B",
        rightthreetimes: "\u22CC",
        RightTriangle: "\u22B3",
        RightTriangleBar: "\u29D0",
        RightTriangleEqual: "\u22B5",
        RightUpDownVector: "\u294F",
        RightUpTeeVector: "\u295C",
        RightUpVector: "\u21BE",
        RightUpVectorBar: "\u2954",
        RightVector: "\u21C0",
        RightVectorBar: "\u2953",
        ring: "\u02DA",
        risingdotseq: "\u2253",
        rlarr: "\u21C4",
        rlhar: "\u21CC",
        rlm: "\u200F",
        rmoust: "\u23B1",
        rmoustache: "\u23B1",
        rnmid: "\u2AEE",
        roang: "\u27ED",
        roarr: "\u21FE",
        robrk: "\u27E7",
        ropar: "\u2986",
        Ropf: "\u211D",
        ropf: "\u{1D563}",
        roplus: "\u2A2E",
        rotimes: "\u2A35",
        RoundImplies: "\u2970",
        rpar: ")",
        rpargt: "\u2994",
        rppolint: "\u2A12",
        rrarr: "\u21C9",
        Rrightarrow: "\u21DB",
        rsaquo: "\u203A",
        Rscr: "\u211B",
        rscr: "\u{1D4C7}",
        Rsh: "\u21B1",
        rsh: "\u21B1",
        rsqb: "]",
        rsquo: "\u2019",
        rsquor: "\u2019",
        rthree: "\u22CC",
        rtimes: "\u22CA",
        rtri: "\u25B9",
        rtrie: "\u22B5",
        rtrif: "\u25B8",
        rtriltri: "\u29CE",
        RuleDelayed: "\u29F4",
        ruluhar: "\u2968",
        rx: "\u211E",
        Sacute: "\u015A",
        sacute: "\u015B",
        sbquo: "\u201A",
        Sc: "\u2ABC",
        sc: "\u227B",
        scap: "\u2AB8",
        Scaron: "\u0160",
        scaron: "\u0161",
        sccue: "\u227D",
        scE: "\u2AB4",
        sce: "\u2AB0",
        Scedil: "\u015E",
        scedil: "\u015F",
        Scirc: "\u015C",
        scirc: "\u015D",
        scnap: "\u2ABA",
        scnE: "\u2AB6",
        scnsim: "\u22E9",
        scpolint: "\u2A13",
        scsim: "\u227F",
        Scy: "\u0421",
        scy: "\u0441",
        sdot: "\u22C5",
        sdotb: "\u22A1",
        sdote: "\u2A66",
        searhk: "\u2925",
        seArr: "\u21D8",
        searr: "\u2198",
        searrow: "\u2198",
        sect: "\xA7",
        semi: ";",
        seswar: "\u2929",
        setminus: "\u2216",
        setmn: "\u2216",
        sext: "\u2736",
        Sfr: "\u{1D516}",
        sfr: "\u{1D530}",
        sfrown: "\u2322",
        sharp: "\u266F",
        SHCHcy: "\u0429",
        shchcy: "\u0449",
        SHcy: "\u0428",
        shcy: "\u0448",
        ShortDownArrow: "\u2193",
        ShortLeftArrow: "\u2190",
        shortmid: "\u2223",
        shortparallel: "\u2225",
        ShortRightArrow: "\u2192",
        ShortUpArrow: "\u2191",
        shy: "\xAD",
        Sigma: "\u03A3",
        sigma: "\u03C3",
        sigmaf: "\u03C2",
        sigmav: "\u03C2",
        sim: "\u223C",
        simdot: "\u2A6A",
        sime: "\u2243",
        simeq: "\u2243",
        simg: "\u2A9E",
        simgE: "\u2AA0",
        siml: "\u2A9D",
        simlE: "\u2A9F",
        simne: "\u2246",
        simplus: "\u2A24",
        simrarr: "\u2972",
        slarr: "\u2190",
        SmallCircle: "\u2218",
        smallsetminus: "\u2216",
        smashp: "\u2A33",
        smeparsl: "\u29E4",
        smid: "\u2223",
        smile: "\u2323",
        smt: "\u2AAA",
        smte: "\u2AAC",
        smtes: "\u2AAC\uFE00",
        SOFTcy: "\u042C",
        softcy: "\u044C",
        sol: "/",
        solb: "\u29C4",
        solbar: "\u233F",
        Sopf: "\u{1D54A}",
        sopf: "\u{1D564}",
        spades: "\u2660",
        spadesuit: "\u2660",
        spar: "\u2225",
        sqcap: "\u2293",
        sqcaps: "\u2293\uFE00",
        sqcup: "\u2294",
        sqcups: "\u2294\uFE00",
        Sqrt: "\u221A",
        sqsub: "\u228F",
        sqsube: "\u2291",
        sqsubset: "\u228F",
        sqsubseteq: "\u2291",
        sqsup: "\u2290",
        sqsupe: "\u2292",
        sqsupset: "\u2290",
        sqsupseteq: "\u2292",
        squ: "\u25A1",
        Square: "\u25A1",
        square: "\u25A1",
        SquareIntersection: "\u2293",
        SquareSubset: "\u228F",
        SquareSubsetEqual: "\u2291",
        SquareSuperset: "\u2290",
        SquareSupersetEqual: "\u2292",
        SquareUnion: "\u2294",
        squarf: "\u25AA",
        squf: "\u25AA",
        srarr: "\u2192",
        Sscr: "\u{1D4AE}",
        sscr: "\u{1D4C8}",
        ssetmn: "\u2216",
        ssmile: "\u2323",
        sstarf: "\u22C6",
        Star: "\u22C6",
        star: "\u2606",
        starf: "\u2605",
        straightepsilon: "\u03F5",
        straightphi: "\u03D5",
        strns: "\xAF",
        Sub: "\u22D0",
        sub: "\u2282",
        subdot: "\u2ABD",
        subE: "\u2AC5",
        sube: "\u2286",
        subedot: "\u2AC3",
        submult: "\u2AC1",
        subnE: "\u2ACB",
        subne: "\u228A",
        subplus: "\u2ABF",
        subrarr: "\u2979",
        Subset: "\u22D0",
        subset: "\u2282",
        subseteq: "\u2286",
        subseteqq: "\u2AC5",
        SubsetEqual: "\u2286",
        subsetneq: "\u228A",
        subsetneqq: "\u2ACB",
        subsim: "\u2AC7",
        subsub: "\u2AD5",
        subsup: "\u2AD3",
        succ: "\u227B",
        succapprox: "\u2AB8",
        succcurlyeq: "\u227D",
        Succeeds: "\u227B",
        SucceedsEqual: "\u2AB0",
        SucceedsSlantEqual: "\u227D",
        SucceedsTilde: "\u227F",
        succeq: "\u2AB0",
        succnapprox: "\u2ABA",
        succneqq: "\u2AB6",
        succnsim: "\u22E9",
        succsim: "\u227F",
        SuchThat: "\u220B",
        Sum: "\u2211",
        sum: "\u2211",
        sung: "\u266A",
        Sup: "\u22D1",
        sup: "\u2283",
        sup1: "\xB9",
        sup2: "\xB2",
        sup3: "\xB3",
        supdot: "\u2ABE",
        supdsub: "\u2AD8",
        supE: "\u2AC6",
        supe: "\u2287",
        supedot: "\u2AC4",
        Superset: "\u2283",
        SupersetEqual: "\u2287",
        suphsol: "\u27C9",
        suphsub: "\u2AD7",
        suplarr: "\u297B",
        supmult: "\u2AC2",
        supnE: "\u2ACC",
        supne: "\u228B",
        supplus: "\u2AC0",
        Supset: "\u22D1",
        supset: "\u2283",
        supseteq: "\u2287",
        supseteqq: "\u2AC6",
        supsetneq: "\u228B",
        supsetneqq: "\u2ACC",
        supsim: "\u2AC8",
        supsub: "\u2AD4",
        supsup: "\u2AD6",
        swarhk: "\u2926",
        swArr: "\u21D9",
        swarr: "\u2199",
        swarrow: "\u2199",
        swnwar: "\u292A",
        szlig: "\xDF",
        Tab: "	",
        target: "\u2316",
        Tau: "\u03A4",
        tau: "\u03C4",
        tbrk: "\u23B4",
        Tcaron: "\u0164",
        tcaron: "\u0165",
        Tcedil: "\u0162",
        tcedil: "\u0163",
        Tcy: "\u0422",
        tcy: "\u0442",
        tdot: "\u20DB",
        telrec: "\u2315",
        Tfr: "\u{1D517}",
        tfr: "\u{1D531}",
        there4: "\u2234",
        Therefore: "\u2234",
        therefore: "\u2234",
        Theta: "\u0398",
        theta: "\u03B8",
        thetasym: "\u03D1",
        thetav: "\u03D1",
        thickapprox: "\u2248",
        thicksim: "\u223C",
        ThickSpace: "\u205F\u200A",
        thinsp: "\u2009",
        ThinSpace: "\u2009",
        thkap: "\u2248",
        thksim: "\u223C",
        THORN: "\xDE",
        thorn: "\xFE",
        Tilde: "\u223C",
        tilde: "\u02DC",
        TildeEqual: "\u2243",
        TildeFullEqual: "\u2245",
        TildeTilde: "\u2248",
        times: "\xD7",
        timesb: "\u22A0",
        timesbar: "\u2A31",
        timesd: "\u2A30",
        tint: "\u222D",
        toea: "\u2928",
        top: "\u22A4",
        topbot: "\u2336",
        topcir: "\u2AF1",
        Topf: "\u{1D54B}",
        topf: "\u{1D565}",
        topfork: "\u2ADA",
        tosa: "\u2929",
        tprime: "\u2034",
        TRADE: "\u2122",
        trade: "\u2122",
        triangle: "\u25B5",
        triangledown: "\u25BF",
        triangleleft: "\u25C3",
        trianglelefteq: "\u22B4",
        triangleq: "\u225C",
        triangleright: "\u25B9",
        trianglerighteq: "\u22B5",
        tridot: "\u25EC",
        trie: "\u225C",
        triminus: "\u2A3A",
        TripleDot: "\u20DB",
        triplus: "\u2A39",
        trisb: "\u29CD",
        tritime: "\u2A3B",
        trpezium: "\u23E2",
        Tscr: "\u{1D4AF}",
        tscr: "\u{1D4C9}",
        TScy: "\u0426",
        tscy: "\u0446",
        TSHcy: "\u040B",
        tshcy: "\u045B",
        Tstrok: "\u0166",
        tstrok: "\u0167",
        twixt: "\u226C",
        twoheadleftarrow: "\u219E",
        twoheadrightarrow: "\u21A0",
        Uacute: "\xDA",
        uacute: "\xFA",
        Uarr: "\u219F",
        uArr: "\u21D1",
        uarr: "\u2191",
        Uarrocir: "\u2949",
        Ubrcy: "\u040E",
        ubrcy: "\u045E",
        Ubreve: "\u016C",
        ubreve: "\u016D",
        Ucirc: "\xDB",
        ucirc: "\xFB",
        Ucy: "\u0423",
        ucy: "\u0443",
        udarr: "\u21C5",
        Udblac: "\u0170",
        udblac: "\u0171",
        udhar: "\u296E",
        ufisht: "\u297E",
        Ufr: "\u{1D518}",
        ufr: "\u{1D532}",
        Ugrave: "\xD9",
        ugrave: "\xF9",
        uHar: "\u2963",
        uharl: "\u21BF",
        uharr: "\u21BE",
        uhblk: "\u2580",
        ulcorn: "\u231C",
        ulcorner: "\u231C",
        ulcrop: "\u230F",
        ultri: "\u25F8",
        Umacr: "\u016A",
        umacr: "\u016B",
        uml: "\xA8",
        UnderBar: "_",
        UnderBrace: "\u23DF",
        UnderBracket: "\u23B5",
        UnderParenthesis: "\u23DD",
        Union: "\u22C3",
        UnionPlus: "\u228E",
        Uogon: "\u0172",
        uogon: "\u0173",
        Uopf: "\u{1D54C}",
        uopf: "\u{1D566}",
        UpArrow: "\u2191",
        Uparrow: "\u21D1",
        uparrow: "\u2191",
        UpArrowBar: "\u2912",
        UpArrowDownArrow: "\u21C5",
        UpDownArrow: "\u2195",
        Updownarrow: "\u21D5",
        updownarrow: "\u2195",
        UpEquilibrium: "\u296E",
        upharpoonleft: "\u21BF",
        upharpoonright: "\u21BE",
        uplus: "\u228E",
        UpperLeftArrow: "\u2196",
        UpperRightArrow: "\u2197",
        Upsi: "\u03D2",
        upsi: "\u03C5",
        upsih: "\u03D2",
        Upsilon: "\u03A5",
        upsilon: "\u03C5",
        UpTee: "\u22A5",
        UpTeeArrow: "\u21A5",
        upuparrows: "\u21C8",
        urcorn: "\u231D",
        urcorner: "\u231D",
        urcrop: "\u230E",
        Uring: "\u016E",
        uring: "\u016F",
        urtri: "\u25F9",
        Uscr: "\u{1D4B0}",
        uscr: "\u{1D4CA}",
        utdot: "\u22F0",
        Utilde: "\u0168",
        utilde: "\u0169",
        utri: "\u25B5",
        utrif: "\u25B4",
        uuarr: "\u21C8",
        Uuml: "\xDC",
        uuml: "\xFC",
        uwangle: "\u29A7",
        vangrt: "\u299C",
        varepsilon: "\u03F5",
        varkappa: "\u03F0",
        varnothing: "\u2205",
        varphi: "\u03D5",
        varpi: "\u03D6",
        varpropto: "\u221D",
        vArr: "\u21D5",
        varr: "\u2195",
        varrho: "\u03F1",
        varsigma: "\u03C2",
        varsubsetneq: "\u228A\uFE00",
        varsubsetneqq: "\u2ACB\uFE00",
        varsupsetneq: "\u228B\uFE00",
        varsupsetneqq: "\u2ACC\uFE00",
        vartheta: "\u03D1",
        vartriangleleft: "\u22B2",
        vartriangleright: "\u22B3",
        Vbar: "\u2AEB",
        vBar: "\u2AE8",
        vBarv: "\u2AE9",
        Vcy: "\u0412",
        vcy: "\u0432",
        VDash: "\u22AB",
        Vdash: "\u22A9",
        vDash: "\u22A8",
        vdash: "\u22A2",
        Vdashl: "\u2AE6",
        Vee: "\u22C1",
        vee: "\u2228",
        veebar: "\u22BB",
        veeeq: "\u225A",
        vellip: "\u22EE",
        Verbar: "\u2016",
        verbar: "|",
        Vert: "\u2016",
        vert: "|",
        VerticalBar: "\u2223",
        VerticalLine: "|",
        VerticalSeparator: "\u2758",
        VerticalTilde: "\u2240",
        VeryThinSpace: "\u200A",
        Vfr: "\u{1D519}",
        vfr: "\u{1D533}",
        vltri: "\u22B2",
        vnsub: "\u2282\u20D2",
        vnsup: "\u2283\u20D2",
        Vopf: "\u{1D54D}",
        vopf: "\u{1D567}",
        vprop: "\u221D",
        vrtri: "\u22B3",
        Vscr: "\u{1D4B1}",
        vscr: "\u{1D4CB}",
        vsubnE: "\u2ACB\uFE00",
        vsubne: "\u228A\uFE00",
        vsupnE: "\u2ACC\uFE00",
        vsupne: "\u228B\uFE00",
        Vvdash: "\u22AA",
        vzigzag: "\u299A",
        Wcirc: "\u0174",
        wcirc: "\u0175",
        wedbar: "\u2A5F",
        Wedge: "\u22C0",
        wedge: "\u2227",
        wedgeq: "\u2259",
        weierp: "\u2118",
        Wfr: "\u{1D51A}",
        wfr: "\u{1D534}",
        Wopf: "\u{1D54E}",
        wopf: "\u{1D568}",
        wp: "\u2118",
        wr: "\u2240",
        wreath: "\u2240",
        Wscr: "\u{1D4B2}",
        wscr: "\u{1D4CC}",
        xcap: "\u22C2",
        xcirc: "\u25EF",
        xcup: "\u22C3",
        xdtri: "\u25BD",
        Xfr: "\u{1D51B}",
        xfr: "\u{1D535}",
        xhArr: "\u27FA",
        xharr: "\u27F7",
        Xi: "\u039E",
        xi: "\u03BE",
        xlArr: "\u27F8",
        xlarr: "\u27F5",
        xmap: "\u27FC",
        xnis: "\u22FB",
        xodot: "\u2A00",
        Xopf: "\u{1D54F}",
        xopf: "\u{1D569}",
        xoplus: "\u2A01",
        xotime: "\u2A02",
        xrArr: "\u27F9",
        xrarr: "\u27F6",
        Xscr: "\u{1D4B3}",
        xscr: "\u{1D4CD}",
        xsqcup: "\u2A06",
        xuplus: "\u2A04",
        xutri: "\u25B3",
        xvee: "\u22C1",
        xwedge: "\u22C0",
        Yacute: "\xDD",
        yacute: "\xFD",
        YAcy: "\u042F",
        yacy: "\u044F",
        Ycirc: "\u0176",
        ycirc: "\u0177",
        Ycy: "\u042B",
        ycy: "\u044B",
        yen: "\xA5",
        Yfr: "\u{1D51C}",
        yfr: "\u{1D536}",
        YIcy: "\u0407",
        yicy: "\u0457",
        Yopf: "\u{1D550}",
        yopf: "\u{1D56A}",
        Yscr: "\u{1D4B4}",
        yscr: "\u{1D4CE}",
        YUcy: "\u042E",
        yucy: "\u044E",
        Yuml: "\u0178",
        yuml: "\xFF",
        Zacute: "\u0179",
        zacute: "\u017A",
        Zcaron: "\u017D",
        zcaron: "\u017E",
        Zcy: "\u0417",
        zcy: "\u0437",
        Zdot: "\u017B",
        zdot: "\u017C",
        zeetrf: "\u2128",
        ZeroWidthSpace: "\u200B",
        Zeta: "\u0396",
        zeta: "\u03B6",
        Zfr: "\u2128",
        zfr: "\u{1D537}",
        ZHcy: "\u0416",
        zhcy: "\u0436",
        zigrarr: "\u21DD",
        Zopf: "\u2124",
        zopf: "\u{1D56B}",
        Zscr: "\u{1D4B5}",
        zscr: "\u{1D4CF}",
        zwj: "\u200D",
        zwnj: "\u200C"
      });
      exports.entityMap = exports.HTML_ENTITIES;
    }
  });

  // node_modules/@xmldom/xmldom/lib/sax.js
  var require_sax = __commonJS({
    "node_modules/@xmldom/xmldom/lib/sax.js"(exports) {
      var NAMESPACE = require_conventions().NAMESPACE;
      var nameStartChar = /[A-Z_a-z\xC0-\xD6\xD8-\xF6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/;
      var nameChar = new RegExp("[\\-\\.0-9" + nameStartChar.source.slice(1, -1) + "\\u00B7\\u0300-\\u036F\\u203F-\\u2040]");
      var tagNamePattern = new RegExp("^" + nameStartChar.source + nameChar.source + "*(?::" + nameStartChar.source + nameChar.source + "*)?$");
      var S_TAG = 0;
      var S_ATTR = 1;
      var S_ATTR_SPACE = 2;
      var S_EQ = 3;
      var S_ATTR_NOQUOT_VALUE = 4;
      var S_ATTR_END = 5;
      var S_TAG_SPACE = 6;
      var S_TAG_CLOSE = 7;
      function ParseError(message, locator) {
        this.message = message;
        this.locator = locator;
        if (Error.captureStackTrace) Error.captureStackTrace(this, ParseError);
      }
      ParseError.prototype = new Error();
      ParseError.prototype.name = ParseError.name;
      function XMLReader() {
      }
      XMLReader.prototype = {
        parse: function(source, defaultNSMap, entityMap) {
          var domBuilder = this.domBuilder;
          domBuilder.startDocument();
          _copy(defaultNSMap, defaultNSMap = {});
          parse(
            source,
            defaultNSMap,
            entityMap,
            domBuilder,
            this.errorHandler
          );
          domBuilder.endDocument();
        }
      };
      function parse(source, defaultNSMapCopy, entityMap, domBuilder, errorHandler) {
        function fixedFromCharCode(code) {
          if (code > 65535) {
            code -= 65536;
            var surrogate1 = 55296 + (code >> 10), surrogate2 = 56320 + (code & 1023);
            return String.fromCharCode(surrogate1, surrogate2);
          } else {
            return String.fromCharCode(code);
          }
        }
        function entityReplacer(a2) {
          var k = a2.slice(1, -1);
          if (Object.hasOwnProperty.call(entityMap, k)) {
            return entityMap[k];
          } else if (k.charAt(0) === "#") {
            return fixedFromCharCode(parseInt(k.substr(1).replace("x", "0x")));
          } else {
            errorHandler.error("entity not found:" + a2);
            return a2;
          }
        }
        function appendText(end2) {
          if (end2 > start) {
            var xt = source.substring(start, end2).replace(/&#?\w+;/g, entityReplacer);
            locator && position(start);
            domBuilder.characters(xt, 0, end2 - start);
            start = end2;
          }
        }
        function position(p, m) {
          while (p >= lineEnd && (m = linePattern.exec(source))) {
            lineStart = m.index;
            lineEnd = lineStart + m[0].length;
            locator.lineNumber++;
          }
          locator.columnNumber = p - lineStart + 1;
        }
        var lineStart = 0;
        var lineEnd = 0;
        var linePattern = /.*(?:\r\n?|\n)|.*$/g;
        var locator = domBuilder.locator;
        var parseStack = [{ currentNSMap: defaultNSMapCopy }];
        var closeMap = {};
        var start = 0;
        while (true) {
          try {
            var tagStart = source.indexOf("<", start);
            if (tagStart < 0) {
              if (!source.substr(start).match(/^\s*$/)) {
                var doc = domBuilder.doc;
                var text = doc.createTextNode(source.substr(start));
                doc.appendChild(text);
                domBuilder.currentElement = text;
              }
              return;
            }
            if (tagStart > start) {
              appendText(tagStart);
            }
            switch (source.charAt(tagStart + 1)) {
              case "/":
                var end = source.indexOf(">", tagStart + 3);
                var tagName = source.substring(tagStart + 2, end).replace(/[ \t\n\r]+$/g, "");
                var config = parseStack.pop();
                if (end < 0) {
                  tagName = source.substring(tagStart + 2).replace(/[\s<].*/, "");
                  errorHandler.error("end tag name: " + tagName + " is not complete:" + config.tagName);
                  end = tagStart + 1 + tagName.length;
                } else if (tagName.match(/\s</)) {
                  tagName = tagName.replace(/[\s<].*/, "");
                  errorHandler.error("end tag name: " + tagName + " maybe not complete");
                  end = tagStart + 1 + tagName.length;
                }
                var localNSMap = config.localNSMap;
                var endMatch = config.tagName == tagName;
                var endIgnoreCaseMach = endMatch || config.tagName && config.tagName.toLowerCase() == tagName.toLowerCase();
                if (endIgnoreCaseMach) {
                  domBuilder.endElement(config.uri, config.localName, tagName);
                  if (localNSMap) {
                    for (var prefix in localNSMap) {
                      if (Object.prototype.hasOwnProperty.call(localNSMap, prefix)) {
                        domBuilder.endPrefixMapping(prefix);
                      }
                    }
                  }
                  if (!endMatch) {
                    errorHandler.fatalError("end tag name: " + tagName + " is not match the current start tagName:" + config.tagName);
                  }
                } else {
                  parseStack.push(config);
                }
                end++;
                break;
              // end elment
              case "?":
                locator && position(tagStart);
                end = parseInstruction(source, tagStart, domBuilder);
                break;
              case "!":
                locator && position(tagStart);
                end = parseDCC(source, tagStart, domBuilder, errorHandler);
                break;
              default:
                locator && position(tagStart);
                var el = new ElementAttributes();
                var currentNSMap = parseStack[parseStack.length - 1].currentNSMap;
                var end = parseElementStartPart(source, tagStart, el, currentNSMap, entityReplacer, errorHandler);
                var len = el.length;
                if (!el.closed && fixSelfClosed(source, end, el.tagName, closeMap)) {
                  el.closed = true;
                  if (!entityMap.nbsp) {
                    errorHandler.warning("unclosed xml attribute");
                  }
                }
                if (locator && len) {
                  var locator2 = copyLocator(locator, {});
                  for (var i = 0; i < len; i++) {
                    var a = el[i];
                    position(a.offset);
                    a.locator = copyLocator(locator, {});
                  }
                  domBuilder.locator = locator2;
                  if (appendElement(el, domBuilder, currentNSMap)) {
                    parseStack.push(el);
                  }
                  domBuilder.locator = locator;
                } else {
                  if (appendElement(el, domBuilder, currentNSMap)) {
                    parseStack.push(el);
                  }
                }
                if (NAMESPACE.isHTML(el.uri) && !el.closed) {
                  end = parseHtmlSpecialContent(source, end, el.tagName, entityReplacer, domBuilder);
                } else {
                  end++;
                }
            }
          } catch (e) {
            if (e instanceof ParseError) {
              throw e;
            }
            errorHandler.error("element parse error: " + e);
            end = -1;
          }
          if (end > start) {
            start = end;
          } else {
            appendText(Math.max(tagStart, start) + 1);
          }
        }
      }
      function copyLocator(f, t) {
        t.lineNumber = f.lineNumber;
        t.columnNumber = f.columnNumber;
        return t;
      }
      function parseElementStartPart(source, start, el, currentNSMap, entityReplacer, errorHandler) {
        function addAttribute(qname, value2, startIndex) {
          if (el.attributeNames.hasOwnProperty(qname)) {
            errorHandler.fatalError("Attribute " + qname + " redefined");
          }
          el.addValue(
            qname,
            // @see https://www.w3.org/TR/xml/#AVNormalize
            // since the xmldom sax parser does not "interpret" DTD the following is not implemented:
            // - recursive replacement of (DTD) entity references
            // - trimming and collapsing multiple spaces into a single one for attributes that are not of type CDATA
            value2.replace(/[\t\n\r]/g, " ").replace(/&#?\w+;/g, entityReplacer),
            startIndex
          );
        }
        var attrName;
        var value;
        var p = ++start;
        var s = S_TAG;
        while (true) {
          var c = source.charAt(p);
          switch (c) {
            case "=":
              if (s === S_ATTR) {
                attrName = source.slice(start, p);
                s = S_EQ;
              } else if (s === S_ATTR_SPACE) {
                s = S_EQ;
              } else {
                throw new Error("attribute equal must after attrName");
              }
              break;
            case "'":
            case '"':
              if (s === S_EQ || s === S_ATTR) {
                if (s === S_ATTR) {
                  errorHandler.warning('attribute value must after "="');
                  attrName = source.slice(start, p);
                }
                start = p + 1;
                p = source.indexOf(c, start);
                if (p > 0) {
                  value = source.slice(start, p);
                  addAttribute(attrName, value, start - 1);
                  s = S_ATTR_END;
                } else {
                  throw new Error("attribute value no end '" + c + "' match");
                }
              } else if (s == S_ATTR_NOQUOT_VALUE) {
                value = source.slice(start, p);
                addAttribute(attrName, value, start);
                errorHandler.warning('attribute "' + attrName + '" missed start quot(' + c + ")!!");
                start = p + 1;
                s = S_ATTR_END;
              } else {
                throw new Error('attribute value must after "="');
              }
              break;
            case "/":
              switch (s) {
                case S_TAG:
                  el.setTagName(source.slice(start, p));
                case S_ATTR_END:
                case S_TAG_SPACE:
                case S_TAG_CLOSE:
                  s = S_TAG_CLOSE;
                  el.closed = true;
                case S_ATTR_NOQUOT_VALUE:
                case S_ATTR:
                  break;
                case S_ATTR_SPACE:
                  el.closed = true;
                  break;
                //case S_EQ:
                default:
                  throw new Error("attribute invalid close char('/')");
              }
              break;
            case "":
              errorHandler.error("unexpected end of input");
              if (s == S_TAG) {
                el.setTagName(source.slice(start, p));
              }
              return p;
            case ">":
              switch (s) {
                case S_TAG:
                  el.setTagName(source.slice(start, p));
                case S_ATTR_END:
                case S_TAG_SPACE:
                case S_TAG_CLOSE:
                  break;
                //normal
                case S_ATTR_NOQUOT_VALUE:
                //Compatible state
                case S_ATTR:
                  value = source.slice(start, p);
                  if (value.slice(-1) === "/") {
                    el.closed = true;
                    value = value.slice(0, -1);
                  }
                case S_ATTR_SPACE:
                  if (s === S_ATTR_SPACE) {
                    value = attrName;
                  }
                  if (s == S_ATTR_NOQUOT_VALUE) {
                    errorHandler.warning('attribute "' + value + '" missed quot(")!');
                    addAttribute(attrName, value, start);
                  } else {
                    if (!NAMESPACE.isHTML(currentNSMap[""]) || !value.match(/^(?:disabled|checked|selected)$/i)) {
                      errorHandler.warning('attribute "' + value + '" missed value!! "' + value + '" instead!!');
                    }
                    addAttribute(value, value, start);
                  }
                  break;
                case S_EQ:
                  throw new Error("attribute value missed!!");
              }
              return p;
            /*xml space '\x20' | #x9 | #xD | #xA; */
            case "\x80":
              c = " ";
            default:
              if (c <= " ") {
                switch (s) {
                  case S_TAG:
                    el.setTagName(source.slice(start, p));
                    s = S_TAG_SPACE;
                    break;
                  case S_ATTR:
                    attrName = source.slice(start, p);
                    s = S_ATTR_SPACE;
                    break;
                  case S_ATTR_NOQUOT_VALUE:
                    var value = source.slice(start, p);
                    errorHandler.warning('attribute "' + value + '" missed quot(")!!');
                    addAttribute(attrName, value, start);
                  case S_ATTR_END:
                    s = S_TAG_SPACE;
                    break;
                }
              } else {
                switch (s) {
                  //case S_TAG:void();break;
                  //case S_ATTR:void();break;
                  //case S_ATTR_NOQUOT_VALUE:void();break;
                  case S_ATTR_SPACE:
                    var tagName = el.tagName;
                    if (!NAMESPACE.isHTML(currentNSMap[""]) || !attrName.match(/^(?:disabled|checked|selected)$/i)) {
                      errorHandler.warning('attribute "' + attrName + '" missed value!! "' + attrName + '" instead2!!');
                    }
                    addAttribute(attrName, attrName, start);
                    start = p;
                    s = S_ATTR;
                    break;
                  case S_ATTR_END:
                    errorHandler.warning('attribute space is required"' + attrName + '"!!');
                  case S_TAG_SPACE:
                    s = S_ATTR;
                    start = p;
                    break;
                  case S_EQ:
                    s = S_ATTR_NOQUOT_VALUE;
                    start = p;
                    break;
                  case S_TAG_CLOSE:
                    throw new Error("elements closed character '/' and '>' must be connected to");
                }
              }
          }
          p++;
        }
      }
      function appendElement(el, domBuilder, currentNSMap) {
        var tagName = el.tagName;
        var localNSMap = null;
        var i = el.length;
        while (i--) {
          var a = el[i];
          var qName = a.qName;
          var value = a.value;
          var nsp = qName.indexOf(":");
          if (nsp > 0) {
            var prefix = a.prefix = qName.slice(0, nsp);
            var localName = qName.slice(nsp + 1);
            var nsPrefix = prefix === "xmlns" && localName;
          } else {
            localName = qName;
            prefix = null;
            nsPrefix = qName === "xmlns" && "";
          }
          a.localName = localName;
          if (nsPrefix !== false) {
            if (localNSMap == null) {
              localNSMap = {};
              _copy(currentNSMap, currentNSMap = {});
            }
            currentNSMap[nsPrefix] = localNSMap[nsPrefix] = value;
            a.uri = NAMESPACE.XMLNS;
            domBuilder.startPrefixMapping(nsPrefix, value);
          }
        }
        var i = el.length;
        while (i--) {
          a = el[i];
          var prefix = a.prefix;
          if (prefix) {
            if (prefix === "xml") {
              a.uri = NAMESPACE.XML;
            }
            if (prefix !== "xmlns") {
              a.uri = currentNSMap[prefix || ""];
            }
          }
        }
        var nsp = tagName.indexOf(":");
        if (nsp > 0) {
          prefix = el.prefix = tagName.slice(0, nsp);
          localName = el.localName = tagName.slice(nsp + 1);
        } else {
          prefix = null;
          localName = el.localName = tagName;
        }
        var ns = el.uri = currentNSMap[prefix || ""];
        domBuilder.startElement(ns, localName, tagName, el);
        if (el.closed) {
          domBuilder.endElement(ns, localName, tagName);
          if (localNSMap) {
            for (prefix in localNSMap) {
              if (Object.prototype.hasOwnProperty.call(localNSMap, prefix)) {
                domBuilder.endPrefixMapping(prefix);
              }
            }
          }
        } else {
          el.currentNSMap = currentNSMap;
          el.localNSMap = localNSMap;
          return true;
        }
      }
      function parseHtmlSpecialContent(source, elStartEnd, tagName, entityReplacer, domBuilder) {
        if (/^(?:script|textarea)$/i.test(tagName)) {
          var elEndStart = source.indexOf("</" + tagName + ">", elStartEnd);
          var text = source.substring(elStartEnd + 1, elEndStart);
          if (/[&<]/.test(text)) {
            if (/^script$/i.test(tagName)) {
              domBuilder.characters(text, 0, text.length);
              return elEndStart;
            }
            text = text.replace(/&#?\w+;/g, entityReplacer);
            domBuilder.characters(text, 0, text.length);
            return elEndStart;
          }
        }
        return elStartEnd + 1;
      }
      function fixSelfClosed(source, elStartEnd, tagName, closeMap) {
        var pos = closeMap[tagName];
        if (pos == null) {
          pos = source.lastIndexOf("</" + tagName + ">");
          if (pos < elStartEnd) {
            pos = source.lastIndexOf("</" + tagName);
          }
          closeMap[tagName] = pos;
        }
        return pos < elStartEnd;
      }
      function _copy(source, target) {
        for (var n in source) {
          if (Object.prototype.hasOwnProperty.call(source, n)) {
            target[n] = source[n];
          }
        }
      }
      function parseDCC(source, start, domBuilder, errorHandler) {
        var next = source.charAt(start + 2);
        switch (next) {
          case "-":
            if (source.charAt(start + 3) === "-") {
              var end = source.indexOf("-->", start + 4);
              if (end > start) {
                domBuilder.comment(source, start + 4, end - start - 4);
                return end + 3;
              } else {
                errorHandler.error("Unclosed comment");
                return -1;
              }
            } else {
              return -1;
            }
          default:
            if (source.substr(start + 3, 6) == "CDATA[") {
              var end = source.indexOf("]]>", start + 9);
              domBuilder.startCDATA();
              domBuilder.characters(source, start + 9, end - start - 9);
              domBuilder.endCDATA();
              return end + 3;
            }
            var matchs = split(source, start);
            var len = matchs.length;
            if (len > 1 && /!doctype/i.test(matchs[0][0])) {
              var name = matchs[1][0];
              var pubid = false;
              var sysid = false;
              if (len > 3) {
                if (/^public$/i.test(matchs[2][0])) {
                  pubid = matchs[3][0];
                  sysid = len > 4 && matchs[4][0];
                } else if (/^system$/i.test(matchs[2][0])) {
                  sysid = matchs[3][0];
                }
              }
              var lastMatch = matchs[len - 1];
              domBuilder.startDTD(name, pubid, sysid);
              domBuilder.endDTD();
              return lastMatch.index + lastMatch[0].length;
            }
        }
        return -1;
      }
      function parseInstruction(source, start, domBuilder) {
        var end = source.indexOf("?>", start);
        if (end) {
          var match = source.substring(start, end).match(/^<\?(\S*)\s*([\s\S]*?)\s*$/);
          if (match) {
            var len = match[0].length;
            domBuilder.processingInstruction(match[1], match[2]);
            return end + 2;
          } else {
            return -1;
          }
        }
        return -1;
      }
      function ElementAttributes() {
        this.attributeNames = {};
      }
      ElementAttributes.prototype = {
        setTagName: function(tagName) {
          if (!tagNamePattern.test(tagName)) {
            throw new Error("invalid tagName:" + tagName);
          }
          this.tagName = tagName;
        },
        addValue: function(qName, value, offset) {
          if (!tagNamePattern.test(qName)) {
            throw new Error("invalid attribute:" + qName);
          }
          this.attributeNames[qName] = this.length;
          this[this.length++] = { qName, value, offset };
        },
        length: 0,
        getLocalName: function(i) {
          return this[i].localName;
        },
        getLocator: function(i) {
          return this[i].locator;
        },
        getQName: function(i) {
          return this[i].qName;
        },
        getURI: function(i) {
          return this[i].uri;
        },
        getValue: function(i) {
          return this[i].value;
        }
        //	,getIndex:function(uri, localName)){
        //		if(localName){
        //
        //		}else{
        //			var qName = uri
        //		}
        //	},
        //	getValue:function(){return this.getValue(this.getIndex.apply(this,arguments))},
        //	getType:function(uri,localName){}
        //	getType:function(i){},
      };
      function split(source, start) {
        var match;
        var buf = [];
        var reg = /'[^']+'|"[^"]+"|[^\s<>\/=]+=?|(\/?\s*>|<)/g;
        reg.lastIndex = start;
        reg.exec(source);
        while (match = reg.exec(source)) {
          buf.push(match);
          if (match[1]) return buf;
        }
      }
      exports.XMLReader = XMLReader;
      exports.ParseError = ParseError;
    }
  });

  // node_modules/@xmldom/xmldom/lib/dom-parser.js
  var require_dom_parser = __commonJS({
    "node_modules/@xmldom/xmldom/lib/dom-parser.js"(exports) {
      var conventions = require_conventions();
      var dom = require_dom();
      var entities = require_entities();
      var sax = require_sax();
      var DOMImplementation = dom.DOMImplementation;
      var NAMESPACE = conventions.NAMESPACE;
      var ParseError = sax.ParseError;
      var XMLReader = sax.XMLReader;
      function normalizeLineEndings(input) {
        return input.replace(/\r[\n\u0085]/g, "\n").replace(/[\r\u0085\u2028]/g, "\n");
      }
      function DOMParser3(options) {
        this.options = options || { locator: {} };
      }
      DOMParser3.prototype.parseFromString = function(source, mimeType) {
        var options = this.options;
        var sax2 = new XMLReader();
        var domBuilder = options.domBuilder || new DOMHandler();
        var errorHandler = options.errorHandler;
        var locator = options.locator;
        var defaultNSMap = options.xmlns || {};
        var isHTML = /\/x?html?$/.test(mimeType);
        var entityMap = isHTML ? entities.HTML_ENTITIES : entities.XML_ENTITIES;
        if (locator) {
          domBuilder.setDocumentLocator(locator);
        }
        sax2.errorHandler = buildErrorHandler(errorHandler, domBuilder, locator);
        sax2.domBuilder = options.domBuilder || domBuilder;
        if (isHTML) {
          defaultNSMap[""] = NAMESPACE.HTML;
        }
        defaultNSMap.xml = defaultNSMap.xml || NAMESPACE.XML;
        var normalize = options.normalizeLineEndings || normalizeLineEndings;
        if (source && typeof source === "string") {
          sax2.parse(
            normalize(source),
            defaultNSMap,
            entityMap
          );
        } else {
          sax2.errorHandler.error("invalid doc source");
        }
        return domBuilder.doc;
      };
      function buildErrorHandler(errorImpl, domBuilder, locator) {
        if (!errorImpl) {
          if (domBuilder instanceof DOMHandler) {
            return domBuilder;
          }
          errorImpl = domBuilder;
        }
        var errorHandler = {};
        var isCallback = errorImpl instanceof Function;
        locator = locator || {};
        function build(key) {
          var fn = errorImpl[key];
          if (!fn && isCallback) {
            fn = errorImpl.length == 2 ? function(msg) {
              errorImpl(key, msg);
            } : errorImpl;
          }
          errorHandler[key] = fn && function(msg) {
            fn("[xmldom " + key + "]	" + msg + _locator(locator));
          } || function() {
          };
        }
        build("warning");
        build("error");
        build("fatalError");
        return errorHandler;
      }
      function DOMHandler() {
        this.cdata = false;
      }
      function position(locator, node) {
        node.lineNumber = locator.lineNumber;
        node.columnNumber = locator.columnNumber;
      }
      DOMHandler.prototype = {
        startDocument: function() {
          this.doc = new DOMImplementation().createDocument(null, null, null);
          if (this.locator) {
            this.doc.documentURI = this.locator.systemId;
          }
        },
        startElement: function(namespaceURI, localName, qName, attrs) {
          var doc = this.doc;
          var el = doc.createElementNS(namespaceURI, qName || localName);
          var len = attrs.length;
          appendElement(this, el);
          this.currentElement = el;
          this.locator && position(this.locator, el);
          for (var i = 0; i < len; i++) {
            var namespaceURI = attrs.getURI(i);
            var value = attrs.getValue(i);
            var qName = attrs.getQName(i);
            var attr = doc.createAttributeNS(namespaceURI, qName);
            this.locator && position(attrs.getLocator(i), attr);
            attr.value = attr.nodeValue = value;
            el.setAttributeNode(attr);
          }
        },
        endElement: function(namespaceURI, localName, qName) {
          var current = this.currentElement;
          var tagName = current.tagName;
          this.currentElement = current.parentNode;
        },
        startPrefixMapping: function(prefix, uri) {
        },
        endPrefixMapping: function(prefix) {
        },
        processingInstruction: function(target, data) {
          var ins = this.doc.createProcessingInstruction(target, data);
          this.locator && position(this.locator, ins);
          appendElement(this, ins);
        },
        ignorableWhitespace: function(ch, start, length) {
        },
        characters: function(chars, start, length) {
          chars = _toString.apply(this, arguments);
          if (chars) {
            if (this.cdata) {
              var charNode = this.doc.createCDATASection(chars);
            } else {
              var charNode = this.doc.createTextNode(chars);
            }
            if (this.currentElement) {
              this.currentElement.appendChild(charNode);
            } else if (/^\s*$/.test(chars)) {
              this.doc.appendChild(charNode);
            }
            this.locator && position(this.locator, charNode);
          }
        },
        skippedEntity: function(name) {
        },
        endDocument: function() {
          this.doc.normalize();
        },
        setDocumentLocator: function(locator) {
          if (this.locator = locator) {
            locator.lineNumber = 0;
          }
        },
        //LexicalHandler
        comment: function(chars, start, length) {
          chars = _toString.apply(this, arguments);
          var comm = this.doc.createComment(chars);
          this.locator && position(this.locator, comm);
          appendElement(this, comm);
        },
        startCDATA: function() {
          this.cdata = true;
        },
        endCDATA: function() {
          this.cdata = false;
        },
        startDTD: function(name, publicId, systemId) {
          var impl = this.doc.implementation;
          if (impl && impl.createDocumentType) {
            var dt = impl.createDocumentType(name, publicId, systemId);
            this.locator && position(this.locator, dt);
            appendElement(this, dt);
            this.doc.doctype = dt;
          }
        },
        /**
         * @see org.xml.sax.ErrorHandler
         * @link http://www.saxproject.org/apidoc/org/xml/sax/ErrorHandler.html
         */
        warning: function(error) {
          console.warn("[xmldom warning]	" + error, _locator(this.locator));
        },
        error: function(error) {
          console.error("[xmldom error]	" + error, _locator(this.locator));
        },
        fatalError: function(error) {
          throw new ParseError(error, this.locator);
        }
      };
      function _locator(l) {
        if (l) {
          return "\n@" + (l.systemId || "") + "#[line:" + l.lineNumber + ",col:" + l.columnNumber + "]";
        }
      }
      function _toString(chars, start, length) {
        if (typeof chars == "string") {
          return chars.substr(start, length);
        } else {
          if (chars.length >= start + length || start) {
            return new java.lang.String(chars, start, length) + "";
          }
          return chars;
        }
      }
      "endDTD,startEntity,endEntity,attributeDecl,elementDecl,externalEntityDecl,internalEntityDecl,resolveEntity,getExternalSubset,notationDecl,unparsedEntityDecl".replace(/\w+/g, function(key) {
        DOMHandler.prototype[key] = function() {
          return null;
        };
      });
      function appendElement(hander, node) {
        if (!hander.currentElement) {
          hander.doc.appendChild(node);
        } else {
          hander.currentElement.appendChild(node);
        }
      }
      exports.__DOMHandler = DOMHandler;
      exports.normalizeLineEndings = normalizeLineEndings;
      exports.DOMParser = DOMParser3;
    }
  });

  // node_modules/@xmldom/xmldom/lib/index.js
  var require_lib = __commonJS({
    "node_modules/@xmldom/xmldom/lib/index.js"(exports) {
      var dom = require_dom();
      exports.DOMImplementation = dom.DOMImplementation;
      exports.XMLSerializer = dom.XMLSerializer;
      exports.DOMParser = require_dom_parser().DOMParser;
    }
  });

  // yjs-shim:yjs
  var Y = window.Y;
  var Doc = Y.Doc;
  var Map2 = Y.Map;
  var Array2 = Y.Array;
  var Text = Y.Text;
  var XmlFragment = Y.XmlFragment;
  var XmlElement = Y.XmlElement;
  var XmlText = Y.XmlText;
  var createAbsolutePositionFromRelativePosition = Y.createAbsolutePositionFromRelativePosition;
  var createRelativePositionFromTypeIndex = Y.createRelativePositionFromTypeIndex;
  var encodeStateAsUpdate = Y.encodeStateAsUpdate;
  var applyUpdate = Y.applyUpdate;

  // node_modules/fflate/esm/browser.js
  var u8 = Uint8Array;
  var u16 = Uint16Array;
  var i32 = Int32Array;
  var fleb = new u8([
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    1,
    1,
    2,
    2,
    2,
    2,
    3,
    3,
    3,
    3,
    4,
    4,
    4,
    4,
    5,
    5,
    5,
    5,
    0,
    /* unused */
    0,
    0,
    /* impossible */
    0
  ]);
  var fdeb = new u8([
    0,
    0,
    0,
    0,
    1,
    1,
    2,
    2,
    3,
    3,
    4,
    4,
    5,
    5,
    6,
    6,
    7,
    7,
    8,
    8,
    9,
    9,
    10,
    10,
    11,
    11,
    12,
    12,
    13,
    13,
    /* unused */
    0,
    0
  ]);
  var clim = new u8([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]);
  var freb = function(eb, start) {
    var b = new u16(31);
    for (var i = 0; i < 31; ++i) {
      b[i] = start += 1 << eb[i - 1];
    }
    var r = new i32(b[30]);
    for (var i = 1; i < 30; ++i) {
      for (var j = b[i]; j < b[i + 1]; ++j) {
        r[j] = j - b[i] << 5 | i;
      }
    }
    return { b, r };
  };
  var _a = freb(fleb, 2);
  var fl = _a.b;
  var revfl = _a.r;
  fl[28] = 258, revfl[258] = 28;
  var _b = freb(fdeb, 0);
  var fd = _b.b;
  var revfd = _b.r;
  var rev = new u16(32768);
  for (i = 0; i < 32768; ++i) {
    x = (i & 43690) >> 1 | (i & 21845) << 1;
    x = (x & 52428) >> 2 | (x & 13107) << 2;
    x = (x & 61680) >> 4 | (x & 3855) << 4;
    rev[i] = ((x & 65280) >> 8 | (x & 255) << 8) >> 1;
  }
  var x;
  var i;
  var hMap = (function(cd, mb, r) {
    var s = cd.length;
    var i = 0;
    var l = new u16(mb);
    for (; i < s; ++i) {
      if (cd[i])
        ++l[cd[i] - 1];
    }
    var le = new u16(mb);
    for (i = 1; i < mb; ++i) {
      le[i] = le[i - 1] + l[i - 1] << 1;
    }
    var co;
    if (r) {
      co = new u16(1 << mb);
      var rvb = 15 - mb;
      for (i = 0; i < s; ++i) {
        if (cd[i]) {
          var sv = i << 4 | cd[i];
          var r_1 = mb - cd[i];
          var v = le[cd[i] - 1]++ << r_1;
          for (var m = v | (1 << r_1) - 1; v <= m; ++v) {
            co[rev[v] >> rvb] = sv;
          }
        }
      }
    } else {
      co = new u16(s);
      for (i = 0; i < s; ++i) {
        if (cd[i]) {
          co[i] = rev[le[cd[i] - 1]++] >> 15 - cd[i];
        }
      }
    }
    return co;
  });
  var flt = new u8(288);
  for (i = 0; i < 144; ++i)
    flt[i] = 8;
  var i;
  for (i = 144; i < 256; ++i)
    flt[i] = 9;
  var i;
  for (i = 256; i < 280; ++i)
    flt[i] = 7;
  var i;
  for (i = 280; i < 288; ++i)
    flt[i] = 8;
  var i;
  var fdt = new u8(32);
  for (i = 0; i < 32; ++i)
    fdt[i] = 5;
  var i;
  var flrm = /* @__PURE__ */ hMap(flt, 9, 1);
  var fdrm = /* @__PURE__ */ hMap(fdt, 5, 1);
  var max = function(a) {
    var m = a[0];
    for (var i = 1; i < a.length; ++i) {
      if (a[i] > m)
        m = a[i];
    }
    return m;
  };
  var bits = function(d, p, m) {
    var o = p / 8 | 0;
    return (d[o] | d[o + 1] << 8) >> (p & 7) & m;
  };
  var bits16 = function(d, p) {
    var o = p / 8 | 0;
    return (d[o] | d[o + 1] << 8 | d[o + 2] << 16) >> (p & 7);
  };
  var shft = function(p) {
    return (p + 7) / 8 | 0;
  };
  var slc = function(v, s, e) {
    if (s == null || s < 0)
      s = 0;
    if (e == null || e > v.length)
      e = v.length;
    return new u8(v.subarray(s, e));
  };
  var ec = [
    "unexpected EOF",
    "invalid block type",
    "invalid length/literal",
    "invalid distance",
    "stream finished",
    "no stream handler",
    ,
    "no callback",
    "invalid UTF-8 data",
    "extra field too long",
    "date not in range 1980-2099",
    "filename too long",
    "stream finishing",
    "invalid zip data"
    // determined by unknown compression method
  ];
  var err = function(ind, msg, nt) {
    var e = new Error(msg || ec[ind]);
    e.code = ind;
    if (Error.captureStackTrace)
      Error.captureStackTrace(e, err);
    if (!nt)
      throw e;
    return e;
  };
  var inflt = function(dat, st, buf, dict) {
    var sl = dat.length, dl = dict ? dict.length : 0;
    if (!sl || st.f && !st.l)
      return buf || new u8(0);
    var noBuf = !buf;
    var resize = noBuf || st.i != 2;
    var noSt = st.i;
    if (noBuf)
      buf = new u8(sl * 3);
    var cbuf = function(l2) {
      var bl = buf.length;
      if (l2 > bl) {
        var nbuf = new u8(Math.max(bl * 2, l2));
        nbuf.set(buf);
        buf = nbuf;
      }
    };
    var final = st.f || 0, pos = st.p || 0, bt = st.b || 0, lm = st.l, dm = st.d, lbt = st.m, dbt = st.n;
    var tbts = sl * 8;
    do {
      if (!lm) {
        final = bits(dat, pos, 1);
        var type = bits(dat, pos + 1, 3);
        pos += 3;
        if (!type) {
          var s = shft(pos) + 4, l = dat[s - 4] | dat[s - 3] << 8, t = s + l;
          if (t > sl) {
            if (noSt)
              err(0);
            break;
          }
          if (resize)
            cbuf(bt + l);
          buf.set(dat.subarray(s, t), bt);
          st.b = bt += l, st.p = pos = t * 8, st.f = final;
          continue;
        } else if (type == 1)
          lm = flrm, dm = fdrm, lbt = 9, dbt = 5;
        else if (type == 2) {
          var hLit = bits(dat, pos, 31) + 257, hcLen = bits(dat, pos + 10, 15) + 4;
          var tl = hLit + bits(dat, pos + 5, 31) + 1;
          pos += 14;
          var ldt = new u8(tl);
          var clt = new u8(19);
          for (var i = 0; i < hcLen; ++i) {
            clt[clim[i]] = bits(dat, pos + i * 3, 7);
          }
          pos += hcLen * 3;
          var clb = max(clt), clbmsk = (1 << clb) - 1;
          var clm = hMap(clt, clb, 1);
          for (var i = 0; i < tl; ) {
            var r = clm[bits(dat, pos, clbmsk)];
            pos += r & 15;
            var s = r >> 4;
            if (s < 16) {
              ldt[i++] = s;
            } else {
              var c = 0, n = 0;
              if (s == 16)
                n = 3 + bits(dat, pos, 3), pos += 2, c = ldt[i - 1];
              else if (s == 17)
                n = 3 + bits(dat, pos, 7), pos += 3;
              else if (s == 18)
                n = 11 + bits(dat, pos, 127), pos += 7;
              while (n--)
                ldt[i++] = c;
            }
          }
          var lt = ldt.subarray(0, hLit), dt = ldt.subarray(hLit);
          lbt = max(lt);
          dbt = max(dt);
          lm = hMap(lt, lbt, 1);
          dm = hMap(dt, dbt, 1);
        } else
          err(1);
        if (pos > tbts) {
          if (noSt)
            err(0);
          break;
        }
      }
      if (resize)
        cbuf(bt + 131072);
      var lms = (1 << lbt) - 1, dms = (1 << dbt) - 1;
      var lpos = pos;
      for (; ; lpos = pos) {
        var c = lm[bits16(dat, pos) & lms], sym = c >> 4;
        pos += c & 15;
        if (pos > tbts) {
          if (noSt)
            err(0);
          break;
        }
        if (!c)
          err(2);
        if (sym < 256)
          buf[bt++] = sym;
        else if (sym == 256) {
          lpos = pos, lm = null;
          break;
        } else {
          var add = sym - 254;
          if (sym > 264) {
            var i = sym - 257, b = fleb[i];
            add = bits(dat, pos, (1 << b) - 1) + fl[i];
            pos += b;
          }
          var d = dm[bits16(dat, pos) & dms], dsym = d >> 4;
          if (!d)
            err(3);
          pos += d & 15;
          var dt = fd[dsym];
          if (dsym > 3) {
            var b = fdeb[dsym];
            dt += bits16(dat, pos) & (1 << b) - 1, pos += b;
          }
          if (pos > tbts) {
            if (noSt)
              err(0);
            break;
          }
          if (resize)
            cbuf(bt + 131072);
          var end = bt + add;
          if (bt < dt) {
            var shift = dl - dt, dend = Math.min(dt, end);
            if (shift + bt < 0)
              err(3);
            for (; bt < dend; ++bt)
              buf[bt] = dict[shift + bt];
          }
          for (; bt < end; ++bt)
            buf[bt] = buf[bt - dt];
        }
      }
      st.l = lm, st.p = lpos, st.b = bt, st.f = final;
      if (lm)
        final = 1, st.m = lbt, st.d = dm, st.n = dbt;
    } while (!final);
    return bt != buf.length && noBuf ? slc(buf, 0, bt) : buf.subarray(0, bt);
  };
  var et = /* @__PURE__ */ new u8(0);
  var b2 = function(d, b) {
    return d[b] | d[b + 1] << 8;
  };
  var b4 = function(d, b) {
    return (d[b] | d[b + 1] << 8 | d[b + 2] << 16 | d[b + 3] << 24) >>> 0;
  };
  var b8 = function(d, b) {
    return b4(d, b) + b4(d, b + 4) * 4294967296;
  };
  function inflateSync(data, opts) {
    return inflt(data, { i: 2 }, opts && opts.out, opts && opts.dictionary);
  }
  var td = typeof TextDecoder != "undefined" && /* @__PURE__ */ new TextDecoder();
  var tds = 0;
  try {
    td.decode(et, { stream: true });
    tds = 1;
  } catch (e) {
  }
  var dutf8 = function(d) {
    for (var r = "", i = 0; ; ) {
      var c = d[i++];
      var eb = (c > 127) + (c > 223) + (c > 239);
      if (i + eb > d.length)
        return { s: r, r: slc(d, i - 1) };
      if (!eb)
        r += String.fromCharCode(c);
      else if (eb == 3) {
        c = ((c & 15) << 18 | (d[i++] & 63) << 12 | (d[i++] & 63) << 6 | d[i++] & 63) - 65536, r += String.fromCharCode(55296 | c >> 10, 56320 | c & 1023);
      } else if (eb & 1)
        r += String.fromCharCode((c & 31) << 6 | d[i++] & 63);
      else
        r += String.fromCharCode((c & 15) << 12 | (d[i++] & 63) << 6 | d[i++] & 63);
    }
  };
  function strFromU8(dat, latin1) {
    if (latin1) {
      var r = "";
      for (var i = 0; i < dat.length; i += 16384)
        r += String.fromCharCode.apply(null, dat.subarray(i, i + 16384));
      return r;
    } else if (td) {
      return td.decode(dat);
    } else {
      var _a2 = dutf8(dat), s = _a2.s, r = _a2.r;
      if (r.length)
        err(8);
      return s;
    }
  }
  var slzh = function(d, b) {
    return b + 30 + b2(d, b + 26) + b2(d, b + 28);
  };
  var zh = function(d, b, z) {
    var fnl = b2(d, b + 28), fn = strFromU8(d.subarray(b + 46, b + 46 + fnl), !(b2(d, b + 8) & 2048)), es = b + 46 + fnl, bs = b4(d, b + 20);
    var _a2 = z && bs == 4294967295 ? z64e(d, es) : [bs, b4(d, b + 24), b4(d, b + 42)], sc = _a2[0], su = _a2[1], off = _a2[2];
    return [b2(d, b + 10), sc, su, fn, es + b2(d, b + 30) + b2(d, b + 32), off];
  };
  var z64e = function(d, b) {
    for (; b2(d, b) != 1; b += 4 + b2(d, b + 2))
      ;
    return [b8(d, b + 12), b8(d, b + 4), b8(d, b + 20)];
  };
  function unzipSync(data, opts) {
    var files = {};
    var e = data.length - 22;
    for (; b4(data, e) != 101010256; --e) {
      if (!e || data.length - e > 65558)
        err(13);
    }
    ;
    var c = b2(data, e + 8);
    if (!c)
      return {};
    var o = b4(data, e + 16);
    var z = o == 4294967295 || c == 65535;
    if (z) {
      var ze = b4(data, e - 12);
      z = b4(data, ze) == 101075792;
      if (z) {
        c = b4(data, ze + 32);
        o = b4(data, ze + 48);
      }
    }
    var fltr = opts && opts.filter;
    for (var i = 0; i < c; ++i) {
      var _a2 = zh(data, o, z), c_2 = _a2[0], sc = _a2[1], su = _a2[2], fn = _a2[3], no = _a2[4], off = _a2[5], b = slzh(data, off);
      o = no;
      if (!fltr || fltr({
        name: fn,
        size: sc,
        originalSize: su,
        compression: c_2
      })) {
        if (!c_2)
          files[fn] = slc(data, b, b + sc);
        else if (c_2 == 8)
          files[fn] = inflateSync(data.subarray(b, b + sc), { out: new u8(su) });
        else
          err(14, "unknown compression type " + c_2);
      }
    }
    return files;
  }

  // src/shared/import/ElpxImporter.ts
  var import_xmldom2 = __toESM(require_lib());

  // src/shared/import/interfaces.ts
  var defaultLogger = {
    log: (...args) => {
      if (process.env.DEBUG === "1" || false) {
        console.log(...args);
      }
    },
    warn: (...args) => console.warn(...args),
    error: (...args) => console.error(...args)
  };
  var BLOCK_PROPERTY_DEFAULTS = {
    visibility: "true",
    teacherOnly: "false",
    allowToggle: "true",
    minimized: "false",
    identifier: "",
    cssClass: ""
  };
  var COMPONENT_PROPERTY_DEFAULTS = {
    visibility: "true",
    teacherOnly: "false",
    identifier: "",
    cssClass: ""
  };
  var PAGE_PROPERTY_DEFAULTS = {
    visibility: "true",
    highlight: "false",
    hidePageTitle: "false",
    editableInPage: "false",
    titlePage: "",
    titleNode: ""
  };
  var LEGACY_TYPE_ALIASES = {
    "download-package": "download-source-file"
  };
  var FEEDBACK_TRANSLATIONS = {
    es: "Mostrar retroalimentaci\xF3n",
    en: "Show Feedback",
    ca: "Mostra la retroalimentaci\xF3",
    eu: "Erakutsi feedbacka",
    gl: "Mostrar retroalimentaci\xF3n",
    pt: "Mostrar feedback",
    fr: "Afficher le feedback",
    de: "Feedback anzeigen",
    it: "Mostra feedback",
    nl: "Toon feedback",
    pl: "Poka\u017C informacj\u0119 zwrotn\u0105",
    ru: "\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u043E\u0442\u0437\u044B\u0432",
    zh: "\u663E\u793A\u53CD\u9988",
    ja: "\u30D5\u30A3\u30FC\u30C9\u30D0\u30C3\u30AF\u3092\u8868\u793A",
    ar: "\u0625\u0638\u0647\u0627\u0631 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A"
  };

  // src/shared/import/LegacyXmlParser.ts
  var import_xmldom = __toESM(require_lib());

  // src/shared/import/legacy-handlers/BaseLegacyHandler.ts
  var BaseLegacyHandler = class {
    /**
     * Extract iDevice-specific properties from the dictionary
     * Default implementation returns empty object
     *
     * @param dict - Dictionary element of the iDevice
     * @param _ideviceId - Generated iDevice ID
     * @returns Properties object
     */
    extractProperties(dict, _ideviceId) {
      void dict;
      return {};
    }
    /**
     * Extract HTML content from the dictionary
     * Default implementation returns empty string
     *
     * @param dict - Dictionary element from legacy XML
     * @param _context - Context with language info
     * @returns HTML content
     */
    extractHtmlView(dict, _context) {
      void dict;
      return "";
    }
    /**
     * Extract feedback content from the dictionary
     * Default implementation returns empty content
     *
     * @param dict - Dictionary element from legacy XML
     * @param _context - Context with language info
     * @returns Feedback info
     */
    extractFeedback(dict, _context) {
      void dict;
      return { content: "", buttonCaption: "" };
    }
    // ========================================
    // Localization Utilities
    // ========================================
    /**
     * Get localized "Show Feedback" text based on language code
     * Uses static translations instead of UI locale for legacy imports
     *
     * @param langCode - Language code (e.g., 'es', 'en', 'ca')
     * @returns Localized feedback button text
     */
    getLocalizedFeedbackText(langCode) {
      const lang = (langCode || "").split("-")[0].toLowerCase();
      return FEEDBACK_TRANSLATIONS[lang] || FEEDBACK_TRANSLATIONS.es;
    }
    // ========================================
    // XML Dictionary Parsing Utilities
    // ========================================
    /**
     * Get child elements of an element (filters out text nodes)
     *
     * @param element - Parent element
     * @returns Array of child elements
     */
    getChildElements(element) {
      const result = [];
      const children = element.childNodes;
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        if (child.nodeType === 1) {
          result.push(child);
        }
      }
      return result;
    }
    /**
     * Find a string value in dictionary by key
     *
     * @param dict - Dictionary element
     * @param key - Key to find
     * @returns Value or null
     */
    findDictStringValue(dict, key) {
      const children = this.getChildElements(dict);
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        if (child.tagName === "string" && child.getAttribute("role") === "key" && child.getAttribute("value") === key) {
          const valueEl = children[i + 1];
          if (valueEl && (valueEl.tagName === "string" || valueEl.tagName === "unicode")) {
            return valueEl.getAttribute("value") || valueEl.textContent || null;
          }
        }
      }
      return null;
    }
    /**
     * Find a list element in dictionary by key
     *
     * @param dict - Dictionary element
     * @param key - Key to find
     * @returns List element or null
     */
    findDictList(dict, key) {
      const children = this.getChildElements(dict);
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        if (child.tagName === "string" && child.getAttribute("role") === "key" && child.getAttribute("value") === key) {
          const valueEl = children[i + 1];
          if (valueEl && valueEl.tagName === "list") {
            return valueEl;
          }
        }
      }
      return null;
    }
    /**
     * Find an instance element in dictionary by key
     *
     * @param dict - Dictionary element
     * @param key - Key to find
     * @returns Instance element or null
     */
    findDictInstance(dict, key) {
      const children = this.getChildElements(dict);
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        if (child.tagName === "string" && child.getAttribute("role") === "key" && child.getAttribute("value") === key) {
          const valueEl = children[i + 1];
          if (valueEl && valueEl.tagName === "instance") {
            return valueEl;
          }
        }
      }
      return null;
    }
    /**
     * Find a boolean value in dictionary by key
     *
     * @param dict - Dictionary element
     * @param key - Key to find
     * @returns Boolean value (false if not found)
     */
    findDictBoolValue(dict, key) {
      const children = this.getChildElements(dict);
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        if (child.tagName === "string" && child.getAttribute("role") === "key" && child.getAttribute("value") === key) {
          const valueEl = children[i + 1];
          if (valueEl && valueEl.tagName === "bool") {
            return valueEl.getAttribute("value") === "1";
          }
        }
      }
      return false;
    }
    /**
     * Find an integer value in dictionary by key
     *
     * @param dict - Dictionary element
     * @param key - Key to find
     * @returns Integer value or null
     */
    findDictIntValue(dict, key) {
      const children = this.getChildElements(dict);
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        if (child.tagName === "string" && child.getAttribute("role") === "key" && child.getAttribute("value") === key) {
          const valueEl = children[i + 1];
          if (valueEl && valueEl.tagName === "int") {
            const value = valueEl.getAttribute("value");
            return value !== null ? parseInt(value, 10) : null;
          }
        }
      }
      return null;
    }
    // ========================================
    // Field Content Extraction
    // ========================================
    /**
     * Get direct child element by tag name (xmldom-compatible)
     * @param parent - Parent element
     * @param tagName - Tag name to search for
     * @returns First matching child element or null
     */
    getDirectChildByTagName(parent, tagName) {
      const children = this.getChildElements(parent);
      return children.find((el) => el.tagName === tagName) || null;
    }
    /**
     * Get all direct child elements by tag name (xmldom-compatible)
     * @param parent - Parent element
     * @param tagName - Tag name to search for
     * @returns Array of matching child elements
     */
    getDirectChildrenByTagName(parent, tagName) {
      const children = this.getChildElements(parent);
      return children.filter((el) => el.tagName === tagName);
    }
    /**
     * Find elements by class name containing a substring (xmldom-compatible)
     * @param parent - Parent element
     * @param tagName - Tag name to search for
     * @param classSubstring - Substring that must be in the class attribute
     * @returns Array of matching elements
     */
    getElementsByClassContains(parent, tagName, classSubstring) {
      const elements = [];
      const allElements = parent.getElementsByTagName(tagName);
      for (let i = 0; i < allElements.length; i++) {
        const el = allElements[i];
        const className = el.getAttribute("class") || "";
        if (className.includes(classSubstring)) {
          elements.push(el);
        }
      }
      return elements;
    }
    /**
     * Extract content from a TextAreaField instance
     *
     * @param fieldInst - TextAreaField instance element
     * @returns HTML content
     */
    extractTextAreaFieldContent(fieldInst) {
      if (!fieldInst) return "";
      const dict = this.getDirectChildByTagName(fieldInst, "dictionary");
      if (!dict) return "";
      const children = this.getChildElements(dict);
      const contentKeys = ["content_w_resourcePaths", "_content", "content"];
      for (const targetKey of contentKeys) {
        for (let i = 0; i < children.length; i++) {
          const child = children[i];
          if (child.tagName === "string" && child.getAttribute("role") === "key" && child.getAttribute("value") === targetKey) {
            const valueEl = children[i + 1];
            if (valueEl && valueEl.tagName === "unicode") {
              const value = valueEl.getAttribute("value") || valueEl.textContent || "";
              if (value.trim()) {
                return this.decodeHtmlContent(value);
              }
            }
          }
        }
      }
      return "";
    }
    /**
     * Extract content from a FeedbackField instance
     *
     * @param fieldInst - FeedbackField instance element
     * @returns Feedback content and button caption
     */
    extractFeedbackFieldContent(fieldInst) {
      if (!fieldInst) return { content: "", buttonCaption: "" };
      const dict = this.getDirectChildByTagName(fieldInst, "dictionary");
      if (!dict) return { content: "", buttonCaption: "" };
      const children = this.getChildElements(dict);
      let content = "";
      let buttonCaption = "";
      const contentKeys = ["feedback", "content_w_resourcePaths", "_content", "content"];
      for (const targetKey of contentKeys) {
        if (content) break;
        for (let i = 0; i < children.length; i++) {
          const child = children[i];
          if (child.tagName === "string" && child.getAttribute("role") === "key" && child.getAttribute("value") === targetKey) {
            const valueEl = children[i + 1];
            if (valueEl && valueEl.tagName === "unicode") {
              const value = valueEl.getAttribute("value") || valueEl.textContent || "";
              if (value.trim()) {
                content = this.decodeHtmlContent(value);
                break;
              }
            }
          }
        }
      }
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        if (child.tagName === "string" && child.getAttribute("role") === "key" && child.getAttribute("value") === "_buttonCaption") {
          const valueEl = children[i + 1];
          if (valueEl && (valueEl.tagName === "unicode" || valueEl.tagName === "string")) {
            buttonCaption = valueEl.getAttribute("value") || valueEl.textContent || "";
            break;
          }
        }
      }
      return {
        content,
        buttonCaption: buttonCaption || "Show Feedback"
      };
    }
    // ========================================
    // Content Decoding & Transformation
    // ========================================
    /**
     * Decode HTML content from legacy XML format
     *
     * @param content - Encoded HTML content
     * @returns Decoded HTML
     */
    decodeHtmlContent(content) {
      if (!content) return "";
      const decoded = content.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/\\n/g, "\n").replace(/\\t/g, "	").replace(/\\r(?![a-zA-Z])/g, "\r");
      return decoded;
    }
    /**
     * Strip HTML tags from content, returning plain text.
     * Matches Symfony's strip_tags() behavior for legacy imports.
     *
     * Uses regex instead of DOM parsing to work in both browser and Node.js.
     *
     * @param html - HTML content to strip
     * @returns Plain text content
     */
    stripHtmlTags(html) {
      if (!html) return "";
      const text = html.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "").replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "").replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/\s+/g, " ");
      return text.trim();
    }
    /**
     * Escape HTML special characters for attribute values
     *
     * @param str - String to escape
     * @returns Escaped string safe for HTML attributes
     */
    escapeHtmlAttr(str) {
      if (!str) return "";
      return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
    }
    /**
     * Escape HTML entities for safe insertion
     *
     * @param str - String to escape
     * @returns Escaped string
     */
    escapeHtml(str) {
      if (!str) return "";
      return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
    }
    // ========================================
    // Common Field Extraction Patterns
    // ========================================
    /**
     * Extract content from "fields" list (JsIdevice format)
     *
     * @param dict - Dictionary element
     * @returns Combined content from text fields
     */
    extractFieldsContent(dict) {
      const children = this.getChildElements(dict);
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        if (child.tagName === "string" && child.getAttribute("role") === "key" && child.getAttribute("value") === "fields") {
          const listEl = children[i + 1];
          if (listEl && listEl.tagName === "list") {
            const contents = [];
            const fieldInstances = this.getDirectChildrenByTagName(listEl, "instance");
            for (const fieldInst of fieldInstances) {
              const fieldClass = fieldInst.getAttribute("class") || "";
              if (fieldClass.includes("TextAreaField") || fieldClass.includes("TextField")) {
                const content = this.extractTextAreaFieldContent(fieldInst);
                if (content) {
                  contents.push(content);
                }
              }
            }
            return contents.join("\n");
          }
          break;
        }
      }
      return "";
    }
    /**
     * Extract rich text content from a dictionary field
     *
     * @param dict - Dictionary element
     * @param fieldName - Field name to look for
     * @returns Content or empty string
     */
    extractRichTextContent(dict, fieldName) {
      const children = this.getChildElements(dict);
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        if (child.tagName === "string" && child.getAttribute("role") === "key" && child.getAttribute("value") === fieldName) {
          const valueEl = children[i + 1];
          if (!valueEl) return "";
          if (valueEl.tagName === "unicode" || valueEl.tagName === "string") {
            return this.decodeHtmlContent(valueEl.getAttribute("value") || valueEl.textContent || "");
          }
          if (valueEl.tagName === "instance") {
            return this.extractTextAreaFieldContent(valueEl);
          }
        }
      }
      return "";
    }
    /**
     * Extract content from any TextAreaField or TextField in the dictionary
     *
     * @param dict - Dictionary element
     * @returns Content or empty string
     */
    extractAnyTextFieldContent(dict) {
      const instances = this.getDirectChildrenByTagName(dict, "instance");
      for (const inst of instances) {
        const className = inst.getAttribute("class") || "";
        if (className.includes("TextAreaField") || className.includes("TextField")) {
          const content = this.extractTextAreaFieldContent(inst);
          if (content) {
            return content;
          }
        }
      }
      const nestedInstances = dict.getElementsByTagName("instance");
      for (let i = 0; i < nestedInstances.length; i++) {
        const inst = nestedInstances[i];
        const className = inst.getAttribute("class") || "";
        if (className.includes("TextAreaField") || className.includes("TextField")) {
          const content = this.extractTextAreaFieldContent(inst);
          if (content) {
            return content;
          }
        }
      }
      return "";
    }
    /**
     * Extract resource path from dictionary
     * Used for extracting file paths from resource instances
     *
     * @param dict - Dictionary element
     * @param key - Key name
     * @returns Resource path or null
     */
    extractResourcePath(dict, key) {
      const resourceInst = this.findDictInstance(dict, key);
      if (!resourceInst) return null;
      const resourceDict = this.getDirectChildByTagName(resourceInst, "dictionary");
      if (!resourceDict) return null;
      const storageName = this.findDictStringValue(resourceDict, "_storageName") || this.findDictStringValue(resourceDict, "storageName") || this.findDictStringValue(resourceDict, "_fileName") || this.findDictStringValue(resourceDict, "fileName");
      return storageName || null;
    }
  };

  // src/shared/import/legacy-handlers/DefaultHandler.ts
  var DefaultHandler = class extends BaseLegacyHandler {
    /**
     * Always matches (fallback handler)
     */
    canHandle(_className, _ideviceType) {
      return true;
    }
    /**
     * Default to 'text' iDevice for unknown types
     */
    getTargetType() {
      return "text";
    }
    /**
     * Try to extract HTML content from various common fields
     */
    extractHtmlView(dict, _context) {
      if (!dict) return "";
      const fieldsResult = this.extractFieldsContent(dict);
      if (fieldsResult) {
        return fieldsResult;
      }
      const contentFields = ["content", "_content", "_html", "htmlView", "story", "_story", "text", "_text"];
      for (const field of contentFields) {
        const content = this.extractRichTextContent(dict, field);
        if (content) {
          return content;
        }
      }
      return this.extractAnyTextFieldContent(dict);
    }
    /**
     * Try to extract feedback content
     *
     * @param dict - Dictionary element
     * @param context - Context with language info
     */
    extractFeedback(dict, context) {
      if (!dict) return { content: "", buttonCaption: "" };
      const answerTextArea = this.findDictInstance(dict, "answerTextArea");
      if (answerTextArea) {
        const content = this.extractTextAreaFieldContent(answerTextArea);
        if (content) {
          return {
            content,
            buttonCaption: this.getLocalizedFeedbackText(context?.language)
          };
        }
      }
      return { content: "", buttonCaption: "" };
    }
  };

  // src/shared/import/legacy-handlers/FreeTextHandler.ts
  var FreeTextHandler = class extends BaseLegacyHandler {
    /**
     * Check if this handler can process the given legacy class
     */
    canHandle(className, _ideviceType) {
      return className.includes("FreeTextIdevice") || className.includes("FreeTextfpdIdevice") || className.includes("ReflectionIdevice") || className.includes("ReflectionfpdIdevice") || className.includes("GenericIdevice");
    }
    /**
     * Get the target modern iDevice type
     */
    getTargetType() {
      return "text";
    }
    /**
     * Extract HTML content from the legacy format
     * Also renders feedback button and content directly into htmlView (matching Symfony behavior)
     * Wraps content in exe-text-activity structure for proper editor/export handling
     *
     * @param dict - Dictionary element from legacy XML
     * @param context - Context with language info
     */
    extractHtmlView(dict, context) {
      if (!dict) return "";
      let content = "";
      const activityTextArea = this.findDictInstance(dict, "activityTextArea");
      if (activityTextArea) {
        content = this.extractTextAreaFieldContent(activityTextArea);
      }
      if (!content) {
        const contentTextArea = this.findDictInstance(dict, "content");
        if (contentTextArea) {
          content = this.extractTextAreaFieldContent(contentTextArea);
        }
      }
      if (!content) {
        const fieldsContent = this.extractFieldsContent(dict);
        if (fieldsContent) {
          content = fieldsContent;
        }
      }
      if (!content) {
        const instances = this.getDirectChildrenByTagName(dict, "instance");
        for (const inst of instances) {
          const className = inst.getAttribute("class") || "";
          if (className.includes("TextAreaField")) {
            content = this.extractTextAreaFieldContent(inst);
            if (content) break;
          }
        }
      }
      const feedback = this.extractFeedback(dict, context);
      if (feedback.content) {
        const escapedCaption = this.escapeHtmlAttr(feedback.buttonCaption);
        let rebuiltHtmlView = content;
        rebuiltHtmlView += '<div class="iDevice_buttons feedback-button js-required">';
        rebuiltHtmlView += `<input type="button" class="feedbacktooglebutton" value="${escapedCaption}" `;
        rebuiltHtmlView += `data-text-a="${escapedCaption}" data-text-b="${escapedCaption}">`;
        rebuiltHtmlView += "</div>";
        rebuiltHtmlView += `<div class="feedback js-feedback js-hidden" style="display: none;">${feedback.content}</div>`;
        return `<div class="exe-text-activity">${rebuiltHtmlView}</div>`;
      }
      return content;
    }
    /**
     * Extract feedback content (for Reflection iDevices and GenericIdevice with FeedbackField)
     *
     * @param dict - Dictionary element
     * @param context - Context with language info
     */
    extractFeedback(dict, context) {
      if (!dict) return { content: "", buttonCaption: "" };
      const defaultCaption = this.getLocalizedFeedbackText(context?.language);
      const answerTextArea = this.findDictInstance(dict, "answerTextArea");
      if (answerTextArea) {
        const answerDict = this.getDirectChildByTagName(answerTextArea, "dictionary");
        if (answerDict) {
          const content = this.extractTextAreaFieldContent(answerTextArea);
          const storedCaption = this.findDictStringValue(answerDict, "buttonCaption");
          const buttonCaption = storedCaption || defaultCaption;
          if (content) {
            return { content, buttonCaption };
          }
        }
      }
      const feedbackTextArea = this.findDictInstance(dict, "feedbackTextArea");
      if (feedbackTextArea) {
        const feedbackDict = this.getDirectChildByTagName(feedbackTextArea, "dictionary");
        let buttonCaption = defaultCaption;
        if (feedbackDict) {
          const storedCaption = this.findDictStringValue(feedbackDict, "buttonCaption");
          buttonCaption = storedCaption || defaultCaption;
        }
        const content = this.extractTextAreaFieldContent(feedbackTextArea);
        if (content) {
          return { content, buttonCaption };
        }
      }
      const feedbackFromFields = this.extractFeedbackFromFieldsList(dict, context);
      if (feedbackFromFields.content) {
        return feedbackFromFields;
      }
      return { content: "", buttonCaption: "" };
    }
    /**
     * Extract feedback from FeedbackField inside "fields" list
     * Used by GenericIdevice (Reading Activity, etc.)
     *
     * @param dict - Dictionary element
     * @param context - Context with language info
     */
    extractFeedbackFromFieldsList(dict, context) {
      const defaultCaption = this.getLocalizedFeedbackText(context?.language);
      const children = this.getChildElements(dict);
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        if (child.tagName === "string" && child.getAttribute("role") === "key" && child.getAttribute("value") === "fields") {
          const listEl = children[i + 1];
          if (listEl && listEl.tagName === "list") {
            const fieldInstances = this.getDirectChildrenByTagName(listEl, "instance");
            for (const fieldInst of fieldInstances) {
              const fieldClass = fieldInst.getAttribute("class") || "";
              if (fieldClass.includes("FeedbackField")) {
                const fieldDict = this.getDirectChildByTagName(fieldInst, "dictionary");
                if (fieldDict) {
                  const storedCaption = this.findDictStringValue(fieldDict, "_buttonCaption");
                  const buttonCaption = storedCaption || defaultCaption;
                  let content = this.findDictStringValue(fieldDict, "feedback");
                  if (!content) {
                    content = this.findDictStringValue(fieldDict, "content_w_resourcePaths");
                  }
                  if (content) {
                    content = this.decodeHtmlContent(content);
                    return { content, buttonCaption };
                  }
                }
              }
            }
          }
          break;
        }
      }
      return { content: "", buttonCaption: "" };
    }
    /**
     * Extract properties for text iDevice
     */
    extractProperties(dict, _ideviceId) {
      const feedback = this.extractFeedback(dict);
      if (feedback.content) {
        return {
          textFeedbackTextarea: feedback.content,
          textFeedbackInput: feedback.buttonCaption
        };
      }
      return {};
    }
  };

  // src/shared/import/legacy-handlers/MultichoiceHandler.ts
  var MultichoiceHandler = class extends BaseLegacyHandler {
    constructor() {
      super(...arguments);
      // Track the iDevice class to determine selection type
      this._isMultiSelect = false;
    }
    /**
     * Check if this handler can process the given legacy class
     * Also stores whether this is a MultiSelect iDevice for later use
     */
    canHandle(className, _ideviceType) {
      const canHandleThis = className.includes("MultichoiceIdevice") || className.includes("MultiSelectIdevice");
      if (canHandleThis) {
        this._isMultiSelect = className.includes("MultiSelectIdevice");
      }
      return canHandleThis;
    }
    /**
     * Get the target modern iDevice type
     */
    getTargetType() {
      return "form";
    }
    /**
     * Extract instructions HTML (if present)
     * MultichoiceIdevice typically doesn't have instructionsForLearners,
     * but we check anyway for compatibility.
     */
    extractHtmlView(dict, _context) {
      if (!dict) return "";
      const instructionsArea = this.findDictInstance(dict, "instructionsForLearners");
      if (instructionsArea) {
        return this.extractTextAreaFieldContent(instructionsArea);
      }
      return "";
    }
    /**
     * Extract feedback from iDevice level (if present)
     * MultichoiceIdevice has per-option feedback, not iDevice-level,
     * but we check for compatibility with other formats.
     */
    extractFeedback(dict, _context) {
      if (!dict) return { content: "", buttonCaption: "" };
      const feedbackField = this.findDictInstance(dict, "feedback") || this.findDictInstance(dict, "feedbackTextArea");
      if (feedbackField) {
        return {
          content: this.extractTextAreaFieldContent(feedbackField),
          buttonCaption: ""
        };
      }
      return { content: "", buttonCaption: "" };
    }
    /**
     * Extract questionsData and optionally eXeFormInstructions from the legacy format
     * Only sets properties that have actual content - no defaults.
     */
    extractProperties(dict, _ideviceId) {
      const questionsData = this.extractQuestions(dict);
      const instructions = this.extractHtmlView(dict);
      const feedback = this.extractFeedback(dict);
      const props = {};
      if (questionsData.length > 0) {
        props.questionsData = questionsData;
      }
      if (instructions?.trim()) {
        props.eXeFormInstructions = instructions;
      }
      if (feedback.content?.trim()) {
        props.eXeIdeviceTextAfter = feedback.content;
      }
      return props;
    }
    /**
     * Extract questions from legacy MultichoiceIdevice format
     *
     * Structure:
     * - questions -> list of QuizQuestionField
     * - QuizQuestionField.questionTextArea -> question text
     * - QuizQuestionField.hintTextArea -> hint for the question
     * - QuizQuestionField.options -> list of QuizOptionField
     * - QuizOptionField.answerTextArea -> option text
     * - QuizOptionField.isCorrect -> boolean
     * - QuizOptionField.feedbackTextArea -> feedback for this option
     *
     * @param dict - Dictionary element of the MultichoiceIdevice
     * @returns Array of question objects in form iDevice format
     */
    extractQuestions(dict) {
      const questionsData = [];
      const questionsList = this.findDictList(dict, "questions");
      if (!questionsList) return questionsData;
      const questionFields = this.getDirectChildrenByTagName(questionsList, "instance");
      for (const questionField of questionFields) {
        const qDict = this.getDirectChildByTagName(questionField, "dictionary");
        if (!qDict) continue;
        const questionTextArea = this.findDictInstance(qDict, "questionTextArea");
        const questionText = questionTextArea ? this.extractTextAreaFieldContent(questionTextArea) : "";
        const hintTextArea = this.findDictInstance(qDict, "hintTextArea");
        const hint = hintTextArea ? this.extractTextAreaFieldContent(hintTextArea) : "";
        const optionsList = this.findDictList(qDict, "options");
        const answers = [];
        if (optionsList) {
          const optionFields = this.getDirectChildrenByTagName(optionsList, "instance");
          for (const optionField of optionFields) {
            const optDict = this.getDirectChildByTagName(optionField, "dictionary");
            if (!optDict) continue;
            const answerTextArea = this.findDictInstance(optDict, "answerTextArea");
            const optionHtml = answerTextArea ? this.extractTextAreaFieldContent(answerTextArea) : "";
            const optionText = this.stripHtmlTags(optionHtml);
            const isCorrect = this.findDictBoolValue(optDict, "isCorrect");
            const feedbackTextArea = this.findDictInstance(optDict, "feedbackTextArea");
            const optionFeedback = feedbackTextArea ? this.extractTextAreaFieldContent(feedbackTextArea) : "";
            if (optionFeedback?.trim()) {
              answers.push([isCorrect, optionText, optionFeedback]);
            } else {
              answers.push([isCorrect, optionText]);
            }
          }
        }
        if (questionText || answers.length > 0) {
          const questionData = {
            activityType: "selection",
            selectionType: this._isMultiSelect ? "multiple" : "single",
            baseText: questionText,
            answers
          };
          if (hint?.trim()) {
            questionData.hint = hint;
          }
          questionsData.push(questionData);
        }
      }
      return questionsData;
    }
  };

  // src/shared/import/legacy-handlers/TrueFalseHandler.ts
  var TrueFalseHandler = class extends BaseLegacyHandler {
    /**
     * Check if this handler can process the given legacy class
     */
    canHandle(className, _ideviceType) {
      return className.includes("TrueFalseIdevice") || className.includes("VerdaderoFalsoFPDIdevice");
    }
    /**
     * Get the target modern iDevice type
     * Matches Symfony: 'trueorfalse'
     */
    getTargetType() {
      return "trueorfalse";
    }
    /**
     * Get default messages for the game
     * These match the messages used by edition/trueorfalse.js
     */
    getDefaultMessages() {
      return {
        msgStartGame: "Click here to start",
        msgTime: "Time per question",
        msgNoImage: "No picture question",
        msgScoreScorm: "The score can't be saved because this page is not part of a SCORM package.",
        msgEndGameScore: "Please start the game before saving your score.",
        msgOnlySaveScore: "You can only save the score once!",
        msgOnlySave: "You can only save once",
        msgYouScore: "Your score",
        msgAuthor: "Authorship",
        msgOnlySaveAuto: "Your score will be saved after each question. You can only play once.",
        msgSaveAuto: "Your score will be automatically saved after each question.",
        msgSeveralScore: "You can save the score as many times as you want",
        msgYouLastScore: "The last score saved is",
        msgActityComply: "You have already done this activity.",
        msgPlaySeveralTimes: "You can do this activity as many times as you want",
        msgUncompletedActivity: "Incomplete activity",
        msgSuccessfulActivity: "Activity: Passed. Score: %s",
        msgUnsuccessfulActivity: "Activity: Not passed. Score: %s",
        msgTypeGame: "True or false",
        msgFeedback: "Feedback",
        msgSuggestion: "Suggestion",
        msgSolution: "Solution",
        msgQuestion: "Question",
        msgTrue: "True",
        msgFalse: "False",
        msgOk: "Correct",
        msgKO: "Incorrect",
        msgShow: "Show",
        msgHide: "Hide",
        msgCheck: "Check",
        msgReboot: "Try again!",
        msgScore: "Score",
        msgWeight: "Weight",
        msgNext: "Next",
        msgPrevious: "Previous"
      };
    }
    /**
     * Extract properties in the game-compatible format expected by the renderer.
     * This generates the full format with typeGame, questionsGame, msgs, etc.
     * to avoid the need for transformation at edit time.
     */
    extractProperties(dict, ideviceId) {
      const questionsGame = this.extractQuestionsGame(dict);
      const instructions = this.extractHtmlView(dict);
      if (questionsGame.length > 0) {
        return {
          id: ideviceId || "",
          typeGame: "TrueOrFalse",
          eXeGameInstructions: instructions || "",
          eXeIdeviceTextAfter: "",
          msgs: this.getDefaultMessages(),
          questionsRandom: false,
          percentageQuestions: 100,
          isTest: false,
          time: 0,
          questionsGame,
          isScorm: 0,
          textButtonScorm: "Save score",
          repeatActivity: true,
          weighted: 100,
          evaluation: false,
          evaluationID: "",
          showSlider: false,
          ideviceId: ideviceId || ""
        };
      }
      return {};
    }
    /**
     * Extract questions from legacy TrueFalseIdevice format in game-compatible format.
     *
     * Structure:
     * - list of TrueFalseQuestion instances
     * - TrueFalseQuestion has: questionTextArea, isCorrect, hintTextArea, feedbackTextArea
     *
     * Output format matches what the renderer expects:
     * - question: HTML content
     * - feedback: HTML content
     * - suggestion: HTML content (from hint)
     * - solution: 1 for true, 0 for false
     *
     * @param dict - Dictionary element of the TrueFalseIdevice
     * @returns Array of question objects in game format
     */
    extractQuestionsGame(dict) {
      const questionsGame = [];
      const lists = this.getDirectChildrenByTagName(dict, "list");
      let questionsList = null;
      for (const list of lists) {
        const firstInst = this.getDirectChildByTagName(list, "instance");
        if (firstInst) {
          const className = firstInst.getAttribute("class") || "";
          if (className.includes("TrueFalseQuestion")) {
            questionsList = list;
            break;
          }
        }
      }
      if (!questionsList) {
        questionsList = this.findDictList(dict, "questions");
      }
      if (!questionsList) return questionsGame;
      const questionInstances = this.getDirectChildrenByTagName(questionsList, "instance");
      for (const questionInst of questionInstances) {
        const qDict = this.getDirectChildByTagName(questionInst, "dictionary");
        if (!qDict) continue;
        const questionTextArea = this.findDictInstance(qDict, "questionTextArea");
        let altTextArea = questionTextArea;
        if (!altTextArea) {
          const instances = this.getElementsByClassContains(qDict, "instance", "TextAreaField");
          altTextArea = instances[0];
        }
        const questionText = altTextArea ? this.extractTextAreaFieldContent(altTextArea) : "";
        const isCorrect = this.findDictBoolValue(qDict, "isCorrect");
        const hintTextArea = this.findDictInstance(qDict, "hintTextArea");
        const suggestion = hintTextArea ? this.extractTextAreaFieldContent(hintTextArea) : "";
        const feedbackTextArea = this.findDictInstance(qDict, "feedbackTextArea");
        const feedback = feedbackTextArea ? this.extractTextAreaFieldContent(feedbackTextArea) : "";
        if (questionText) {
          questionsGame.push({
            question: questionText,
            feedback,
            suggestion,
            solution: isCorrect ? 1 : 0
          });
        }
      }
      return questionsGame;
    }
    /**
     * Extract instructions HTML (optional intro text)
     */
    extractHtmlView(dict, _context) {
      if (!dict) return "";
      const instructionsArea = this.findDictInstance(dict, "instructionsForLearners");
      if (instructionsArea) {
        return this.extractTextAreaFieldContent(instructionsArea);
      }
      const instances = this.getDirectChildrenByTagName(dict, "instance");
      const textArea = instances.find((inst) => (inst.getAttribute("class") || "").includes("TextAreaField"));
      if (textArea) {
        return this.extractTextAreaFieldContent(textArea);
      }
      return "";
    }
    /**
     * No feedback at iDevice level for TrueFalse
     */
    extractFeedback(_dict, _context) {
      return { content: "", buttonCaption: "" };
    }
  };

  // src/shared/import/legacy-handlers/FillHandler.ts
  var FillHandler = class extends BaseLegacyHandler {
    /**
     * Check if this handler can process the given legacy class
     */
    canHandle(className, _ideviceType) {
      return className.includes("ClozeIdevice") || className.includes("ClozeActivityIdevice") || className.includes("ClozeLanguageIdevice") || className.includes("ClozeLangIdevice") || className.includes("ClozelangfpdIdevice");
    }
    /**
     * Get the target modern iDevice type
     */
    getTargetType() {
      return "form";
    }
    /**
     * Extract the cloze text (instructions/content before gaps)
     */
    extractHtmlView(dict, _context) {
      if (!dict) return "";
      const instructionsArea = this.findDictInstance(dict, "instructionsForLearners");
      if (instructionsArea) {
        return this.extractTextAreaFieldContent(instructionsArea);
      }
      return "";
    }
    /**
     * Extract feedback content from legacy format
     * Maps to eXeIdeviceTextAfter in modern form iDevice
     */
    extractFeedback(dict, _context) {
      if (!dict) return { content: "", buttonCaption: "" };
      const feedbackField = this.findDictInstance(dict, "feedback") || this.findDictInstance(dict, "feedbackTextArea");
      if (feedbackField) {
        return {
          content: this.extractTextAreaFieldContent(feedbackField),
          buttonCaption: ""
        };
      }
      return { content: "", buttonCaption: "" };
    }
    /**
     * Extract properties including questionsData and eXeFormInstructions
     */
    extractProperties(dict, _ideviceId) {
      const questionsData = this.extractClozeQuestions(dict);
      const instructions = this.extractHtmlView(dict);
      const autoCapitalize = !this.findDictBoolValue(dict, "autoCapitalize");
      const strictMarking = this.findDictBoolValue(dict, "strictMarking");
      const instantMarking = this.findDictBoolValue(dict, "instantMarking");
      const props = {};
      if (questionsData.length > 0) {
        props.questionsData = questionsData;
      }
      if (instructions) {
        props.eXeFormInstructions = instructions;
      }
      if (autoCapitalize !== void 0) {
        props.ignoreCaps = autoCapitalize;
      }
      if (strictMarking !== void 0) {
        props.strictMarking = strictMarking;
      }
      if (instantMarking !== void 0) {
        props.instantMarking = instantMarking;
      }
      const feedback = this.extractFeedback(dict);
      if (feedback.content) {
        props.eXeIdeviceTextAfter = feedback.content;
      }
      return props;
    }
    /**
     * Extract cloze questions from the legacy format
     *
     * Structure (Symfony OdeOldXmlFillIdevice.php):
     * - _content -> exe.engine.field.ClozeField
     * - ClozeField contains _encodedContent with the cloze text
     * - Gaps are marked with <u> tags
     *
     * @param dict - Dictionary element of the ClozeIdevice
     * @returns Array of question objects in form iDevice format
     */
    extractClozeQuestions(dict) {
      const questionsData = [];
      const contentInst = this.findDictInstance(dict, "_content");
      if (contentInst) {
        const clozeDict = this.getDirectChildByTagName(contentInst, "dictionary");
        if (clozeDict) {
          const encodedContent = this.findDictStringValue(clozeDict, "_encodedContent");
          if (encodedContent) {
            const parsedText = this.parseClozeText(encodedContent);
            if (parsedText.baseText) {
              questionsData.push({
                activityType: "fill",
                baseText: parsedText.baseText,
                answers: parsedText.answers || []
              });
              return questionsData;
            }
          }
        }
      }
      const clozeInst = this.findDictInstance(dict, "_cloze");
      if (clozeInst) {
        const clozeDict = this.getDirectChildByTagName(clozeInst, "dictionary");
        if (clozeDict) {
          const clozeText = this.findDictStringValue(clozeDict, "_encodedContent") || this.findDictStringValue(clozeDict, "_clozeText") || this.findDictStringValue(clozeDict, "clozeText");
          if (clozeText) {
            const parsedText = this.parseClozeText(clozeText);
            if (parsedText.baseText) {
              questionsData.push({
                activityType: "fill",
                baseText: parsedText.baseText,
                answers: parsedText.answers || []
              });
              return questionsData;
            }
          }
        }
      }
      const clozeFieldByClass = this.getDirectChildrenByTagName(dict, "instance").find(
        (inst) => (inst.getAttribute("class") || "").includes("ClozeField")
      );
      if (clozeFieldByClass) {
        const clozeDict = this.getDirectChildByTagName(clozeFieldByClass, "dictionary");
        if (clozeDict) {
          const encodedContent = this.findDictStringValue(clozeDict, "_encodedContent");
          if (encodedContent) {
            const parsedText = this.parseClozeText(encodedContent);
            if (parsedText.baseText) {
              questionsData.push({
                activityType: "fill",
                baseText: parsedText.baseText,
                answers: parsedText.answers || []
              });
              return questionsData;
            }
          }
        }
      }
      return this.extractClozeFromFields(dict);
    }
    /**
     * Alternative extraction from fields list
     */
    extractClozeFromFields(dict) {
      const questionsData = [];
      const clozeTextArea = this.findDictInstance(dict, "clozeTextArea");
      if (clozeTextArea) {
        const content = this.extractTextAreaFieldContent(clozeTextArea);
        if (content) {
          const parsedText = this.parseClozeText(content);
          if (parsedText.baseText) {
            questionsData.push({
              activityType: "fill",
              baseText: parsedText.baseText,
              answers: parsedText.answers || []
            });
          }
        }
      }
      return questionsData;
    }
    /**
     * Parse cloze text to normalize format for the form iDevice renderer
     *
     * The form iDevice renderer (export/form.js getProcessTextFillQuestion)
     * expects <u>word</u> tags in baseText and converts them to <input> fields.
     *
     * Legacy formats that need normalization:
     * - <u class="exe-cloze-word">word</u> -> <u>word</u>
     * - <span class="cloze-blank">word</span> -> <u>word</u>
     * - <input data-answer="word"> -> <u>word</u>
     *
     * Simple <u>word</u> tags are kept as-is (already correct format).
     *
     * @param text - Raw cloze text
     * @returns { baseText, answers }
     */
    parseClozeText(text) {
      if (!text) return { baseText: "", answers: [] };
      let baseText = text;
      baseText = baseText.replace(
        /<u[^>]*class="[^"]*exe-cloze-word[^"]*"[^>]*>([^<]+)<\/u>/gi,
        (_match, word) => "<u>" + word.trim() + "</u>"
      );
      baseText = baseText.replace(
        /<span[^>]*class="[^"]*cloze-blank[^"]*"[^>]*>([^<]+)<\/span>/gi,
        (_match, word) => "<u>" + word.trim() + "</u>"
      );
      baseText = baseText.replace(
        /<input[^>]*data-answer="([^"]+)"[^>]*>/gi,
        (_match, word) => "<u>" + word + "</u>"
      );
      const answers = [];
      baseText.replace(/<u>([^<]+)<\/u>/gi, (_match, word) => {
        answers.push(word.trim());
        return _match;
      });
      return { baseText, answers };
    }
  };

  // src/shared/import/legacy-handlers/DropdownHandler.ts
  var DropdownHandler = class extends BaseLegacyHandler {
    /**
     * Check if this handler can process the given legacy class
     */
    canHandle(className, _ideviceType) {
      return className.includes("ListaIdevice");
    }
    /**
     * Get the target modern iDevice type
     */
    getTargetType() {
      return "form";
    }
    /**
     * Extract instructions HTML
     */
    extractHtmlView(dict, _context) {
      if (!dict) return "";
      const instructionsArea = this.findDictInstance(dict, "instructionsForLearners");
      if (instructionsArea) {
        return this.extractTextAreaFieldContent(instructionsArea);
      }
      return "";
    }
    /**
     * Extract feedback content from the legacy format
     *
     * Legacy ListaIdevice has a "feedback" key containing a TextAreaField
     * with content_w_resourcePaths for the feedback text.
     *
     * @param dict - Dictionary element
     * @param context - Context with language info
     * @returns { content, buttonCaption }
     */
    extractFeedback(dict, context) {
      if (!dict) return { content: "", buttonCaption: "" };
      const defaultCaption = this.getLocalizedFeedbackText(context?.language);
      const feedbackField = this.findDictInstance(dict, "feedback");
      if (feedbackField) {
        const feedbackDict = this.getDirectChildByTagName(feedbackField, "dictionary");
        let buttonCaption = defaultCaption;
        if (feedbackDict) {
          const storedCaption = this.findDictStringValue(feedbackDict, "buttonCaption");
          buttonCaption = storedCaption || defaultCaption;
        }
        const content = this.extractTextAreaFieldContent(feedbackField);
        if (content) {
          return { content, buttonCaption };
        }
      }
      const feedbackTextArea = this.findDictInstance(dict, "feedbackTextArea");
      if (feedbackTextArea) {
        const feedbackDict = this.getDirectChildByTagName(feedbackTextArea, "dictionary");
        let buttonCaption = defaultCaption;
        if (feedbackDict) {
          const storedCaption = this.findDictStringValue(feedbackDict, "buttonCaption");
          buttonCaption = storedCaption || defaultCaption;
        }
        const content = this.extractTextAreaFieldContent(feedbackTextArea);
        if (content) {
          return { content, buttonCaption };
        }
      }
      return { content: "", buttonCaption: "" };
    }
    /**
     * Extract properties including questionsData, eXeFormInstructions, and feedback
     *
     * Based on Symfony OdeOldXmlDropdownIdevice.php:
     * - eXeFormInstructions comes from instructionsForLearners
     * - questionsData contains the dropdown questions with <u> tags preserved
     * - eXeIdeviceTextAfter contains the feedback content (form iDevice uses this field)
     *
     * @param dict - Dictionary element
     * @param _ideviceId - iDevice ID (unused)
     * @param context - Context with language info
     */
    extractProperties(dict, _ideviceId, context) {
      const questionsData = this.extractDropdownQuestions(dict);
      const instructions = this.extractHtmlView(dict);
      const feedback = this.extractFeedback(dict, context);
      if (questionsData.length > 0 || feedback.content) {
        const props = {};
        if (questionsData.length > 0) {
          props.questionsData = questionsData;
        }
        if (instructions) {
          props.eXeFormInstructions = instructions;
        }
        if (feedback.content) {
          props.eXeIdeviceTextAfter = feedback.content;
        }
        return props;
      }
      return {};
    }
    /**
     * Extract dropdown questions from the legacy format
     *
     * Structure can be:
     * - Single ListaField in _content key (most common in real legacy files)
     * - List of ListaField instances
     * - Each has: _encodedContent/content_w_resourcePaths, otras (wrong answers)
     *
     * @param dict - Dictionary element of the ListaIdevice
     * @returns Array of question objects in form iDevice format
     */
    extractDropdownQuestions(dict) {
      const questionsData = [];
      const contentField = this.findDictInstance(dict, "_content");
      if (contentField) {
        const className = contentField.getAttribute("class") || "";
        if (className.includes("ListaField")) {
          const question = this.extractSingleListaField(contentField);
          if (question) questionsData.push(question);
          return questionsData;
        }
      }
      const lists = this.getDirectChildrenByTagName(dict, "list");
      let questionsList = null;
      for (const list of lists) {
        const firstInst = this.getDirectChildByTagName(list, "instance");
        if (firstInst) {
          const className = firstInst.getAttribute("class") || "";
          if (className.includes("ListaField")) {
            questionsList = list;
            break;
          }
        }
      }
      if (!questionsList) {
        questionsList = this.findDictList(dict, "questions") || this.findDictList(dict, "_questions");
      }
      if (!questionsList) return questionsData;
      const questionInstances = this.getDirectChildrenByTagName(questionsList, "instance");
      for (const questionInst of questionInstances) {
        const question = this.extractSingleListaField(questionInst);
        if (question) questionsData.push(question);
      }
      return questionsData;
    }
    /**
     * Extract a single ListaField instance
     *
     * IMPORTANT: The baseText should preserve <u> tags as-is!
     * form.js (getProcessTextDropdownQuestion) will convert <u> tags to <select> elements.
     * See Symfony OdeOldXmlDropdownIdevice.php line 145 - it also keeps <u> tags.
     *
     * @param listaFieldInst - ListaField instance element
     * @returns Question object or null
     */
    extractSingleListaField(listaFieldInst) {
      const qDict = this.getDirectChildByTagName(listaFieldInst, "dictionary");
      if (!qDict) return null;
      let baseText = this.findDictStringValue(qDict, "_encodedContent") || this.findDictStringValue(qDict, "content_w_resourcePaths") || "";
      if (!baseText) {
        const questionTextArea = this.findDictInstance(qDict, "questionTextArea");
        baseText = questionTextArea ? this.extractTextAreaFieldContent(questionTextArea) : "";
      }
      const wrongAnswers = this.findDictStringValue(qDict, "otras") || this.findDictStringValue(qDict, "wrongAnswers") || this.findDictStringValue(qDict, "_wrongAnswers") || "";
      if (baseText) {
        return {
          activityType: "dropdown",
          baseText,
          wrongAnswersValue: wrongAnswers
        };
      }
      return null;
    }
  };

  // src/shared/import/legacy-handlers/ScormTestHandler.ts
  var ScormTestHandler = class extends BaseLegacyHandler {
    /**
     * Check if this handler can process the given legacy class
     */
    canHandle(className, _ideviceType) {
      return className.includes("ScormTestIdevice") || className.includes("QuizTestIdevice");
    }
    /**
     * Get the target modern iDevice type
     */
    getTargetType() {
      return "form";
    }
    /**
     * Extract HTML view - QuizTestIdevice doesn't have instructionsForLearners
     * per Symfony legacy which comments out eXeFormInstructions.
     */
    extractHtmlView(_dict, _context) {
      return "";
    }
    /**
     * No feedback at iDevice level for SCORM test
     */
    extractFeedback(_dict, _context) {
      return { content: "", buttonCaption: "" };
    }
    /**
     * Extract properties including questionsData, dropdownPassRate, etc.
     * Follows Symfony's OdeOldXmlScormTestIdevice.php pattern.
     */
    extractProperties(dict, _ideviceId) {
      if (!dict) return {};
      const questionsData = this.extractQuestions(dict);
      if (questionsData.length === 0) {
        return {};
      }
      const props = {
        questionsData,
        checkAddBtnAnswers: true,
        userTranslations: {
          langTrueFalseHelp: "Select whether the statement is true or false",
          langDropdownHelp: "Choose the correct answer among the options proposed",
          langSingleSelectionHelp: "Multiple choice with only one correct answer",
          langMultipleSelectionHelp: "Multiple choice with multiple corrects answers",
          langFillHelp: "Fill in the blanks with the appropriate word"
        }
      };
      const passRate = this.findDictStringValue(dict, "passRate");
      if (passRate) {
        props.dropdownPassRate = passRate;
      }
      return props;
    }
    /**
     * Extract questions from the legacy SCORM test format
     *
     * Structure:
     * - "questions" key contains a list of TestQuestion instances
     * - Each TestQuestion has: questionTextArea, options (list of AnswerOption)
     *
     * @param dict - Dictionary element of the ScormTestIdevice
     * @returns Array of question objects in form iDevice format
     */
    extractQuestions(dict) {
      const questionsData = [];
      const questionsList = this.findDictList(dict, "questions");
      if (!questionsList) return questionsData;
      const questions = this.getDirectChildrenByTagName(questionsList, "instance").filter(
        (inst) => (inst.getAttribute("class") || "").includes("TestQuestion")
      );
      for (const q of questions) {
        const qDict = this.getDirectChildByTagName(q, "dictionary");
        if (!qDict) continue;
        const questionTextArea = this.findDictInstance(qDict, "questionTextArea");
        const baseText = questionTextArea ? this.extractTextAreaFieldContent(questionTextArea) : "";
        const answers = this.extractOptions(qDict);
        const correctCount = answers.filter((a) => a[0] === true).length;
        const selectionType = correctCount > 1 ? "multiple" : "single";
        if (baseText || answers.length > 0) {
          questionsData.push({
            activityType: "selection",
            selectionType,
            baseText,
            answers
          });
        }
      }
      return questionsData;
    }
    /**
     * Extract answer options from a question dictionary
     *
     * @param qDict - Question dictionary element
     * @returns Array of [isCorrect, answerText] pairs
     */
    extractOptions(qDict) {
      const answers = [];
      const optionsList = this.findDictList(qDict, "options");
      if (!optionsList) return answers;
      const options = this.getDirectChildrenByTagName(optionsList, "instance").filter(
        (inst) => (inst.getAttribute("class") || "").includes("AnswerOption")
      );
      for (const opt of options) {
        const optDict = this.getDirectChildByTagName(opt, "dictionary");
        if (!optDict) continue;
        const answerTextArea = this.findDictInstance(optDict, "answerTextArea");
        let answerText = "";
        if (answerTextArea) {
          answerText = this.extractTextAreaFieldContent(answerTextArea);
          answerText = this.stripHtmlTags(answerText);
        }
        const isCorrect = this.findDictBoolValue(optDict, "isCorrect");
        if (answerText) {
          answers.push([isCorrect, answerText]);
        }
      }
      return answers;
    }
  };

  // src/shared/import/legacy-handlers/CaseStudyHandler.ts
  var CaseStudyHandler = class extends BaseLegacyHandler {
    /**
     * Check if this handler can process the given legacy class
     * Case-insensitive match for CasestudyIdevice and EjercicioresueltofpdIdevice
     */
    canHandle(className, _ideviceType) {
      const lowerName = className.toLowerCase();
      return lowerName.includes("casestudyidevice") || lowerName.includes("ejercicioresueltofpdidevice");
    }
    /**
     * Get the target modern iDevice type
     */
    getTargetType() {
      return "casestudy";
    }
    /**
     * Extract HTML view - returns empty for casestudy
     * All content goes in jsonProperties (history + activities)
     * because casestudy has componentType: 'json'
     */
    extractHtmlView(_dict, _context) {
      return "";
    }
    /**
     * No direct feedback for casestudy - activities have individual feedback
     */
    extractFeedback(_dict, _context) {
      return { content: "", buttonCaption: "" };
    }
    /**
     * Extract properties including history and activities
     * This populates jsonProperties for the casestudy editor
     *
     * @param dict - Dictionary element
     * @param _ideviceId - iDevice ID (unused)
     * @param context - Context with language info
     */
    extractProperties(dict, _ideviceId, context) {
      const defaultProperties = {
        history: "",
        activities: [],
        // Task info fields (new in modern format, not in legacy)
        textInfoDurationInput: "",
        textInfoDurationTextInput: "",
        textInfoParticipantsInput: "",
        textInfoParticipantsTextInput: ""
      };
      if (!dict) return defaultProperties;
      const properties = { ...defaultProperties };
      const storyTextArea = this.findDictInstance(dict, "storyTextArea");
      if (storyTextArea) {
        properties.history = this.extractTextAreaFieldContent(storyTextArea);
      } else {
        const storyInst = this.findDictInstance(dict, "story");
        if (storyInst) {
          properties.history = this.extractTextAreaFieldContent(storyInst);
        }
      }
      properties.activities = this.extractActivities(dict, context);
      return properties;
    }
    /**
     * Extract activities from the legacy format
     *
     * Structure:
     * - "questions" key contains a list of exe.engine.casestudyidevice.Question instances
     * - Each Question has: questionTextArea, feedbackTextArea
     *
     * @param dict - Dictionary element of the CaseStudyIdevice
     * @param context - Context with language info
     * @returns Array of activity objects
     */
    extractActivities(dict, context) {
      const activities = [];
      let activitiesList = this.findDictList(dict, "questions");
      if (!activitiesList) {
        const lists = this.getDirectChildrenByTagName(dict, "list");
        for (const list of lists) {
          const firstInst = this.getDirectChildByTagName(list, "instance");
          if (firstInst) {
            const className = firstInst.getAttribute("class") || "";
            if (className.includes("Question") || className.includes("CasestudyActivityField")) {
              activitiesList = list;
              break;
            }
          }
        }
      }
      if (!activitiesList) {
        activitiesList = this.findDictList(dict, "_activities");
      }
      if (!activitiesList) return activities;
      const activityInstances = this.getDirectChildrenByTagName(activitiesList, "instance");
      for (const activityInst of activityInstances) {
        const aDict = this.getDirectChildByTagName(activityInst, "dictionary");
        if (!aDict) continue;
        let activityTextArea = this.findDictInstance(aDict, "questionTextArea");
        if (!activityTextArea) {
          activityTextArea = this.findDictInstance(aDict, "activityTextArea");
        }
        const activityText = activityTextArea ? this.extractTextAreaFieldContent(activityTextArea) : "";
        let feedbackText = "";
        let buttonCaption = "";
        const feedbackTextArea = this.findDictInstance(aDict, "feedbackTextArea");
        if (feedbackTextArea) {
          feedbackText = this.extractTextAreaFieldContent(feedbackTextArea);
          const feedbackDict = this.getDirectChildByTagName(feedbackTextArea, "dictionary");
          if (feedbackDict) {
            buttonCaption = this.findDictStringValue(feedbackDict, "buttonCaption") || "";
          }
        }
        if (!feedbackText) {
          const instances = this.getDirectChildrenByTagName(aDict, "instance");
          const feedback2Field = instances.find(
            (inst) => (inst.getAttribute("class") || "").includes("Feedback2Field")
          );
          if (feedback2Field) {
            feedbackText = this.extractTextAreaFieldContent(feedback2Field);
            const fbDict = this.getDirectChildByTagName(feedback2Field, "dictionary");
            if (fbDict) {
              buttonCaption = this.findDictStringValue(fbDict, "buttonCaption") || "";
            }
          }
        }
        if (activityText || feedbackText) {
          const defaultCaption = this.getLocalizedFeedbackText(context?.language);
          activities.push({
            activity: activityText,
            feedback: feedbackText,
            buttonCaption: buttonCaption || defaultCaption
          });
        }
      }
      return activities;
    }
  };

  // src/shared/import/legacy-handlers/GalleryHandler.ts
  var GalleryHandler = class extends BaseLegacyHandler {
    /**
     * Check if this handler can process the given legacy class
     */
    canHandle(className, _ideviceType) {
      return className.includes("ImageGalleryIdevice") || className.includes("GalleryIdevice");
    }
    /**
     * Get the target modern iDevice type
     */
    getTargetType() {
      return "image-gallery";
    }
    /**
     * Extract any intro/description content
     */
    extractHtmlView(dict, _context) {
      if (!dict) return "";
      const descriptionArea = this.findDictInstance(dict, "descriptionTextArea");
      if (descriptionArea) {
        return this.extractTextAreaFieldContent(descriptionArea);
      }
      return "";
    }
    /**
     * No feedback for gallery iDevice
     */
    extractFeedback(_dict, _context) {
      return { content: "", buttonCaption: "" };
    }
    /**
     * Extract properties in format expected by modern image-gallery iDevice
     *
     * Modern format uses indexed keys (img_0, img_1, etc.) with fields:
     * - img: image path with resources/ prefix
     * - thumbnail: thumbnail path with resources/ prefix (optional)
     * - title: caption text
     * - linktitle, author, linkauthor, license: attribution fields
     */
    extractProperties(dict, _ideviceId) {
      const images = this.extractImages(dict);
      const props = {};
      images.forEach((image, index) => {
        props[`img_${index}`] = {
          img: `resources/${image.src}`,
          // Add resources/ prefix
          thumbnail: image.thumbnail ? `resources/${image.thumbnail}` : "",
          // Include thumbnail with prefix
          title: image.caption || "",
          // caption -> title
          linktitle: "",
          // Not available in legacy format
          author: "",
          // Not available in legacy format
          linkauthor: "",
          // Not available in legacy format
          license: ""
          // Not available in legacy format
        };
      });
      return props;
    }
    /**
     * Extract images from the legacy format
     *
     * Legacy XML structure:
     * - "images" key points to a GalleryImages wrapper instance
     * - The actual list is inside that wrapper under ".listitems" key
     * - Each GalleryImage has: _imageResource, _caption (TextField), _thumbnailResource
     *
     * @param dict - Dictionary element of the GalleryIdevice
     * @returns Array of image objects
     */
    extractImages(dict) {
      const images = [];
      let imagesList = null;
      const imagesInstance = this.findDictInstance(dict, "images") || this.findDictInstance(dict, "_images");
      if (imagesInstance) {
        const imagesDict = this.getDirectChildByTagName(imagesInstance, "dictionary");
        if (imagesDict) {
          imagesList = this.findDictList(imagesDict, ".listitems");
        }
      }
      if (!imagesList) {
        const lists = this.getDirectChildrenByTagName(dict, "list");
        for (const list of lists) {
          const firstInst = this.getDirectChildByTagName(list, "instance");
          if (firstInst) {
            const className = firstInst.getAttribute("class") || "";
            if (className.includes("GalleryImage")) {
              imagesList = list;
              break;
            }
          }
        }
      }
      if (!imagesList) {
        imagesList = this.findDictList(dict, "_images") || this.findDictList(dict, "images") || this.findDictList(dict, "_userResources");
      }
      if (!imagesList) return images;
      const imageInstances = this.getDirectChildrenByTagName(imagesList, "instance");
      for (const imageInst of imageInstances) {
        const iDict = this.getDirectChildByTagName(imageInst, "dictionary");
        if (!iDict) continue;
        const imageResource = this.extractResourcePath(iDict, "_imageResource") || this.extractResourcePath(iDict, "imageResource");
        let caption = "";
        const captionInstance = this.findDictInstance(iDict, "_caption") || this.findDictInstance(iDict, "caption");
        if (captionInstance) {
          caption = this.extractTextAreaFieldContent(captionInstance);
        }
        if (!caption) {
          caption = this.findDictStringValue(iDict, "caption") || this.findDictStringValue(iDict, "_caption") || "";
        }
        let alt = "";
        const altInstance = this.findDictInstance(iDict, "_alt") || this.findDictInstance(iDict, "alt");
        if (altInstance) {
          alt = this.extractTextAreaFieldContent(altInstance);
        }
        if (!alt) {
          alt = this.findDictStringValue(iDict, "alt") || this.findDictStringValue(iDict, "_alt") || caption;
        }
        const thumbnail = this.extractResourcePath(iDict, "_thumbnailResource") || this.extractResourcePath(iDict, "thumbnailResource");
        if (imageResource) {
          const image = {
            src: imageResource,
            alt,
            caption
          };
          if (thumbnail) {
            image.thumbnail = thumbnail;
          }
          images.push(image);
        }
      }
      return images;
    }
  };

  // src/shared/import/legacy-handlers/ExternalUrlHandler.ts
  var ExternalUrlHandler = class extends BaseLegacyHandler {
    /**
     * Check if this handler can process the given legacy class
     */
    canHandle(className, _ideviceType) {
      return className.includes("ExternalUrlIdevice");
    }
    /**
     * Get the target modern iDevice type
     */
    getTargetType() {
      return "external-website";
    }
    /**
     * Generate HTML view with iframe containing the URL
     *
     * The external-website iDevice JavaScript expects htmlView to contain
     * an iframe with the src attribute set to the URL.
     */
    extractHtmlView(dict, _context) {
      if (!dict) return "";
      const url = this.extractUrl(dict);
      if (!url) return "";
      const heightValue = this.findDictStringValue(dict, "height") || this.findDictStringValue(dict, "_height") || "300";
      let sizeOption = "2";
      const height = parseInt(heightValue, 10);
      if (height <= 200) {
        sizeOption = "1";
      } else if (height <= 300) {
        sizeOption = "2";
      } else if (height <= 500) {
        sizeOption = "3";
      } else {
        sizeOption = "4";
      }
      return `<div id="iframeWebsiteIdevice">
<iframe src="${url}" size="${sizeOption}" width="600" height="${height}" style="width:100%;"></iframe>
<div class="iframe-error-message" style="display:none;">Unable to display an iframe loaded over HTTP on a website that uses HTTPS.</div>
</div>`;
    }
    /**
     * No feedback for external URL iDevice
     */
    extractFeedback(_dict, _context) {
      return { content: "", buttonCaption: "" };
    }
    /**
     * Extract properties including URL
     */
    extractProperties(dict, _ideviceId) {
      if (!dict) return {};
      const props = {};
      const url = this.extractUrl(dict);
      if (url) {
        props.url = url;
      }
      const height = this.findDictStringValue(dict, "height") || this.findDictStringValue(dict, "_height");
      if (height) {
        props.height = height;
      }
      return props;
    }
    /**
     * Extract URL from the legacy format
     *
     * @param dict - Dictionary element of the ExternalUrlIdevice
     * @returns The URL or null
     */
    extractUrl(dict) {
      const urlFieldNames = ["url", "_url", "urlField", "_urlField", "websiteUrl"];
      for (const fieldName of urlFieldNames) {
        const urlValue = this.findDictStringValue(dict, fieldName);
        if (urlValue) {
          return urlValue;
        }
        const urlInst = this.findDictInstance(dict, fieldName);
        if (urlInst) {
          const urlDict = this.getDirectChildByTagName(urlInst, "dictionary");
          if (urlDict) {
            const content = this.findDictStringValue(urlDict, "content") || this.findDictStringValue(urlDict, "_content") || this.findDictStringValue(urlDict, "value") || this.findDictStringValue(urlDict, "_value");
            if (content) {
              return content;
            }
          }
        }
      }
      return null;
    }
  };

  // src/shared/import/legacy-handlers/FileAttachHandler.ts
  var FileAttachHandler = class extends BaseLegacyHandler {
    /**
     * Check if this handler can process the given legacy class
     */
    canHandle(className, _ideviceType) {
      return className.includes("FileAttachIdevice") || className.includes("AttachmentIdevice");
    }
    /**
     * Get the target modern iDevice type
     * Symfony converts to 'text' iDevice with file links in textTextarea
     */
    getTargetType() {
      return "text";
    }
    /**
     * Extract HTML content with instructions (introHTML) + file links
     *
     * Matches Symfony OdeOldXmlFileAttachIdevice.php format:
     * - First: introHTML content (instructions)
     * - Then: <p><a href="path" target="_blank">description</a></p> for each file
     */
    extractHtmlView(dict, _context) {
      if (!dict) return "";
      const parts = [];
      const introHtml = this.extractIntroHtml(dict);
      if (introHtml) {
        parts.push(introHtml);
      }
      const files = this.extractFiles(dict);
      if (files.length > 0) {
        const fileLinks = files.map((file) => {
          const linkText = file.description || file.displayName || file.filename;
          return `<p><a href="${file.path}" target="_blank" download="${file.filename}">${linkText}</a></p>`;
        }).join("");
        parts.push(fileLinks);
      }
      return parts.join("");
    }
    /**
     * No feedback for file attach iDevice
     */
    extractFeedback(_dict, _context) {
      return { content: "", buttonCaption: "" };
    }
    /**
     * Extract introHTML content (instructions text)
     *
     * Legacy structure:
     * <string role="key" value="introHTML"/>
     * <instance class="exe.engine.field.TextAreaField">
     *   <dictionary>
     *     <string role="key" value="content_w_resourcePaths"/>
     *     <unicode value="<p>estas son las instrucciones</p>"/>
     *   </dictionary>
     * </instance>
     *
     * @param dict - Dictionary element of the iDevice
     * @returns HTML content from introHTML
     */
    extractIntroHtml(dict) {
      const introInstance = this.findDictInstance(dict, "introHTML");
      if (!introInstance) return "";
      return this.extractTextAreaFieldContent(introInstance);
    }
    /**
     * Extract properties for text iDevice
     *
     * Symfony sets textTextarea with the same HTML as htmlView
     */
    extractProperties(dict, _ideviceId) {
      const htmlView = this.extractHtmlView(dict);
      if (htmlView) {
        return { textTextarea: htmlView };
      }
      return {};
    }
    /**
     * Extract files from the legacy format
     *
     * FileAttachIdeviceInc structure:
     * - fileAttachmentFields: list of FileField instances
     * - Each FileField has: fileDescription (TextField), fileResource (Resource)
     *
     * @param dict - Dictionary element of the FileAttachIdevice
     * @returns Array of file objects
     */
    extractFiles(dict) {
      const files = [];
      let filesList = this.findDictList(dict, "fileAttachmentFields");
      if (!filesList) {
        const lists = this.getDirectChildrenByTagName(dict, "list");
        for (const list of lists) {
          const firstInst = this.getDirectChildByTagName(list, "instance");
          if (firstInst) {
            const className = firstInst.getAttribute("class") || "";
            if (className.includes("FileField") || className.includes("AttachmentField")) {
              filesList = list;
              break;
            }
          }
        }
      }
      if (!filesList) {
        filesList = this.findDictList(dict, "files") || this.findDictList(dict, "_files") || this.findDictList(dict, "attachments") || this.findDictList(dict, "_attachments");
      }
      if (!filesList) {
        const singleFile = this.extractSingleFile(dict);
        if (singleFile) {
          files.push(singleFile);
        }
        return files;
      }
      const fileInstances = this.getDirectChildrenByTagName(filesList, "instance");
      for (const fileInst of fileInstances) {
        const fDict = this.getDirectChildByTagName(fileInst, "dictionary");
        if (!fDict) continue;
        const file = this.extractFileFromDict(fDict);
        if (file) {
          files.push(file);
        }
      }
      return files;
    }
    /**
     * Extract file info from a dictionary
     *
     * FileAttachIdeviceInc FileField structure:
     * - fileResource: Resource with _storageName (filename in ZIP)
     * - fileDescription: TextField with content (description for link text)
     *
     * Based on Symfony OdeOldXmlFileAttachIdevice.php extraction
     */
    extractFileFromDict(fDict) {
      const filename = this.extractResourcePath(fDict, "fileResource") || this.extractResourcePath(fDict, "_fileResource") || this.extractResourcePath(fDict, "_resource") || this.findDictStringValue(fDict, "_storageName") || this.findDictStringValue(fDict, "storageName");
      if (!filename) return null;
      let description = "";
      const descInst = this.findDictInstance(fDict, "fileDescription");
      if (descInst) {
        const descDict = this.getDirectChildByTagName(descInst, "dictionary");
        if (descDict) {
          description = this.findDictStringValue(descDict, "content") || this.findDictStringValue(descDict, "_content") || "";
        }
      }
      if (!description) {
        description = this.findDictStringValue(fDict, "_description") || this.findDictStringValue(fDict, "description") || "";
      }
      if (!description) {
        description = filename;
      }
      const displayName = this.findDictStringValue(fDict, "_displayName") || this.findDictStringValue(fDict, "displayName") || this.findDictStringValue(fDict, "_label") || this.findDictStringValue(fDict, "label") || filename;
      const path = `resources/${filename}`;
      return {
        filename,
        displayName,
        description,
        path
      };
    }
    /**
     * Extract single file resource
     */
    extractSingleFile(dict) {
      const filename = this.extractResourcePath(dict, "fileResource") || this.extractResourcePath(dict, "_fileResource");
      if (!filename) return null;
      const displayName = this.findDictStringValue(dict, "_displayName") || this.findDictStringValue(dict, "displayName") || filename;
      const path = `resources/${filename}`;
      return {
        filename,
        displayName,
        description: filename,
        // Use filename as description (link text)
        path
      };
    }
  };

  // src/shared/import/legacy-handlers/ImageMagnifierHandler.ts
  var ImageMagnifierHandler = class extends BaseLegacyHandler {
    /**
     * Check if this handler can process the given legacy class
     */
    canHandle(className, _ideviceType) {
      return className.includes("ImageMagnifierIdevice");
    }
    /**
     * Get the target modern iDevice type
     */
    getTargetType() {
      return "magnifier";
    }
    /**
     * Extract any description/intro HTML
     */
    extractHtmlView(dict, _context) {
      if (!dict) return "";
      const captionArea = this.findDictInstance(dict, "captionTextArea") || this.findDictInstance(dict, "descriptionTextArea");
      if (captionArea) {
        return this.extractTextAreaFieldContent(captionArea);
      }
      const caption = this.findDictStringValue(dict, "caption") || this.findDictStringValue(dict, "_caption");
      if (caption) {
        return `<p>${caption}</p>`;
      }
      return "";
    }
    /**
     * No feedback for magnifier iDevice
     */
    extractFeedback(_dict, _context) {
      return { content: "", buttonCaption: "" };
    }
    /**
     * Extract properties including image and magnifier settings
     * Property names MUST match what the modern magnifier editor expects
     *
     * Based on Symfony OdeOldXmlImageMagnifierIdevice.php (lines 240-254):
     * - textTextarea, defaultImage, glassSize, initialZSize, maxZSize
     * - width, height, imageResource, isDefaultImage, message, align
     */
    extractProperties(dict, _ideviceId) {
      const defaultProperties = {
        textTextarea: "",
        // Instructions (from htmlView/caption)
        imageResource: "",
        // Image path
        isDefaultImage: "1",
        // '0' = custom image, '1' = default
        width: "",
        // Image width
        height: "",
        // Image height
        align: "left",
        // Alignment
        initialZSize: "100",
        // Initial zoom (100, 150, 200, etc.)
        maxZSize: "150",
        // Max zoom
        glassSize: "2"
        // Magnifier size (1-6 range)
      };
      if (!dict) return defaultProperties;
      const props = { ...defaultProperties };
      const magnifierDict = this.getMagnifierFieldDict(dict);
      const textArea = this.findDictInstance(dict, "text");
      if (textArea) {
        props.textTextarea = this.extractTextAreaFieldContent(textArea);
      }
      const floatValue = this.findDictStringValue(dict, "float");
      if (floatValue) {
        props.align = floatValue;
      }
      if (magnifierDict) {
        const glassSize = this.findDictStringValue(magnifierDict, "glassSize");
        if (glassSize) {
          props.glassSize = glassSize;
        }
        const initialZSize = this.findDictStringValue(magnifierDict, "initialZSize");
        if (initialZSize) {
          props.initialZSize = initialZSize;
        }
        const maxZSize = this.findDictStringValue(magnifierDict, "maxZSize");
        if (maxZSize) {
          props.maxZSize = maxZSize;
        }
        const width = this.findDictStringValue(magnifierDict, "width");
        if (width) {
          props.width = width;
        }
        const height = this.findDictStringValue(magnifierDict, "height");
        if (height) {
          props.height = height;
        }
      }
      const imagePath = this.extractImagePath(dict);
      if (imagePath) {
        props.imageResource = imagePath;
        props.isDefaultImage = "0";
      }
      return props;
    }
    /**
     * Get the MagnifierField dictionary element
     */
    getMagnifierFieldDict(dict) {
      const magnifierInst = this.findDictInstance(dict, "imageMagnifier") || this.findDictInstance(dict, "_magnifierField") || this.findDictInstance(dict, "magnifierField");
      if (magnifierInst) {
        return this.getDirectChildByTagName(magnifierInst, "dictionary");
      }
      const magnifierByClass = this.getDirectChildrenByTagName(dict, "instance").find(
        (inst) => (inst.getAttribute("class") || "").includes("MagnifierField")
      );
      if (magnifierByClass) {
        return this.getDirectChildByTagName(magnifierByClass, "dictionary");
      }
      return null;
    }
    /**
     * Extract image path from the legacy format
     *
     * Based on Symfony OdeOldXmlImageMagnifierIdevice.php:
     * - imageMagnifier -> exe.engine.field.MagnifierField
     * - imageResource -> exe.engine.resource.Resource
     * - _storageName -> filename
     *
     * @param dict - Dictionary element of the ImageMagnifierIdevice
     * @returns The image path or null
     */
    extractImagePath(dict) {
      const magnifierInst = this.findDictInstance(dict, "imageMagnifier") || this.findDictInstance(dict, "_magnifierField") || this.findDictInstance(dict, "magnifierField");
      if (magnifierInst) {
        const mDict = this.getDirectChildByTagName(magnifierInst, "dictionary");
        if (mDict) {
          const path2 = this.extractResourcePath(mDict, "imageResource") || this.extractResourcePath(mDict, "_imageResource");
          if (path2) return `resources/${path2}`;
        }
      }
      const magnifierByClass = this.getDirectChildrenByTagName(dict, "instance").find(
        (inst) => (inst.getAttribute("class") || "").includes("MagnifierField")
      );
      if (magnifierByClass) {
        const mDict = this.getDirectChildByTagName(magnifierByClass, "dictionary");
        if (mDict) {
          const path2 = this.extractResourcePath(mDict, "imageResource") || this.extractResourcePath(mDict, "_imageResource");
          if (path2) return `resources/${path2}`;
        }
      }
      const path = this.extractResourcePath(dict, "_imageResource") || this.extractResourcePath(dict, "imageResource") || this.extractResourcePath(dict, "_imagePath");
      return path ? `resources/${path}` : null;
    }
  };

  // src/shared/import/legacy-handlers/GeogebraHandler.ts
  var GeogebraHandler = class extends BaseLegacyHandler {
    /**
     * Check if this handler can process the given legacy class
     * Also handles JsIdevice with geogebra-activity type
     *
     * @param className - Legacy class name
     * @param ideviceType - iDevice type from _iDeviceDir (for JsIdevice)
     */
    canHandle(className, ideviceType) {
      if (className.includes("GeogebraIdevice")) {
        return true;
      }
      if (ideviceType === "geogebra-activity") {
        return true;
      }
      return false;
    }
    /**
     * Get the target modern iDevice type
     */
    getTargetType() {
      return "geogebra-activity";
    }
    /**
     * Extract HTML view from GeoGebra content
     */
    extractHtmlView(dict, _context) {
      if (!dict) return "";
      const fieldsList = this.findDictList(dict, "fields");
      if (fieldsList) {
        const textAreas2 = this.getDirectChildrenByTagName(fieldsList, "instance").filter(
          (inst) => (inst.getAttribute("class") || "").includes("TextAreaField")
        );
        for (const textArea of textAreas2) {
          const content = this.extractTextAreaFieldContent(textArea);
          if (content) {
            return content;
          }
        }
      }
      const textAreas = this.getDirectChildrenByTagName(dict, "instance").filter(
        (inst) => (inst.getAttribute("class") || "").includes("TextAreaField")
      );
      for (const textArea of textAreas) {
        const content = this.extractTextAreaFieldContent(textArea);
        if (content) {
          return content;
        }
      }
      return "";
    }
    /**
     * No feedback for geogebra iDevice
     */
    extractFeedback(_dict, _context) {
      return { content: "", buttonCaption: "" };
    }
    /**
     * Extract properties (none needed for geogebra-activity iDevice)
     */
    extractProperties(_dict, _ideviceId) {
      return {};
    }
  };

  // src/shared/import/legacy-handlers/InteractiveVideoHandler.ts
  var InteractiveVideoHandler = class extends BaseLegacyHandler {
    /**
     * Check if this handler can process the given legacy class
     *
     * @param className - Legacy class name
     * @param ideviceType - iDevice type from _iDeviceDir
     */
    canHandle(className, ideviceType) {
      if (ideviceType === "interactive-video") {
        return true;
      }
      if (className?.toLowerCase().includes("interactive-video")) {
        return true;
      }
      return false;
    }
    /**
     * Get the target modern iDevice type
     */
    getTargetType() {
      return "interactive-video";
    }
    /**
     * Extract HTML content and transform the InteractiveVideo script to JSON format
     * Based on Symfony OdeXmlUtil.php lines 2441-2476
     *
     * @param dict - Dictionary element
     * @param _context - Context with language, etc.
     * @returns Transformed HTML content
     */
    extractHtmlView(dict, _context) {
      if (!dict) return "";
      const rawHtml = this.extractFieldsHtml(dict);
      if (!rawHtml) return "";
      if (!rawHtml.includes("exe-interactive-video")) {
        return rawHtml;
      }
      return this.transformInteractiveVideoScript(rawHtml);
    }
    /**
     * No feedback for interactive video iDevice
     */
    extractFeedback(_dict, _context) {
      return { content: "", buttonCaption: "" };
    }
    /**
     * Transform the legacy var InteractiveVideo = {...} script to modern JSON format
     *
     * Legacy format:
     * <script>
     *   //<![CDATA[
     *   var InteractiveVideo = {"slides":[...],...}
     *   //]]>
     * <\/script>
     *
     * Modern format:
     * <script id="exe-interactive-video-contents" type="application/json">
     *   {"slides":[...],...}
     * <\/script>
     *
     * @param html - HTML content with legacy script
     * @returns HTML with transformed script
     */
    transformInteractiveVideoScript(html) {
      let decodedHtml = this.decodeHtmlEntities(html);
      decodedHtml = decodedHtml.replace(/&#10;/g, "\n").replace(/&#13;/g, "\r");
      const varPattern = /var\s+InteractiveVideo\s*=\s*/gi;
      const varMatch = varPattern.exec(decodedHtml);
      if (!varMatch) {
        return decodedHtml;
      }
      const jsonStartPos = varMatch.index + varMatch[0].length;
      const jsonContent = this.findBalancedJson(decodedHtml, jsonStartPos);
      if (!jsonContent) {
        return decodedHtml;
      }
      let decoded = jsonContent.trim();
      decoded = decoded.replace(/(^|\s)\/\/[^\n\r]*/gm, "$1");
      decoded = decoded.replace(/,\s*([}\]])/g, "$1");
      let parsed = null;
      try {
        parsed = JSON.parse(decoded);
      } catch (_e) {
        try {
          const fixed = this.fixJsonQuotes(decoded);
          parsed = JSON.parse(fixed);
        } catch (_e2) {
          return decodedHtml;
        }
      }
      if (parsed) {
        const scriptStart = decodedHtml.lastIndexOf("<script", varMatch.index);
        let scriptEnd = decodedHtml.indexOf("<\/script>", jsonStartPos + jsonContent.length);
        if (scriptStart !== -1 && scriptEnd !== -1) {
          scriptEnd += "<\/script>".length;
          const before = decodedHtml.substring(0, scriptStart);
          const after = decodedHtml.substring(scriptEnd);
          const jsonStr = JSON.stringify(parsed);
          return before + `<script id="exe-interactive-video-contents" type="application/json">${jsonStr}<\/script>` + after;
        }
      }
      return decodedHtml;
    }
    /**
     * Find a balanced JSON object starting from a position in the string
     * Handles nested braces properly
     *
     * @param str - The string to search in
     * @param startPos - Position to start searching from
     * @returns The balanced JSON object or null if not found
     */
    findBalancedJson(str, startPos) {
      let depth = 0;
      let start = -1;
      for (let i = startPos; i < str.length; i++) {
        const char = str[i];
        if (char === "{") {
          if (depth === 0) start = i;
          depth++;
        } else if (char === "}") {
          depth--;
          if (depth === 0 && start !== -1) {
            return str.substring(start, i + 1);
          }
        }
      }
      return null;
    }
    /**
     * Decode HTML entities in string
     *
     * @param str - String with HTML entities
     * @returns Decoded string
     */
    decodeHtmlEntities(str) {
      if (!str) return "";
      return str.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, " ");
    }
    /**
     * Fix unescaped quotes inside JSON string values
     * Based on Symfony OdeXmlUtil.php lines 2456-2462
     *
     * @param jsonStr - JSON string with potential issues
     * @returns Fixed JSON string
     */
    fixJsonQuotes(jsonStr) {
      return jsonStr.replace(/"((?:[^"\\]|\\.)*)"/g, (_match, content) => {
        const fixed = content.replace(/([^\\])"/g, '$1\\"').replace(/^"/g, '\\"');
        return `"${fixed}"`;
      });
    }
    /**
     * Extract HTML content from fields list (JsIdevice format)
     *
     * @param dict - Dictionary element
     * @returns HTML content
     */
    extractFieldsHtml(dict) {
      const contents = [];
      const children = this.getChildElements(dict);
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        if (child.tagName === "string" && child.getAttribute("role") === "key" && child.getAttribute("value") === "fields") {
          const listEl = children[i + 1];
          if (listEl && listEl.tagName === "list") {
            const fieldInstances = this.getChildElements(listEl).filter((el) => el.tagName === "instance");
            for (const fieldInst of fieldInstances) {
              const fieldClass = fieldInst.getAttribute("class") || "";
              if (fieldClass.includes("TextAreaField") || fieldClass.includes("TextField")) {
                const content = this.extractTextAreaFieldContent(fieldInst);
                if (content) {
                  contents.push(content);
                }
              }
            }
          }
          break;
        }
      }
      return contents.join("\n");
    }
    /**
     * Extract properties from the interactive video configuration
     * Parses the InteractiveVideo JSON and returns relevant properties
     *
     * @param dict - Dictionary element
     * @param ideviceId - ID of the iDevice
     * @param _context - Context with language, etc.
     * @returns Properties object
     */
    extractProperties(dict, ideviceId, _context) {
      if (!dict) return {};
      const html = this.extractHtmlView(dict);
      if (!html) return {};
      const jsonMatch = html.match(
        /<script[^>]*id="exe-interactive-video-contents"[^>]*type="application\/json"[^>]*>([\s\S]*?)<\/script>/i
      );
      if (!jsonMatch || !jsonMatch[1]) {
        return this.extractLegacyProperties(html);
      }
      try {
        const config = JSON.parse(jsonMatch[1]);
        return {
          slides: config.slides || [],
          title: config.title || "",
          description: config.description || "",
          coverType: config.coverType || "text",
          i18n: config.i18n || {},
          scorm: config.scorm || {},
          scoreNIA: config.scoreNIA || false,
          evaluation: config.evaluation || false,
          evaluationID: config.evaluationID || "",
          ideviceID: config.ideviceID || ideviceId || ""
        };
      } catch (_e) {
        return {};
      }
    }
    /**
     * Extract properties from legacy format when transform fails
     *
     * @param html - HTML content
     * @returns Properties object
     */
    extractLegacyProperties(html) {
      const legacyMatch = html.match(/var\s+InteractiveVideo\s*=\s*(\{[\s\S]*?\});?\s*(?:\/\/|<\/script>)/i);
      if (!legacyMatch || !legacyMatch[1]) {
        return {};
      }
      try {
        let jsonStr = legacyMatch[1];
        jsonStr = this.decodeHtmlEntities(jsonStr);
        jsonStr = jsonStr.replace(/(^|\s)\/\/[^\n\r]*/gm, "$1");
        jsonStr = jsonStr.replace(/,\s*([}\]])/g, "$1");
        const config = JSON.parse(jsonStr);
        return {
          slides: config.slides || [],
          title: config.title || "",
          description: config.description || "",
          coverType: config.coverType || "text",
          i18n: config.i18n || {},
          scorm: config.scorm || {}
        };
      } catch (_e) {
        return {};
      }
    }
  };

  // src/shared/import/legacy-handlers/GameHandler.ts
  var GAME_PATTERNS = {
    flipcards: "flipcards-DataGame",
    selecciona: "selecciona-DataGame",
    "selecciona-activity": "selecciona-DataGame",
    trivial: "trivial-DataGame",
    crossword: "crossword-DataGame",
    relate: "relate-DataGame",
    relaciona: "relaciona-DataGame",
    identify: "identify-DataGame",
    discover: "discover-DataGame",
    complete: "complete-DataGame",
    classify: "classify-DataGame",
    guess: "guess-DataGame",
    sort: "sort-DataGame",
    puzzle: "puzzle-DataGame",
    beforeafter: "beforeafter-DataGame",
    "word-search": "word-search-DataGame",
    "hidden-image": "hidden-image-DataGame",
    mathproblems: "mathproblems-DataGame",
    mathematicaloperations: "mathematicaloperations-DataGame",
    padlock: "padlock-DataGame",
    challenge: "challenge-DataGame",
    checklist: "checklist-DataGame",
    "quick-questions": "quick-questions-DataGame",
    "az-quiz-game": "az-quiz-game-DataGame",
    dragdrop: "dragdrop-DataGame",
    trueorfalse: "trueorfalse-DataGame",
    // Spanish legacy names
    mapa: "mapa-DataGame",
    rosco: "rosco-DataGame",
    videoquext: "videoquext-DataGame",
    vquext: "vquext-DataGame",
    quext: "quext-DataGame",
    desafio: "desafio-DataGame",
    candado: "candado-DataGame",
    adivina: "adivina-DataGame",
    clasifica: "clasifica-DataGame",
    completa: "completa-DataGame",
    descubre: "descubre-DataGame",
    identifica: "identifica-DataGame",
    sopa: "sopa-DataGame",
    ordena: "ordena-DataGame",
    seleccionamedias: "seleccionamedias-DataGame",
    listacotejo: "listacotejo-DataGame",
    informe: "informe-DataGame",
    crucigrama: "crucigrama-DataGame"
  };
  var ENCRYPTED_GAMES = [
    "selecciona",
    "selecciona-activity",
    "trivial",
    "identify",
    "discover",
    "complete",
    "classify",
    "guess",
    "sort",
    "puzzle",
    "relate",
    "relaciona",
    "hidden-image",
    "mathematicaloperations",
    "padlock",
    "challenge",
    "quick-questions",
    "az-quiz-game",
    "dragdrop",
    "trueorfalse",
    "mathproblems",
    "word-search",
    "checklist",
    // Spanish legacy names that use encryption
    "rosco",
    "videoquext",
    "vquext",
    "quext",
    "desafio",
    "candado",
    "adivina",
    "clasifica",
    "completa",
    "descubre",
    "identifica",
    "sopa",
    "ordena",
    "listacotejo",
    "informe",
    "crucigrama"
    // Note: 'mapa' is NOT encrypted - it uses plain JSON like flipcards
  ];
  var TYPE_MAP = {
    // Spanish -> English mappings
    selecciona: "quick-questions-multiple-choice",
    trivial: "quick-questions",
    mapa: "map",
    rosco: "az-quiz-game",
    videoquext: "quick-questions-video",
    vquext: "quick-questions-video",
    quext: "quick-questions",
    desafio: "challenge",
    candado: "padlock",
    adivina: "guess",
    clasifica: "classify",
    completa: "complete",
    descubre: "discover",
    identifica: "identify",
    sopa: "word-search",
    ordena: "sort",
    seleccionamedias: "select-media-files",
    listacotejo: "checklist",
    informe: "progress-report",
    crucigrama: "crossword",
    // These map to themselves (already correct)
    flipcards: "flipcards",
    crossword: "crossword",
    relate: "relate",
    relaciona: "relate",
    identify: "identify",
    discover: "discover",
    complete: "complete",
    classify: "classify",
    guess: "guess",
    sort: "sort",
    puzzle: "puzzle",
    beforeafter: "beforeafter",
    "word-search": "word-search",
    "hidden-image": "hidden-image",
    mathproblems: "mathproblems",
    mathematicaloperations: "mathematicaloperations",
    padlock: "padlock",
    challenge: "challenge",
    checklist: "checklist",
    "quick-questions": "quick-questions",
    "quick-questions-multiple-choice": "quick-questions-multiple-choice",
    "quick-questions-video": "quick-questions-video",
    "az-quiz-game": "az-quiz-game",
    map: "map",
    dragdrop: "dragdrop",
    trueorfalse: "trueorfalse",
    "select-media-files": "select-media-files",
    "progress-report": "progress-report"
  };
  var GameHandler = class extends BaseLegacyHandler {
    constructor() {
      super(...arguments);
      // Track detected game type for getTargetType()
      this._detectedType = null;
    }
    /**
     * Check if this handler can process the given legacy class
     * Handles JsIdevice types with game data
     *
     * @param className - Legacy class name
     * @param ideviceType - iDevice type from _iDeviceDir (e.g., 'flipcards-activity')
     */
    canHandle(className, ideviceType) {
      const gameTypes = Object.keys(GAME_PATTERNS);
      if (gameTypes.some((type) => className.toLowerCase().includes(type.toLowerCase()))) {
        return true;
      }
      if (ideviceType) {
        const normalizedType = ideviceType.replace(/-activity$/, "");
        if (gameTypes.includes(normalizedType)) {
          this._detectedType = normalizedType;
          return true;
        }
      }
      return false;
    }
    /**
     * Get the target modern iDevice type
     * Returns the detected game type mapped to its installed iDevice type
     */
    getTargetType() {
      if (this._detectedType) {
        const normalized = this._detectedType.replace(/-activity$/, "");
        return TYPE_MAP[normalized] || normalized;
      }
      return "text";
    }
    /**
     * Extract HTML content from dictionary (game iDevices store HTML in fields list)
     * Also updates the DataGame div with decrypted/parsed JSON for proper rendering
     *
     * @param dict - Dictionary element
     * @returns HTML content with updated DataGame div
     */
    extractHtmlView(dict, _context) {
      if (!dict) return "";
      const contents = [];
      const children = this.getChildElements(dict);
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        if (child.tagName === "string" && child.getAttribute("role") === "key" && child.getAttribute("value") === "fields") {
          const listEl = children[i + 1];
          if (listEl && listEl.tagName === "list") {
            const fieldInstances = this.getChildElements(listEl).filter((el) => el.tagName === "instance");
            for (const fieldInst of fieldInstances) {
              const fieldClass = fieldInst.getAttribute("class") || "";
              if (fieldClass.includes("TextAreaField") || fieldClass.includes("TextField")) {
                const content = this.extractTextAreaFieldContent(fieldInst);
                if (content) {
                  contents.push(content);
                }
              }
            }
          }
          break;
        }
      }
      let html = contents.join("\n");
      html = this.updateDataGameDivInHtml(html);
      return html;
    }
    /**
     * No feedback for game iDevices
     */
    extractFeedback(_dict, _context) {
      return { content: "", buttonCaption: "" };
    }
    /**
     * Update the DataGame div in HTML with decrypted/parsed JSON
     *
     * IMPORTANT: Only updates NON-encrypted games (like flipcards).
     * For encrypted games, the DataGame div content is left as-is.
     *
     * @param html - HTML content
     * @returns Updated HTML (only for non-encrypted games)
     */
    updateDataGameDivInHtml(html) {
      if (!html) return html;
      for (const [gameType, divClass] of Object.entries(GAME_PATTERNS)) {
        const gameData = this.extractGameDataFromHtml(html, divClass);
        if (gameData !== null) {
          const isEncrypted = ENCRYPTED_GAMES.includes(gameType);
          if (isEncrypted) {
            return html;
          }
          let parsedData = null;
          if (gameData.trim().startsWith("{")) {
            parsedData = this.parseJson(gameData);
          }
          if (parsedData) {
            const newJson = JSON.stringify(parsedData);
            const escapedClass = divClass.replace(/-/g, "\\-");
            const regex = new RegExp(
              `(<div[^>]*class="[^"]*${escapedClass}[^"]*"[^>]*>)[\\s\\S]*?(<\\/div>)`,
              "i"
            );
            if (regex.test(html)) {
              return html.replace(regex, `$1${this.escapeHtml(newJson)}$2`);
            }
          }
          break;
        }
      }
      return html;
    }
    /**
     * Extract properties from game data div
     * Looks for *-DataGame divs and parses the JSON (encrypted or plain)
     */
    extractProperties(dict, _ideviceId) {
      const rawHtml = this.extractHtmlView(dict);
      if (!rawHtml) return {};
      for (const [gameType, divClass] of Object.entries(GAME_PATTERNS)) {
        const gameData = this.extractGameDataFromHtml(rawHtml, divClass);
        if (gameData !== null) {
          this._detectedType = gameType;
          const isEncrypted = ENCRYPTED_GAMES.includes(gameType);
          let parsedData = null;
          if (isEncrypted && gameData.startsWith("%")) {
            const decrypted = this.decrypt(gameData);
            parsedData = this.parseJson(decrypted);
          } else if (gameData.trim().startsWith("{")) {
            parsedData = this.parseJson(gameData);
          }
          if (parsedData) {
            return parsedData;
          }
        }
      }
      return {};
    }
    /**
     * Extract game data from HTML by finding the DataGame div
     * Uses regex for reliable extraction
     *
     * @param html - HTML content
     * @param divClass - Class name of the DataGame div
     * @returns Content of the DataGame div, or null if not found
     */
    extractGameDataFromHtml(html, divClass) {
      if (!html) return null;
      const escapedClass = divClass.replace(/-/g, "\\-");
      const patterns = [
        // Match div with class, capturing everything until closing </div>
        new RegExp(`<div[^>]*class="[^"]*${escapedClass}[^"]*"[^>]*>([\\s\\S]*?)<\\/div>`, "i"),
        // HTML-encoded quotes variant
        new RegExp(`<div[^>]*class=&quot;[^"]*${escapedClass}[^"]*&quot;[^>]*>([\\s\\S]*?)<\\/div>`, "i")
      ];
      for (const regex of patterns) {
        const match = html.match(regex);
        if (match?.[1]) {
          let content = match[1].trim();
          content = this.decodeHtmlContent(content);
          return content;
        }
      }
      return null;
    }
    /**
     * Decrypt XOR-encrypted game data
     * Uses the same algorithm as $exeDevices.iDevice.gamification.helpers.decrypt()
     *
     * @param str - Encrypted string (URL-encoded, XOR key=146)
     * @returns Decrypted string
     */
    decrypt(str) {
      if (!str) return "";
      if (str === "undefined" || str === "null") return "";
      let decoded = str;
      try {
        decoded = decodeURIComponent(str);
      } catch (_e) {
        try {
          decoded = unescape(str);
        } catch (_e2) {
          return "";
        }
      }
      try {
        const key = 146;
        let output = "";
        for (let i = 0; i < decoded.length; i++) {
          output += String.fromCharCode(key ^ decoded.charCodeAt(i));
        }
        return output;
      } catch (_e) {
        return "";
      }
    }
    /**
     * Parse JSON string safely
     * Handles common issues like control characters in string values
     *
     * @param str - JSON string
     * @returns Parsed object or null
     */
    parseJson(str) {
      if (!str || typeof str !== "string") return null;
      str = str.trim();
      if (!str.startsWith("{") || !str.endsWith("}")) {
        const firstBrace = str.indexOf("{");
        const lastBrace = str.lastIndexOf("}");
        if (firstBrace !== -1 && lastBrace > firstBrace) {
          str = str.substring(firstBrace, lastBrace + 1);
        } else {
          return null;
        }
      }
      try {
        const obj = JSON.parse(str);
        if (obj && typeof obj === "object" && !Array.isArray(obj)) {
          return obj;
        }
      } catch (_e) {
        try {
          const controlCharRegex = /[\x00-\x1F]/g;
          let fixedStr = str.replace(controlCharRegex, (char) => {
            const escapes = {
              "\n": "\\n",
              "\r": "\\r",
              "	": "\\t"
            };
            return escapes[char] || "";
          });
          fixedStr = fixedStr.replace(/\u00A0/g, " ");
          const obj = JSON.parse(fixedStr);
          if (obj && typeof obj === "object" && !Array.isArray(obj)) {
            return obj;
          }
        } catch (_e2) {
        }
      }
      return null;
    }
  };

  // src/shared/import/legacy-handlers/FpdSolvedExerciseHandler.ts
  var FpdSolvedExerciseHandler = class extends BaseLegacyHandler {
    /**
     * Check if this handler can process the given legacy class
     */
    canHandle(className, _ideviceType) {
      return className.includes("SolvedExerciseIdevice") || className.includes("EjercicioResueltoFpdIdevice") || className.includes("ejercicioresueltofpdidevice");
    }
    /**
     * Get the target modern iDevice type
     */
    getTargetType() {
      return "text";
    }
    /**
     * Extract HTML view combining story and questions with feedback
     *
     * @param dict - Dictionary element
     * @param context - Context with language info
     */
    extractHtmlView(dict, context) {
      if (!dict) return "";
      let html = "";
      const storyArea = this.findDictInstance(dict, "storyTextArea");
      if (storyArea) {
        const storyContent = this.extractTextAreaFieldContent(storyArea);
        if (storyContent) {
          html += storyContent;
        }
      }
      const questionsList = this.findDictList(dict, "questions");
      if (questionsList) {
        const questions = this.getDirectChildrenByTagName(questionsList, "instance").filter(
          (inst) => (inst.getAttribute("class") || "").includes("Question")
        );
        for (const q of questions) {
          const qDict = this.getDirectChildByTagName(q, "dictionary");
          if (!qDict) continue;
          const questionTextArea = this.findDictInstance(qDict, "questionTextArea");
          if (questionTextArea) {
            const questionContent = this.extractTextAreaFieldContent(questionTextArea);
            if (questionContent) {
              html += questionContent;
            }
          }
          const feedbackTextArea = this.findDictInstance(qDict, "feedbackTextArea");
          if (feedbackTextArea) {
            const feedbackContent = this.extractTextAreaFieldContent(feedbackTextArea);
            if (feedbackContent) {
              const feedbackDict = this.getDirectChildByTagName(feedbackTextArea, "dictionary");
              const defaultCaption = this.getLocalizedFeedbackText(context?.language);
              let buttonCaption = defaultCaption;
              if (feedbackDict) {
                const caption = this.findDictStringValue(feedbackDict, "buttonCaption");
                if (caption) {
                  buttonCaption = caption;
                }
              }
              html += `<div class="iDevice_buttons feedback-button js-required">
<input type="button" class="feedbacktooglebutton" value="${buttonCaption}" data-text-a="${buttonCaption}" data-text-b="${buttonCaption}">
</div>
<div class="feedback js-feedback js-hidden" style="display: none;">${feedbackContent}</div>`;
            }
          }
        }
      }
      return html;
    }
    /**
     * No feedback for FPD solved exercise iDevice (feedback is inline)
     */
    extractFeedback(_dict, _context) {
      return { content: "", buttonCaption: "" };
    }
    /**
     * Extract properties (none needed for text iDevice)
     */
    extractProperties(_dict, _ideviceId) {
      return {};
    }
  };

  // src/shared/import/legacy-handlers/WikipediaHandler.ts
  var WikipediaHandler = class extends BaseLegacyHandler {
    /**
     * Check if this handler can process the given legacy class
     */
    canHandle(className, _ideviceType) {
      return className.includes("WikipediaIdevice");
    }
    /**
     * Get the target modern iDevice type
     */
    getTargetType() {
      return "text";
    }
    /**
     * Extract HTML view from Wikipedia content
     */
    extractHtmlView(dict, _context) {
      if (!dict) return "";
      const textAreas = this.getDirectChildrenByTagName(dict, "instance").filter(
        (inst) => (inst.getAttribute("class") || "").includes("TextAreaField")
      );
      let html = "";
      for (const textArea of textAreas) {
        const content = this.extractTextAreaFieldContent(textArea);
        if (content) {
          const cleanedContent = content.replace(/<p><\/p>/g, "");
          html += cleanedContent;
        }
      }
      if (!html) {
        const fieldsList = this.findDictList(dict, "fields");
        if (fieldsList) {
          const fields = this.getDirectChildrenByTagName(fieldsList, "instance").filter(
            (inst) => (inst.getAttribute("class") || "").includes("TextAreaField")
          );
          for (const field of fields) {
            const content = this.extractTextAreaFieldContent(field);
            if (content) {
              const cleanedContent = content.replace(/<p><\/p>/g, "");
              html += cleanedContent;
            }
          }
        }
      }
      if (html) {
        html = `<div class="exe-wikipedia-content">${html}</div>`;
      }
      return html;
    }
    /**
     * No feedback for Wikipedia iDevice
     */
    extractFeedback(_dict, _context) {
      return { content: "", buttonCaption: "" };
    }
    /**
     * Extract properties (none needed for text iDevice)
     */
    extractProperties(_dict, _ideviceId) {
      return {};
    }
  };

  // src/shared/import/legacy-handlers/RssHandler.ts
  var RssHandler = class extends BaseLegacyHandler {
    /**
     * Check if this handler can process the given legacy class
     */
    canHandle(className, _ideviceType) {
      return className.includes("RssIdevice");
    }
    /**
     * Get the target modern iDevice type
     */
    getTargetType() {
      return "text";
    }
    /**
     * Extract HTML view from RSS content
     */
    extractHtmlView(dict, _context) {
      if (!dict) return "";
      const textAreas = this.getDirectChildrenByTagName(dict, "instance").filter(
        (inst) => (inst.getAttribute("class") || "").includes("TextAreaField")
      );
      let html = "";
      for (const textArea of textAreas) {
        const content = this.extractTextAreaFieldContent(textArea);
        if (content) {
          html += content;
        }
      }
      if (!html) {
        const fieldsList = this.findDictList(dict, "fields");
        if (fieldsList) {
          const fields = this.getDirectChildrenByTagName(fieldsList, "instance").filter(
            (inst) => (inst.getAttribute("class") || "").includes("TextAreaField")
          );
          for (const field of fields) {
            const content = this.extractTextAreaFieldContent(field);
            if (content) {
              html += content;
            }
          }
        }
      }
      return html;
    }
    /**
     * No feedback for RSS iDevice
     */
    extractFeedback(_dict, _context) {
      return { content: "", buttonCaption: "" };
    }
    /**
     * Extract properties (none needed for text iDevice)
     */
    extractProperties(_dict, _ideviceId) {
      return {};
    }
  };

  // src/shared/import/legacy-handlers/NotaHandler.ts
  var NotaHandler = class extends BaseLegacyHandler {
    /**
     * Check if this handler can process the given legacy class
     */
    canHandle(className, _ideviceType) {
      return className.includes("NotaIdevice") || className.includes("NotaInformacionIdevice");
    }
    /**
     * Get the target modern iDevice type
     */
    getTargetType() {
      return "text";
    }
    /**
     * Get block properties for Nota iDevices
     * These iDevices should have their block collapsed by default
     *
     * @returns Block properties with visibility: 'false'
     */
    getBlockProperties() {
      return {
        visibility: "false"
      };
    }
    /**
     * Extract HTML content from the legacy format
     * Nota iDevices store content in commentTextArea
     *
     * @param dict - Dictionary element from legacy XML
     */
    extractHtmlView(dict, _context) {
      if (!dict) return "";
      const commentTextArea = this.findDictInstance(dict, "commentTextArea");
      if (commentTextArea) {
        return this.extractTextAreaFieldContent(commentTextArea);
      }
      const contentTextArea = this.findDictInstance(dict, "content");
      if (contentTextArea) {
        return this.extractTextAreaFieldContent(contentTextArea);
      }
      const textAreaInst = this.getDirectChildrenByTagName(dict, "instance").find(
        (inst) => (inst.getAttribute("class") || "").includes("TextAreaField")
      );
      if (textAreaInst) {
        return this.extractTextAreaFieldContent(textAreaInst);
      }
      return "";
    }
    /**
     * No feedback for Nota iDevice
     */
    extractFeedback(_dict, _context) {
      return { content: "", buttonCaption: "" };
    }
    /**
     * Extract properties for text iDevice
     */
    extractProperties(_dict, _ideviceId) {
      return {};
    }
  };

  // src/shared/import/legacy-handlers/HandlerRegistry.ts
  var LEGACY_TYPE_MAP = {
    // Text/Content iDevices -> text
    FreeTextIdevice: "text",
    FreeTextfpdIdevice: "text",
    ReflectionIdevice: "text",
    ReflectionfpdIdevice: "text",
    GenericIdevice: "text",
    SolvedExerciseIdevice: "text",
    EjercicioResueltoFpdIdevice: "text",
    WikipediaIdevice: "text",
    RssIdevice: "text",
    // Quiz/Form iDevices -> form
    MultichoiceIdevice: "form",
    MultiSelectIdevice: "form",
    ListaIdevice: "form",
    // TrueFalse -> trueorfalse (dedicated iDevice type)
    TrueFalseIdevice: "trueorfalse",
    VerdaderoFalsoFPDIdevice: "trueorfalse",
    ClozeIdevice: "form",
    ClozeActivityIdevice: "form",
    ClozeLanguageIdevice: "form",
    ClozeLangIdevice: "form",
    ScormTestIdevice: "form",
    QuizTestIdevice: "form",
    // Case Study
    CaseStudyIdevice: "casestudy",
    // Media iDevices
    ImageGalleryIdevice: "image-gallery",
    ImageMagnifierIdevice: "magnifier",
    GalleryIdevice: "image-gallery",
    // File iDevices -> text with links
    FileAttachIdevice: "text",
    FileAttachIdeviceInc: "text",
    AttachmentIdevice: "text",
    // External content
    ExternalUrlIdevice: "external-website",
    GeogebraIdevice: "geogebra-activity",
    JavaAppIdevice: "java-app"
  };
  function getLegacyTypeName(className) {
    if (!className) return "text";
    const parts = className.split(".");
    const ideviceName = parts[parts.length - 1];
    if (LEGACY_TYPE_MAP[ideviceName]) {
      return LEGACY_TYPE_MAP[ideviceName];
    }
    const normalized = ideviceName.replace(/Idevice$/i, "").replace(/fpd$/i, "").replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
    return normalized || "text";
  }
  var LegacyHandlerRegistryClass = class {
    constructor() {
      this.handlers = null;
    }
    /**
     * Initialize handlers (called once when needed)
     */
    init() {
      if (this.handlers) return;
      this.handlers = [
        new MultichoiceHandler(),
        // MultichoiceIdevice, MultiSelectIdevice -> form
        new TrueFalseHandler(),
        // TrueFalseIdevice -> trueorfalse
        new FillHandler(),
        // ClozeIdevice, ClozeLanguageIdevice -> form (fill-in-blanks)
        new DropdownHandler(),
        // ListaIdevice -> form (dropdown questions)
        new ScormTestHandler(),
        // ScormTestIdevice, QuizTestIdevice -> form (SCORM quiz)
        new CaseStudyHandler(),
        // CaseStudyIdevice -> casestudy
        new GalleryHandler(),
        // ImageGalleryIdevice, GalleryIdevice -> image-gallery
        new ExternalUrlHandler(),
        // ExternalUrlIdevice -> external-website
        new FileAttachHandler(),
        // FileAttachIdevice, AttachmentIdevice -> text (with file links)
        new ImageMagnifierHandler(),
        // ImageMagnifierIdevice -> magnifier
        new GeogebraHandler(),
        // GeogebraIdevice -> geogebra-activity
        new InteractiveVideoHandler(),
        // JsIdevice interactive-video -> interactive-video
        new GameHandler(),
        // flipcards, selecciona, trivial, etc. -> game types
        new FpdSolvedExerciseHandler(),
        // SolvedExerciseIdevice -> text (with Q&A)
        new WikipediaHandler(),
        // WikipediaIdevice -> text (with wrapper)
        new RssHandler(),
        // RssIdevice -> text
        new NotaHandler(),
        // NotaIdevice -> text (with visibility=false block)
        new FreeTextHandler(),
        // FreeTextIdevice, ReflectionIdevice, GenericIdevice -> text
        new DefaultHandler()
        // Fallback for unknown types (must be last)
      ];
    }
    /**
     * Get the appropriate handler for a legacy iDevice class
     *
     * @param className - Legacy class name (e.g., 'exe.engine.multichoiceidevice.MultichoiceIdevice')
     * @param ideviceType - Optional iDevice type (e.g., 'flipcards-activity') for JsIdevice handlers
     * @returns Handler instance
     */
    getHandler(className, ideviceType) {
      this.init();
      for (const handler of this.handlers) {
        if (handler.canHandle(className, ideviceType)) {
          return handler;
        }
      }
      return this.handlers[this.handlers.length - 1];
    }
    /**
     * Get all registered handlers (for debugging/testing)
     *
     * @returns Array of handler instances
     */
    getAllHandlers() {
      this.init();
      return [...this.handlers];
    }
    /**
     * Reset handlers (useful for testing)
     */
    reset() {
      this.handlers = null;
    }
  };
  var LegacyHandlerRegistry = new LegacyHandlerRegistryClass();

  // src/shared/import/LegacyXmlParser.ts
  var LegacyXmlParser = class _LegacyXmlParser {
    constructor(logger = defaultLogger) {
      this.xmlContent = "";
      this.xmlDoc = null;
      this.parentRefMap = /* @__PURE__ */ new Map();
      this.projectLanguage = "";
      this.logger = logger;
    }
    static {
      /**
       * LEGACY ICON TO THEME ICON MAPPING CONVENTION
       * Maps legacy iDevice icon names to modern theme icon names.
       */
      this.LEGACY_ICON_MAP = {
        preknowledge: "think",
        reading: "book",
        casestudy: "case",
        question: "interactive"
      };
    }
    static {
      /**
       * IDEVICE TITLE TRANSLATIONS
       */
      this.IDEVICE_TITLE_TRANSLATIONS = {
        "Case Study": {
          es: "Caso practico",
          en: "Case Study",
          ca: "Cas practic",
          va: "Cas practic",
          eu: "Kasu praktikoa",
          gl: "Caso practico",
          pt: "Caso pratico",
          fr: "Etude de cas",
          de: "Fallstudie",
          it: "Caso di studio"
        },
        Activity: {
          es: "Actividad",
          en: "Activity",
          ca: "Activitat",
          va: "Activitat",
          eu: "Jarduera",
          gl: "Actividade",
          pt: "Atividade",
          fr: "Activite",
          de: "Aktivitat",
          it: "Attivita"
        },
        "Reading Activity": {
          es: "Actividad de lectura",
          en: "Reading Activity",
          ca: "Activitat de lectura",
          va: "Activitat de lectura",
          eu: "Irakurketa jarduera",
          gl: "Actividade de lectura",
          pt: "Atividade de leitura",
          fr: "Activite de lecture",
          de: "Leseaktivitat",
          it: "Attivita di lettura"
        },
        Preknowledge: {
          es: "Conocimiento previo",
          en: "Preknowledge",
          ca: "Coneixement previ",
          va: "Coneixement previ",
          eu: "Aurretiko ezagutza",
          gl: "Conecemento previo",
          pt: "Conhecimento previo",
          fr: "Prerequis",
          de: "Vorwissen",
          it: "Conoscenze pregresse"
        },
        Objectives: {
          es: "Objetivos",
          en: "Objectives",
          ca: "Objectius",
          va: "Objectius",
          eu: "Helburuak",
          gl: "Obxectivos",
          pt: "Objetivos",
          fr: "Objectifs",
          de: "Ziele",
          it: "Obiettivi"
        },
        Task: {
          es: "Tarea",
          en: "Task",
          ca: "Tasca",
          va: "Tasca",
          eu: "Zeregina",
          gl: "Tarefa",
          pt: "Tarefa",
          fr: "Tache",
          de: "Aufgabe",
          it: "Compito"
        },
        Quotation: {
          es: "Cita",
          en: "Quotation",
          ca: "Citacio",
          va: "Citacio",
          eu: "Aipua",
          gl: "Cita",
          pt: "Citacao",
          fr: "Citation",
          de: "Zitat",
          it: "Citazione"
        },
        Reflection: {
          es: "Reflexion",
          en: "Reflection",
          ca: "Reflexio",
          va: "Reflexio",
          eu: "Hausnarketa",
          gl: "Reflexion",
          pt: "Reflexao",
          fr: "Reflexion",
          de: "Reflexion",
          it: "Riflessione"
        },
        "Free Text": {
          es: "Texto libre",
          en: "Free Text",
          ca: "Text lliure",
          va: "Text lliure",
          eu: "Testu librea",
          gl: "Texto libre",
          pt: "Texto livre",
          fr: "Texte libre",
          de: "Freier Text",
          it: "Testo libero"
        },
        "True-False Question": {
          es: "Pregunta verdadero-falso",
          en: "True-False Question",
          ca: "Pregunta vertader-fals",
          va: "Pregunta vertader-fals",
          eu: "Egia-gezurra galdera",
          gl: "Pregunta verdadeiro-falso",
          pt: "Pergunta verdadeiro-falso",
          fr: "Question vrai-faux",
          de: "Wahr-Falsch-Frage",
          it: "Domanda vero-falso"
        },
        "Multi-select": {
          es: "Seleccion multiple",
          en: "Multi-select",
          ca: "Seleccio multiple",
          va: "Seleccio multiple",
          eu: "Hautapen anitza",
          gl: "Seleccion multiple",
          pt: "Selecao multipla",
          fr: "Selection multiple",
          de: "Mehrfachauswahl",
          it: "Selezione multipla"
        },
        "Multi-choice": {
          es: "Eleccion multiple",
          en: "Multi-choice",
          ca: "Eleccio multiple",
          va: "Eleccio multiple",
          eu: "Aukera anitza",
          gl: "Eleccion multiple",
          pt: "Escolha multipla",
          fr: "Choix multiple",
          de: "Multiple Choice",
          it: "Scelta multipla"
        },
        "Download source file": {
          es: "Descargar archivo fuente",
          en: "Download source file",
          ca: "Descarregar fitxer font",
          va: "Descarregar fitxer font",
          eu: "Deskargatu iturburu fitxategia",
          gl: "Descargar ficheiro fonte",
          pt: "Baixar arquivo fonte",
          fr: "Telecharger le fichier source",
          de: "Quelldatei herunterladen",
          it: "Scarica file sorgente"
        }
      };
    }
    /**
     * Get localized "Show Feedback" text based on language code
     */
    getLocalizedFeedbackText(langCode) {
      const lang = (langCode || "").split("-")[0].toLowerCase();
      return FEEDBACK_TRANSLATIONS[lang] || FEEDBACK_TRANSLATIONS.es;
    }
    /**
     * Get localized "Case Study" title based on language code
     */
    getLocalizedCaseStudyTitle(langCode) {
      return this.getLocalizedIdeviceTitle("Case Study", langCode) || "Caso practico";
    }
    /**
     * Get localized iDevice title based on English title and language code
     */
    getLocalizedIdeviceTitle(englishTitle, langCode) {
      const translations = _LegacyXmlParser.IDEVICE_TITLE_TRANSLATIONS[englishTitle];
      if (!translations) return null;
      const lang = (langCode || "").split("-")[0].toLowerCase();
      return translations[lang] || translations.es || englishTitle;
    }
    /**
     * Preprocess legacy XML content before parsing
     * Fixes encoding issues from eXe 2.x exports
     */
    preprocessLegacyXml(xmlContent) {
      let xml = xmlContent;
      xml = xml.replace(/ {5}/g, "");
      xml = xml.replace(/\t/g, "");
      xml = xml.replace(/\r/g, "\n");
      xml = xml.replace(/\n\n/g, "\n");
      xml = xml.replace(/\n/g, "&#10;");
      xml = xml.replace(/>&#10;</g, ">\n<");
      xml = xml.replace(/\\x([0-9A-Fa-f]{2})/g, (_match, hex) => {
        return String.fromCharCode(parseInt(hex, 16));
      });
      xml = xml.replace(/\\n/g, "&#10;");
      return xml;
    }
    /**
     * Parse legacy XML content and return normalized structure
     */
    parse(xmlContent) {
      this.logger.log("[LegacyXmlParser] Parsing legacy XML format");
      this.xmlContent = this.preprocessLegacyXml(xmlContent);
      const parser = new import_xmldom.DOMParser();
      this.xmlDoc = parser.parseFromString(this.xmlContent, "text/xml");
      const parseError = this.xmlDoc.getElementsByTagName("parsererror")[0];
      if (parseError) {
        throw new Error(`XML parsing error: ${parseError.textContent}`);
      }
      this.buildParentReferenceMap();
      const nodes = this.findAllNodes();
      this.logger.log(`[LegacyXmlParser] Found ${nodes.length} legacy nodes`);
      const meta = this.extractMetadata();
      this.projectLanguage = meta.language || "";
      const pages = this.buildPageHierarchy(nodes);
      const fullPathMap = this.buildFullPathMap(pages);
      this.convertAllInternalLinks(pages, fullPathMap);
      this.logger.log(`[LegacyXmlParser] Parse complete: ${pages.length} pages`);
      return {
        meta,
        pages
      };
    }
    /**
     * Build parent reference map from XML
     */
    buildParentReferenceMap() {
      if (!this.xmlDoc) return;
      const nodeInstances = this.getElementsByAttribute(this.xmlDoc, "instance", "class", "exe.engine.node.Node");
      for (const nodeEl of nodeInstances) {
        const ref = nodeEl.getAttribute("reference");
        if (!ref) continue;
        const dict = this.getDirectChildByTagName(nodeEl, "dictionary");
        if (!dict) continue;
        const parentRef = this.findDictValue(dict, "parent");
        this.parentRefMap.set(ref, parentRef);
      }
      this.logger.log(`[LegacyXmlParser] Built parent map with ${this.parentRefMap.size} entries`);
    }
    /**
     * Find value for a key in a dictionary element
     */
    findDictValue(dict, key) {
      const children = Array.from(dict.childNodes).filter((n) => n.nodeType === 1);
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        if (child.tagName === "string" && child.getAttribute("role") === "key" && child.getAttribute("value") === key) {
          const valueEl = children[i + 1];
          if (!valueEl) return null;
          if (valueEl.tagName === "none") {
            return null;
          }
          if (valueEl.tagName === "reference") {
            return valueEl.getAttribute("key");
          }
          if (valueEl.tagName === "unicode" || valueEl.tagName === "string") {
            return valueEl.getAttribute("value") || valueEl.textContent;
          }
          if (valueEl.tagName === "bool") {
            const boolVal = valueEl.getAttribute("value");
            return boolVal === "1" || boolVal === "True" || boolVal === "true";
          }
          if (valueEl.tagName === "instance") {
            return valueEl.getAttribute("reference");
          }
        }
      }
      return null;
    }
    /**
     * Find all Node instances in the document
     */
    findAllNodes() {
      if (!this.xmlDoc) return [];
      const allNodes = this.getElementsByAttribute(this.xmlDoc, "instance", "class", "exe.engine.node.Node");
      return allNodes.filter((nodeEl) => {
        const prevSibling = nodeEl.previousSibling;
        let prev = prevSibling;
        while (prev && prev.nodeType !== 1) {
          prev = prev.previousSibling;
        }
        const prevElement = prev;
        if (prevElement?.tagName === "string" && prevElement.getAttribute("role") === "key" && prevElement.getAttribute("value") === "parentNode") {
          const ref = nodeEl.getAttribute("reference");
          this.logger.log(`[LegacyXmlParser] Skipping parentNode reference=${ref} (not a real page)`);
          return false;
        }
        return true;
      });
    }
    /**
     * Extract metadata from root package
     */
    extractMetadata() {
      const meta = {
        title: "Legacy Project",
        author: "",
        description: "",
        language: "",
        license: "",
        footer: "",
        extraHeadContent: "",
        exportSource: false,
        pp_addPagination: false,
        pp_addSearchBox: false,
        pp_addExeLink: true,
        pp_addAccessibilityToolbar: false
      };
      if (!this.xmlDoc) return meta;
      const rootPackages = this.getElementsByAttribute(
        this.xmlDoc,
        "instance",
        "class",
        "exe.engine.package.Package"
      );
      const rootPackage = rootPackages[0];
      if (!rootPackage) return meta;
      const dict = this.getDirectChildByTagName(rootPackage, "dictionary");
      if (!dict) return meta;
      const title = this.findDictValue(dict, "_title");
      if (title && typeof title === "string") meta.title = title;
      const author = this.findDictValue(dict, "_author");
      if (author && typeof author === "string") meta.author = author;
      const description = this.findDictValue(dict, "_description");
      if (description && typeof description === "string") meta.description = description;
      const lang = this.findDictValue(dict, "_lang");
      if (lang && typeof lang === "string") meta.language = lang;
      const footer = this.findDictValue(dict, "footer");
      if (footer && typeof footer === "string") meta.footer = footer;
      const extraHeadContent = this.findDictValue(dict, "_extraHeadContent");
      if (extraHeadContent && typeof extraHeadContent === "string") meta.extraHeadContent = extraHeadContent;
      const addPagination = this.findDictValue(dict, "_addPagination");
      if (addPagination === true) meta.pp_addPagination = true;
      const addSearchBox = this.findDictValue(dict, "_addSearchBox");
      if (addSearchBox === true) meta.pp_addSearchBox = true;
      const exportSource = this.findDictValue(dict, "exportSource");
      if (exportSource === true) meta.exportSource = true;
      const addExeLink = this.findDictValue(dict, "_addExeLink");
      if (addExeLink === false) meta.pp_addExeLink = false;
      const addAccessibilityToolbar = this.findDictValue(dict, "_addAccessibilityToolbar");
      if (addAccessibilityToolbar === true) meta.pp_addAccessibilityToolbar = true;
      const license = this.findDictValue(dict, "license");
      if (license !== null && license !== void 0 && typeof license === "string") {
        meta.license = license === "None" ? "" : license;
      }
      this.logger.log(`[LegacyXmlParser] Metadata: title="${meta.title}", license="${meta.license}"`);
      return meta;
    }
    /**
     * Check if the structure should flatten root children
     */
    shouldFlattenRootChildren(rootPages) {
      if (rootPages.length !== 1) {
        return { shouldFlatten: false, rootPage: null };
      }
      const rootPage = rootPages[0];
      const hasDirectChildren = rootPage.children && rootPage.children.length > 0;
      return { shouldFlatten: hasDirectChildren, rootPage };
    }
    /**
     * Flatten root children for legacy v2.x imports
     */
    flattenRootChildren(rootPage) {
      const flatPages = [];
      flatPages.push({
        id: rootPage.id,
        title: rootPage.title,
        parent_id: null,
        position: 0,
        blocks: rootPage.blocks
      });
      if (rootPage.children) {
        rootPage.children.forEach((child) => {
          flatPages.push({
            id: child.id,
            title: child.title,
            parent_id: null,
            position: flatPages.length,
            blocks: child.blocks
          });
          if (child.children && child.children.length > 0) {
            this.flattenPages(child.children, flatPages, child.id);
          }
        });
      }
      this.logger.log(`[LegacyXmlParser] Applied root node flattening convention for v2.x import`);
      return flatPages;
    }
    /**
     * Build page hierarchy from Node instances
     */
    buildPageHierarchy(nodes) {
      const pageMap = /* @__PURE__ */ new Map();
      const rootPages = [];
      nodes.forEach((nodeEl, index) => {
        const ref = nodeEl.getAttribute("reference");
        if (!ref) return;
        const dict = this.getDirectChildByTagName(nodeEl, "dictionary");
        const titleValue = dict ? this.findDictValue(dict, "_title") : null;
        const title = typeof titleValue === "string" ? titleValue : "Untitled";
        const page = {
          id: `page-${ref}`,
          title,
          blocks: [],
          children: [],
          parent_id: null,
          position: index
        };
        page.blocks = this.extractNodeBlocks(nodeEl);
        pageMap.set(ref, page);
      });
      pageMap.forEach((page, ref) => {
        const parentRef = this.parentRefMap.get(ref);
        if (parentRef && pageMap.has(parentRef)) {
          const parent = pageMap.get(parentRef);
          parent.children.push(page);
          page.parent_id = parent.id;
        } else {
          rootPages.push(page);
        }
      });
      const { shouldFlatten, rootPage } = this.shouldFlattenRootChildren(rootPages);
      let flatPages;
      if (shouldFlatten && rootPage) {
        flatPages = this.flattenRootChildren(rootPage);
      } else {
        flatPages = [];
        this.flattenPages(rootPages, flatPages, null);
      }
      const nodesChangeRef = this.detectNodeReorderMap();
      if (nodesChangeRef.size > 0) {
        flatPages = this.applyNodeReordering(flatPages, nodesChangeRef);
      }
      return flatPages;
    }
    /**
     * Flatten page tree into array
     */
    flattenPages(pages, result, parentId) {
      pages.forEach((page) => {
        const flatPage = {
          id: page.id,
          title: page.title,
          parent_id: parentId,
          position: result.length,
          blocks: page.blocks
        };
        result.push(flatPage);
        if (page.children && page.children.length > 0) {
          this.flattenPages(page.children, result, page.id);
        }
      });
    }
    /**
     * Detect nodes needing reordering
     */
    detectNodeReorderMap() {
      const nodesChangeRef = /* @__PURE__ */ new Map();
      if (!this.xmlDoc) return nodesChangeRef;
      const allNodes = this.getElementsByAttribute(this.xmlDoc, "instance", "class", "exe.engine.node.Node");
      for (const node of allNodes) {
        const nodeRef = node.getAttribute("reference");
        if (!nodeRef) continue;
        const dict = this.getDirectChildByTagName(node, "dictionary");
        if (!dict) continue;
        const childrenList = this.findDictList(dict, "children");
        if (!childrenList) continue;
        let prevRef = parseInt(nodeRef, 10);
        const children = Array.from(childrenList.childNodes).filter((n) => n.nodeType === 1);
        for (const child of children) {
          if (child.tagName === "instance") {
            const instRef = child.getAttribute("reference");
            if (instRef) {
              prevRef = parseInt(instRef, 10);
            }
          } else if (child.tagName === "reference") {
            const refKey = parseInt(child.getAttribute("key") || "0", 10);
            nodesChangeRef.set(refKey, prevRef);
            prevRef = refKey;
          }
        }
      }
      if (nodesChangeRef.size > 0) {
        this.logger.log(`[LegacyXmlParser] Detected ${nodesChangeRef.size} nodes needing reordering`);
      }
      return nodesChangeRef;
    }
    /**
     * Apply node reordering
     */
    applyNodeReordering(pages, nodesChangeRef) {
      if (nodesChangeRef.size === 0) return pages;
      const pageRefMap = /* @__PURE__ */ new Map();
      for (const page of pages) {
        const ref = page.id.replace("page-", "");
        pageRefMap.set(parseInt(ref, 10), page);
      }
      for (const [oldRef, afterRef] of nodesChangeRef) {
        const pageToMove = pageRefMap.get(oldRef);
        const referencePoint = pageRefMap.get(afterRef);
        if (pageToMove && referencePoint) {
          pageToMove.position = referencePoint.position + 0.5;
        }
      }
      pages.sort((a, b) => a.position - b.position);
      pages.forEach((page, index) => {
        page.position = index;
      });
      this.logger.log(`[LegacyXmlParser] Reordered ${nodesChangeRef.size} nodes`);
      return pages;
    }
    /**
     * Build path map for internal link conversion
     */
    buildFullPathMap(pages) {
      const fullPathMap = /* @__PURE__ */ new Map();
      const pageIdMap = /* @__PURE__ */ new Map();
      for (const page of pages) {
        pageIdMap.set(page.id, {
          id: page.id,
          name: page.title,
          parent_id: page.parent_id
        });
      }
      for (const page of pages) {
        const pathParts = [page.title];
        let currentParentId = page.parent_id;
        while (currentParentId && pageIdMap.has(currentParentId)) {
          const parent = pageIdMap.get(currentParentId);
          pathParts.unshift(parent.name);
          currentParentId = parent.parent_id;
        }
        const fullPath = pathParts.join(":");
        fullPathMap.set(fullPath, page.id);
        try {
          const decodedPath = decodeURIComponent(fullPath);
          if (decodedPath !== fullPath) {
            fullPathMap.set(decodedPath, page.id);
          }
        } catch {
        }
      }
      const rootPage = pages.find((p) => p.parent_id === null && p.position === 0);
      if (rootPage) {
        const rootTitle = rootPage.title;
        const promotedChildren = pages.filter((p) => p.parent_id === null && p.id !== rootPage.id);
        for (const promoted of promotedChildren) {
          const pathWithRoot = `${rootTitle}:${promoted.title}`;
          if (!fullPathMap.has(pathWithRoot)) {
            fullPathMap.set(pathWithRoot, promoted.id);
            this.logger.log(`[LegacyXmlParser] Added root-prefixed path: ${pathWithRoot}`);
          }
        }
      }
      if (fullPathMap.size > 0) {
        this.logger.log(`[LegacyXmlParser] Built path map with ${fullPathMap.size} entries`);
      }
      return fullPathMap;
    }
    /**
     * Convert exe-node: links from path-based to ID-based
     */
    convertInternalLinks(html, fullPathMap) {
      if (!html || !html.includes("exe-node:")) return html;
      const EXE_NODE_PREFIX = "exe-node:";
      return html.replace(/href=["'](exe-node:[^"'#]+)(#[^"']*)?["']/gi, (match, linkPart, hashPart = "") => {
        const originalLink = linkPart;
        let cleanedLink = linkPart;
        try {
          cleanedLink = decodeURIComponent(cleanedLink);
        } catch {
        }
        let pathOnly = cleanedLink.replace(EXE_NODE_PREFIX, "");
        const segments = pathOnly.split(":");
        if (segments.length > 1) {
          const pathWithoutRoot = segments.slice(1).join(":");
          if (fullPathMap.has(pathWithoutRoot)) {
            pathOnly = pathWithoutRoot;
          }
        }
        if (fullPathMap.has(pathOnly)) {
          const pageId = fullPathMap.get(pathOnly);
          const newLink = `${EXE_NODE_PREFIX}${pageId}`;
          this.logger.log(`[LegacyXmlParser] Converted link: ${originalLink} -> ${newLink}`);
          let finalHash = hashPart || "";
          if (finalHash === "#auto_top") {
            finalHash = "";
          }
          return `href="${newLink}${finalHash}"`;
        }
        this.logger.log(`[LegacyXmlParser] Link not found in path map: ${pathOnly}`);
        return match;
      });
    }
    /**
     * Recursively convert internal links in object properties
     */
    convertLinksInObject(obj, fullPathMap) {
      if (!obj || typeof obj !== "object") return;
      if (Array.isArray(obj)) {
        for (let i = 0; i < obj.length; i++) {
          if (typeof obj[i] === "string" && obj[i].includes("exe-node:")) {
            obj[i] = this.convertInternalLinks(obj[i], fullPathMap);
          } else if (typeof obj[i] === "object") {
            this.convertLinksInObject(obj[i], fullPathMap);
          }
        }
      } else {
        for (const key of Object.keys(obj)) {
          const value = obj[key];
          if (typeof value === "string" && value.includes("exe-node:")) {
            obj[key] = this.convertInternalLinks(value, fullPathMap);
          } else if (typeof value === "object") {
            this.convertLinksInObject(value, fullPathMap);
          }
        }
      }
    }
    /**
     * Convert all internal links in all iDevices
     */
    convertAllInternalLinks(pages, fullPathMap) {
      if (fullPathMap.size === 0) return pages;
      let convertedCount = 0;
      for (const page of pages) {
        if (!page.blocks) continue;
        for (const block of page.blocks) {
          if (!block.idevices) continue;
          for (const idevice of block.idevices) {
            if (idevice.htmlView?.includes("exe-node:")) {
              const converted = this.convertInternalLinks(idevice.htmlView, fullPathMap);
              if (converted !== idevice.htmlView) {
                idevice.htmlView = converted;
                convertedCount++;
              }
            }
            if (idevice.feedbackHtml?.includes("exe-node:")) {
              idevice.feedbackHtml = this.convertInternalLinks(idevice.feedbackHtml, fullPathMap);
            }
            if (idevice.properties) {
              this.convertLinksInObject(idevice.properties, fullPathMap);
            }
          }
        }
      }
      if (convertedCount > 0) {
        this.logger.log(`[LegacyXmlParser] Converted ${convertedCount} internal links`);
      }
      return pages;
    }
    /**
     * Extract iDevice title from instance
     */
    extractIdeviceTitle(inst) {
      const dict = this.getDirectChildByTagName(inst, "dictionary");
      if (!dict) return "";
      const titleValue = this.findDictValue(dict, "_title") || this.findDictValue(dict, "title");
      return titleValue && typeof titleValue === "string" && titleValue.trim() ? titleValue : "";
    }
    /**
     * Extract blocks and iDevices from a Node
     */
    extractNodeBlocks(nodeEl) {
      const blocks = [];
      const dict = this.getDirectChildByTagName(nodeEl, "dictionary");
      if (!dict) return blocks;
      const children = Array.from(dict.childNodes).filter((n) => n.nodeType === 1);
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        if (child.tagName === "string" && child.getAttribute("role") === "key" && child.getAttribute("value") === "idevices") {
          const listEl = children[i + 1];
          if (listEl && listEl.tagName === "list") {
            const idevices = this.extractIDevicesWithTitles(listEl);
            idevices.forEach((idevice, idx) => {
              const title = idevice.title || "";
              const blockName = title === "Free Text" ? "" : title;
              const block = {
                id: `block-${nodeEl.getAttribute("reference")}-${idx}`,
                name: blockName,
                iconName: idevice.icon || "",
                position: idx,
                idevices: [idevice]
              };
              if (idevice.blockProperties) {
                block.blockProperties = idevice.blockProperties;
              }
              blocks.push(block);
            });
          }
          break;
        }
      }
      return blocks;
    }
    /**
     * Map legacy iDevice class names to modern types
     */
    mapIdeviceType(className) {
      const textBasedIdevices = [
        "FreeTextIdevice",
        "FreeTextfpdIdevice",
        "GenericIdevice",
        "TextIdevice",
        "ActivityIdevice",
        "TaskIdevice",
        "ObjectivesIdevice",
        "PreknowledgeIdevice",
        "ReadingActivityIdevice",
        "ReflectionIdevice",
        "ReflectionfpdIdevice",
        "ReflectionfpdmodifIdevice",
        "TareasIdevice",
        "ListaApartadosIdevice",
        "ComillasIdevice",
        "NotaInformacionIdevice",
        "NotaIdevice",
        "CasopracticofpdIdevice",
        "CitasparapensarfpdIdevice",
        "DebesconocerfpdIdevice",
        "DestacadofpdIdevice",
        "OrientacionestutoriafpdIdevice",
        "OrientacionesalumnadofpdIdevice",
        "ParasabermasfpdIdevice",
        "RecomendacionfpdIdevice",
        "WikipediaIdevice",
        "RssIdevice",
        "AppletIdevice",
        "FileAttachIdevice",
        "AttachmentIdevice"
      ];
      for (const textType of textBasedIdevices) {
        if (className.includes(textType)) {
          this.logger.log(`[LegacyXmlParser] Converting ${textType} to 'text' for editability`);
          return "text";
        }
      }
      const interactiveTypeMap = {
        TrueFalseIdevice: "trueorfalse",
        VerdaderofalsofpdIdevice: "trueorfalse",
        MultichoiceIdevice: "form",
        EleccionmultiplefpdIdevice: "form",
        MultiSelectIdevice: "form",
        SeleccionmultiplefpdIdevice: "form",
        ClozeIdevice: "complete",
        ClozefpdIdevice: "complete",
        ClozelangfpdIdevice: "complete",
        ImageMagnifierIdevice: "magnifier",
        GalleryIdevice: "image-gallery",
        CasestudyIdevice: "casestudy",
        EjercicioresueltofpdIdevice: "casestudy",
        ExternalUrlIdevice: "external-website",
        QuizTestIdevice: "quick-questions"
      };
      for (const [legacyType, modernType] of Object.entries(interactiveTypeMap)) {
        if (className.includes(legacyType)) {
          this.logger.log(`[LegacyXmlParser] Mapping ${legacyType} to '${modernType}'`);
          return modernType;
        }
      }
      const match = className.match(/(\w+)Idevice/);
      const extractedType = match ? match[1].toLowerCase() : "unknown";
      this.logger.log(`[LegacyXmlParser] Unknown iDevice '${extractedType}' -> converting to 'text' for editability`);
      return "text";
    }
    /**
     * Extract iDevices from a list element, including their titles
     */
    extractIDevicesWithTitles(listEl) {
      const idevices = [];
      const directChildren = Array.from(listEl.childNodes).filter((n) => n.nodeType === 1);
      const instancesToProcess = [];
      for (const child of directChildren) {
        if (child.tagName === "instance") {
          instancesToProcess.push(child);
        } else if (child.tagName === "reference") {
          const refKey = child.getAttribute("key");
          if (refKey && this.xmlDoc) {
            const referencedInstance = this.getElementsByAttribute(
              this.xmlDoc,
              "instance",
              "reference",
              refKey
            )[0];
            if (referencedInstance) {
              this.logger.log(`[LegacyXmlParser] Resolved reference key=${refKey} to instance`);
              instancesToProcess.push(referencedInstance);
            } else {
              this.logger.log(
                `[LegacyXmlParser] WARNING: Could not find instance for reference key=${refKey}`
              );
            }
          }
        }
      }
      this.logger.log(
        `[LegacyXmlParser] Found ${instancesToProcess.length} iDevice elements (${directChildren.filter((c) => c.tagName === "instance").length} direct, ${directChildren.filter((c) => c.tagName === "reference").length} references)`
      );
      for (const inst of instancesToProcess) {
        const className = inst.getAttribute("class") || "";
        if (!className.toLowerCase().includes("idevice")) {
          this.logger.log(`[LegacyXmlParser] SKIPPING instance - no 'idevice' in class: ${className}`);
          continue;
        }
        const ref = inst.getAttribute("reference") || `idev-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
        const dict = this.getDirectChildByTagName(inst, "dictionary");
        let ideviceType;
        let rawIdeviceDir = "";
        if (className === "exe.engine.jsidevice.JsIdevice" && dict) {
          const iDeviceDir = this.findDictStringValue(dict, "_iDeviceDir");
          if (iDeviceDir) {
            const parts = iDeviceDir.replace(/\\/g, "/").split("/");
            const extractedType = parts[parts.length - 1] || iDeviceDir;
            rawIdeviceDir = extractedType;
            const jsIdeviceTypeMap = {
              "adivina-activity": "guess",
              "candado-activity": "padlock",
              "clasifica-activity": "classify",
              "completa-activity": "complete",
              "desafio-activity": "challenge",
              "descubre-activity": "discover",
              "flipcards-activity": "flipcards",
              "identifica-activity": "identify",
              "listacotejo-activity": "checklist",
              "mapa-activity": "map",
              "mathematicaloperations-activity": "mathematicaloperations",
              "mathproblems-activity": "mathproblems",
              "ordena-activity": "sort",
              "quext-activity": "quick-questions",
              "relaciona-activity": "relate",
              "rosco-activity": "az-quiz-game",
              "selecciona-activity": "quick-questions-multiple-choice",
              "seleccionamedias-activity": "select-media-files",
              "sopa-activity": "word-search",
              "trivial-activity": "trivial",
              "videoquext-activity": "quick-questions-video",
              "download-package": "download-source-file",
              "form-activity": "form",
              rubrics: "rubric",
              "pbl-tools": "text"
            };
            ideviceType = jsIdeviceTypeMap[extractedType] || extractedType;
            const knownModernTypes = [
              "text",
              "casestudy",
              "geogebra-activity",
              "interactive-video",
              "scrambled-list",
              "udl-content",
              "image-gallery",
              "beforeafter",
              "dragdrop",
              "external-website",
              "hidden-image",
              "magnifier",
              "periodic-table",
              "trueorfalse",
              "example"
            ];
            const allKnownTypes = [...Object.values(jsIdeviceTypeMap), ...knownModernTypes];
            if (!allKnownTypes.includes(ideviceType)) {
              this.logger.log(
                `[LegacyXmlParser] Unknown JsIdevice type '${extractedType}', defaulting to 'text'`
              );
              ideviceType = "text";
            }
            this.logger.log(
              `[LegacyXmlParser] JsIdevice detected with type: ${ideviceType} (from path: ${iDeviceDir})`
            );
          } else {
            ideviceType = "text";
          }
        } else if (this.isGenericIdeviceClass(className) && dict) {
          const typeName = this.findDictStringValue(dict, "__name__");
          if (typeName) {
            ideviceType = this.mapGenericIdeviceType(typeName);
            this.logger.log(
              `[LegacyXmlParser] Generic Idevice detected with type: ${typeName} -> ${ideviceType}`
            );
          } else {
            ideviceType = "text";
            this.logger.log(`[LegacyXmlParser] Generic Idevice without __name__, defaulting to 'text'`);
          }
        } else {
          ideviceType = this.mapIdeviceType(className);
        }
        let title = this.extractIdeviceTitle(inst);
        if (className.toLowerCase().includes("ejercicioresueltofpdidevice") && title === "Translation") {
          title = this.getLocalizedCaseStudyTitle(this.projectLanguage);
          this.logger.log(
            `[LegacyXmlParser] Fixed EjercicioresueltofpdIdevice title: "Translation" -> "${title}"`
          );
        }
        if (className.toLowerCase().includes("casestudyidevice") && title === "Case Study") {
          title = this.getLocalizedCaseStudyTitle(this.projectLanguage);
          this.logger.log(`[LegacyXmlParser] Fixed CasestudyIdevice title: "Case Study" -> "${title}"`);
        }
        const localizedTitle = this.getLocalizedIdeviceTitle(title, this.projectLanguage);
        if (localizedTitle && localizedTitle !== title) {
          this.logger.log(`[LegacyXmlParser] Translated iDevice title: "${title}" -> "${localizedTitle}"`);
          title = localizedTitle;
        }
        let iconName = "";
        if (dict) {
          const rawIcon = this.findDictStringValue(dict, "icon");
          if (rawIcon) {
            iconName = _LegacyXmlParser.LEGACY_ICON_MAP[rawIcon] || rawIcon;
            this.logger.log(`[LegacyXmlParser] iDevice icon: ${rawIcon} -> ${iconName}`);
          }
        }
        const idevice = {
          id: `idevice-${ref}`,
          type: ideviceType,
          title,
          icon: iconName,
          position: idevices.length,
          htmlView: "",
          feedbackHtml: "",
          feedbackButton: ""
        };
        if (dict) {
          const fieldsResult = this.extractFieldsContentWithFeedback(dict);
          if (fieldsResult.content) {
            idevice.htmlView = fieldsResult.content;
          }
          if (fieldsResult.feedbackHtml) {
            idevice.feedbackHtml = fieldsResult.feedbackHtml;
            idevice.feedbackButton = fieldsResult.feedbackButton;
          }
          if (!idevice.feedbackHtml) {
            const answerFeedback = this.extractReflectionFeedback(dict);
            if (answerFeedback.content) {
              idevice.feedbackHtml = answerFeedback.content;
              idevice.feedbackButton = answerFeedback.buttonCaption;
            }
          }
          if (!idevice.htmlView) {
            const contentFields = [
              "content",
              "_content",
              "_html",
              "htmlView",
              "story",
              "_story",
              "text",
              "_text"
            ];
            for (const field of contentFields) {
              const content = this.extractRichTextContent(dict, field);
              if (content) {
                idevice.htmlView = content;
                break;
              }
            }
          }
          if (!idevice.htmlView) {
            idevice.htmlView = this.extractAnyTextFieldContent(dict);
          }
          if (!idevice.htmlView && className.includes("FreeTextIdevice")) {
            const parentTextArea = this.findParentTextAreaField(inst);
            if (parentTextArea) {
              idevice.htmlView = this.extractTextFieldContent(parentTextArea);
              if (idevice.htmlView) {
                this.logger.log(`[LegacyXmlParser] FreeTextIdevice content from parent TextAreaField`);
              }
            }
          }
          const handler = LegacyHandlerRegistry.getHandler(className, rawIdeviceDir || ideviceType);
          const handlerContext = {
            language: this.projectLanguage,
            ideviceId: idevice.id,
            className,
            ideviceType: rawIdeviceDir || ideviceType
          };
          const handlerProps = handler.extractProperties(dict, idevice.id);
          if (handlerProps && Object.keys(handlerProps).length > 0) {
            idevice.properties = handlerProps;
            this.logger.log(
              `[LegacyXmlParser] Extracted properties via ${handler.constructor.name} (${Object.keys(handlerProps).length} keys)`
            );
          }
          const handlerHtml = handler.extractHtmlView(dict, handlerContext);
          if (handlerHtml) {
            idevice.htmlView = handlerHtml;
            this.logger.log(`[LegacyXmlParser] Used handler htmlView (${handlerHtml.length} chars)`);
          }
          const handlerFeedback = handler.extractFeedback(dict, handlerContext);
          if (handlerFeedback.content) {
            idevice.feedbackHtml = handlerFeedback.content;
            idevice.feedbackButton = handlerFeedback.buttonCaption;
            this.logger.log(`[LegacyXmlParser] Extracted feedback via handler`);
          }
          const handlerType = handler.getTargetType();
          if (handlerType && handlerType !== "text" && handlerType !== idevice.type) {
            this.logger.log(`[LegacyXmlParser] Handler updated type: ${idevice.type} -> ${handlerType}`);
            idevice.type = handlerType;
          }
          if (typeof handler.getBlockProperties === "function") {
            const blockProps = handler.getBlockProperties();
            if (blockProps && Object.keys(blockProps).length > 0) {
              idevice.blockProperties = blockProps;
              this.logger.log(`[LegacyXmlParser] Handler block properties:`, blockProps);
            }
          }
        }
        if (idevice.htmlView) {
          if (idevice.htmlView.includes("exe-rubric-strings")) {
            idevice.type = "rubric";
            idevice.htmlView = idevice.htmlView.replace(/exe-rubric([^s])/g, "exe-rubrics$1");
            idevice.cssClass = "rubric";
            this.logger.log("[LegacyXmlParser] Detected rubric iDevice, transformed to modern format");
          }
          if (idevice.htmlView.includes("exe-udlContent")) {
            idevice.type = "udl-content";
            this.logger.log("[LegacyXmlParser] Detected UDL content iDevice");
          }
          if (idevice.htmlView.includes("exe-sortableList")) {
            idevice.type = "scrambled-list";
            this.logger.log("[LegacyXmlParser] Detected scrambled-list iDevice");
          }
          if (idevice.htmlView.includes("exe-download-package-instructions")) {
            idevice.type = "download-source-file";
            idevice.htmlView = idevice.htmlView.replace(/\.elp([^x])/gi, ".elpx$1").replace(/\.elp(['"])/gi, ".elpx$1").replace(/\.elp(<)/gi, ".elpx$1").replace(/\.elp$/gi, ".elpx");
            this.logger.log("[LegacyXmlParser] Detected download-source-file iDevice, converted .elp to .elpx");
          }
          if (idevice.htmlView.includes("exe-interactive-video")) {
            idevice.type = "interactive-video";
            this.logger.log("[LegacyXmlParser] Detected interactive-video iDevice");
          }
          if (idevice.htmlView.includes("auto-geogebra")) {
            idevice.type = "geogebra-activity";
            this.logger.log("[LegacyXmlParser] Detected geogebra-activity iDevice");
          }
          if (idevice.htmlView.includes("pbl-task-description")) {
            const pblTaskData = this.extractPblTaskMetadata(idevice.htmlView);
            if (pblTaskData) {
              if (pblTaskData.rebuiltHtmlView) {
                idevice.htmlView = pblTaskData.rebuiltHtmlView;
                delete pblTaskData.rebuiltHtmlView;
              }
              idevice.properties = { ...idevice.properties, ...pblTaskData };
              this.logger.log("[LegacyXmlParser] Detected PBL Task iDevice, extracted metadata");
            }
          }
        }
        idevices.push(idevice);
      }
      this.logger.log(`[LegacyXmlParser] Extracted ${idevices.length} iDevices with titles`);
      return idevices;
    }
    /**
     * Find a string value in dictionary by key
     */
    findDictStringValue(dict, key) {
      const children = Array.from(dict.childNodes).filter((n) => n.nodeType === 1);
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        if (child.tagName === "string" && child.getAttribute("role") === "key" && child.getAttribute("value") === key) {
          const valueEl = children[i + 1];
          if (valueEl && (valueEl.tagName === "string" || valueEl.tagName === "unicode")) {
            return valueEl.getAttribute("value") || valueEl.textContent || null;
          }
        }
      }
      return null;
    }
    /**
     * Find a list element in dictionary by key
     */
    findDictList(dict, key) {
      const children = Array.from(dict.childNodes).filter((n) => n.nodeType === 1);
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        if (child.tagName === "string" && child.getAttribute("role") === "key" && child.getAttribute("value") === key) {
          const valueEl = children[i + 1];
          if (valueEl && valueEl.tagName === "list") {
            return valueEl;
          }
        }
      }
      return null;
    }
    /**
     * Extract PBL Task metadata from HTML content
     */
    extractPblTaskMetadata(htmlView) {
      if (!htmlView) return null;
      try {
        const parser = new import_xmldom.DOMParser();
        const htmlDoc = parser.parseFromString(`<div>${htmlView}</div>`, "text/html");
        const tempDiv = htmlDoc.documentElement;
        const durationLabel = this.getElementByClassName(tempDiv, "dt", "pbl-task-duration");
        const durationValue = this.getElementByClassName(tempDiv, "dd", "pbl-task-duration");
        const participantsLabel = this.getElementByClassName(tempDiv, "dt", "pbl-task-participants");
        const participantsValue = this.getElementByClassName(tempDiv, "dd", "pbl-task-participants");
        const feedbackDiv = this.getElementByClassName(tempDiv, "div", "feedback");
        const feedbackButton = this.getElementByClassName(tempDiv, "input", "feedbackbutton");
        const taskDescriptionDiv = this.getElementByClassName(tempDiv, "div", "pbl-task-description");
        const taskDurationInput = durationLabel?.textContent?.trim() || "";
        const taskDuration = durationValue?.textContent?.trim() || "";
        const taskParticipantsInput = participantsLabel?.textContent?.trim() || "";
        const taskParticipants = participantsValue?.textContent?.trim() || "";
        const textButtonFeedback = feedbackButton?.getAttribute("value") || feedbackButton?.textContent?.trim() || "";
        const textFeedback = this.getInnerHtml(feedbackDiv) || "";
        const taskContent = this.getInnerHtml(taskDescriptionDiv) || "";
        const metadata = {
          textInfoDurationTextInput: taskDurationInput,
          textInfoDurationInput: taskDuration,
          textInfoParticipantsTextInput: taskParticipantsInput,
          textInfoParticipantsInput: taskParticipants,
          textFeedbackInput: textButtonFeedback,
          textFeedbackTextarea: textFeedback
        };
        let rebuiltHtmlView = "";
        if (taskDuration || taskParticipants) {
          rebuiltHtmlView += "<dl>";
          rebuiltHtmlView += `<div class="inline"><dt><span title="${this.escapeHtmlAttr(taskDurationInput)}">${this.escapeHtml(taskDurationInput)}</span></dt>`;
          rebuiltHtmlView += `<dd>${this.escapeHtml(taskDuration)}</dd></div>`;
          rebuiltHtmlView += `<div class="inline"><dt><span title="${this.escapeHtmlAttr(taskParticipantsInput)}">${this.escapeHtml(taskParticipantsInput)}</span></dt>`;
          rebuiltHtmlView += `<dd>${this.escapeHtml(taskParticipants)}</dd></div>`;
          rebuiltHtmlView += "</dl>";
        }
        rebuiltHtmlView += taskContent;
        if (textButtonFeedback) {
          rebuiltHtmlView += '<div class="iDevice_buttons feedback-button js-required">';
          rebuiltHtmlView += `<input type="button" class="feedbacktooglebutton" value="${this.escapeHtmlAttr(textButtonFeedback)}" `;
          rebuiltHtmlView += `data-text-a="${this.escapeHtmlAttr(textButtonFeedback)}" data-text-b="${this.escapeHtmlAttr(textButtonFeedback)}">`;
          rebuiltHtmlView += "</div>";
          rebuiltHtmlView += `<div class="feedback js-feedback js-hidden" style="display: none;">${textFeedback}</div>`;
        }
        rebuiltHtmlView = `<div class="exe-text-activity">${rebuiltHtmlView}</div>`;
        metadata.rebuiltHtmlView = rebuiltHtmlView;
        return metadata;
      } catch (e) {
        this.logger.log(`[LegacyXmlParser] Error extracting PBL Task metadata: ${e.message}`);
        return null;
      }
    }
    /**
     * Escape HTML special characters
     */
    escapeHtml(str) {
      if (!str) return "";
      return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }
    /**
     * Escape HTML special characters for attributes
     */
    escapeHtmlAttr(str) {
      if (!str) return "";
      return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
    }
    /**
     * Extract content and feedback from "fields" list
     */
    extractFieldsContentWithFeedback(dict) {
      const contents = [];
      let feedbackHtml = "";
      let feedbackButton = "";
      const children = Array.from(dict.childNodes).filter((n) => n.nodeType === 1);
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        if (child.tagName === "string" && child.getAttribute("role") === "key" && child.getAttribute("value") === "fields") {
          const listEl = children[i + 1];
          if (listEl && listEl.tagName === "list") {
            const directChildren = Array.from(listEl.childNodes).filter((n) => n.nodeType === 1);
            const fieldInstances = [];
            for (const fieldChild of directChildren) {
              if (fieldChild.tagName === "instance") {
                fieldInstances.push(fieldChild);
              } else if (fieldChild.tagName === "reference") {
                const refKey = fieldChild.getAttribute("key");
                if (refKey && this.xmlDoc) {
                  const referencedInstance = this.getElementsByAttribute(
                    this.xmlDoc,
                    "instance",
                    "reference",
                    refKey
                  )[0];
                  if (referencedInstance) {
                    this.logger.log(`[LegacyXmlParser] Resolved field reference key=${refKey}`);
                    fieldInstances.push(referencedInstance);
                  }
                }
              }
            }
            for (const fieldInst of fieldInstances) {
              const fieldClass = fieldInst.getAttribute("class") || "";
              if (fieldClass.includes("TextAreaField") || fieldClass.includes("TextField")) {
                const content = this.extractTextAreaFieldContent(fieldInst);
                if (content) {
                  contents.push(content);
                }
              }
              if (fieldClass.includes("FeedbackField")) {
                const feedback = this.extractFeedbackFieldContent(fieldInst);
                if (feedback.content) {
                  feedbackHtml = feedback.content;
                  feedbackButton = feedback.buttonCaption;
                }
              }
            }
          }
          break;
        }
      }
      return {
        content: contents.join("\n"),
        feedbackHtml,
        feedbackButton
      };
    }
    /**
     * Extract content from a FeedbackField instance
     */
    extractFeedbackFieldContent(fieldInst) {
      const dict = this.getDirectChildByTagName(fieldInst, "dictionary");
      if (!dict) return { content: "", buttonCaption: "" };
      const children = Array.from(dict.childNodes).filter((n) => n.nodeType === 1);
      let content = "";
      let buttonCaption = "";
      const contentKeys = ["feedback", "content_w_resourcePaths", "_content", "content"];
      for (const targetKey of contentKeys) {
        if (content) break;
        for (let i = 0; i < children.length; i++) {
          const child = children[i];
          if (child.tagName === "string" && child.getAttribute("role") === "key" && child.getAttribute("value") === targetKey) {
            const valueEl = children[i + 1];
            if (valueEl && valueEl.tagName === "unicode") {
              const value = valueEl.getAttribute("value") || valueEl.textContent || "";
              if (value.trim()) {
                content = this.decodeHtmlContent(value);
                break;
              }
            }
          }
        }
      }
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        if (child.tagName === "string" && child.getAttribute("role") === "key" && child.getAttribute("value") === "_buttonCaption") {
          const valueEl = children[i + 1];
          if (valueEl && (valueEl.tagName === "unicode" || valueEl.tagName === "string")) {
            buttonCaption = valueEl.getAttribute("value") || valueEl.textContent || "";
            break;
          }
        }
      }
      const defaultCaption = this.getLocalizedFeedbackText(this.projectLanguage);
      return {
        content,
        buttonCaption: buttonCaption || defaultCaption
      };
    }
    /**
     * Extract content from a TextAreaField instance
     */
    extractTextAreaFieldContent(fieldInst) {
      const dict = this.getDirectChildByTagName(fieldInst, "dictionary");
      if (!dict) return "";
      const children = Array.from(dict.childNodes).filter((n) => n.nodeType === 1);
      const contentKeys = ["content_w_resourcePaths", "_content", "content"];
      for (const targetKey of contentKeys) {
        for (let i = 0; i < children.length; i++) {
          const child = children[i];
          if (child.tagName === "string" && child.getAttribute("role") === "key" && child.getAttribute("value") === targetKey) {
            const valueEl = children[i + 1];
            if (valueEl && valueEl.tagName === "unicode") {
              const value = valueEl.getAttribute("value") || valueEl.textContent || "";
              if (value.trim()) {
                return this.decodeHtmlContent(value);
              }
            }
          }
        }
      }
      return "";
    }
    /**
     * Extract rich text content from a dictionary field
     */
    extractRichTextContent(dict, fieldName) {
      const children = Array.from(dict.childNodes).filter((n) => n.nodeType === 1);
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        if (child.tagName === "string" && child.getAttribute("role") === "key" && child.getAttribute("value") === fieldName) {
          const valueEl = children[i + 1];
          if (!valueEl) return "";
          if (valueEl.tagName === "unicode" || valueEl.tagName === "string") {
            return this.decodeHtmlContent(valueEl.getAttribute("value") || valueEl.textContent || "");
          }
          if (valueEl.tagName === "instance") {
            return this.extractTextFieldContent(valueEl);
          }
          if (valueEl.tagName === "reference") {
            const refKey = valueEl.getAttribute("key");
            if (refKey && this.xmlDoc) {
              const referencedInstance = this.getElementsByAttribute(
                this.xmlDoc,
                "instance",
                "reference",
                refKey
              )[0];
              if (referencedInstance) {
                const refClass = referencedInstance.getAttribute("class") || "";
                if (refClass.includes("TextAreaField") || refClass.includes("TextField")) {
                  this.logger.log(`[LegacyXmlParser] Resolved content reference key=${refKey}`);
                  return this.extractTextFieldContent(referencedInstance);
                }
              }
            }
          }
        }
      }
      return "";
    }
    /**
     * Extract content from a TextField instance
     */
    extractTextFieldContent(fieldInst) {
      const dict = this.getDirectChildByTagName(fieldInst, "dictionary");
      if (!dict) return "";
      const children = Array.from(dict.childNodes).filter((n) => n.nodeType === 1);
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        if (child.tagName === "string" && child.getAttribute("role") === "key" && child.getAttribute("value") === "content_w_resourcePaths") {
          const valueEl = children[i + 1];
          if (valueEl && (valueEl.tagName === "unicode" || valueEl.tagName === "string")) {
            const content = this.decodeHtmlContent(valueEl.getAttribute("value") || valueEl.textContent || "");
            if (content) return content;
          }
        }
      }
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        if (child.tagName === "string" && child.getAttribute("role") === "key") {
          const keyValue = child.getAttribute("value");
          if (keyValue === "_content" || keyValue === "content") {
            const valueEl = children[i + 1];
            if (valueEl && (valueEl.tagName === "unicode" || valueEl.tagName === "string")) {
              const content = this.decodeHtmlContent(
                valueEl.getAttribute("value") || valueEl.textContent || ""
              );
              if (content) return content;
            }
          }
        }
      }
      return "";
    }
    /**
     * Try to extract content from any TextField-like instance
     */
    extractAnyTextFieldContent(dict) {
      const instances = this.getElementsByTagName(dict, "instance");
      for (const inst of instances) {
        if (inst.parentNode !== dict) continue;
        const className = inst.getAttribute("class") || "";
        if (className.toLowerCase().includes("field") || className.toLowerCase().includes("text")) {
          const content = this.extractTextFieldContent(inst);
          if (content) return content;
        }
      }
      return "";
    }
    /**
     * Extract feedback from ReflectionIdevice-style structure
     */
    extractReflectionFeedback(dict) {
      const children = Array.from(dict.childNodes).filter((n) => n.nodeType === 1);
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        if (child.tagName === "string" && child.getAttribute("role") === "key" && child.getAttribute("value") === "answerTextArea") {
          const valueEl = children[i + 1];
          if (valueEl && valueEl.tagName === "instance") {
            const fieldDict = this.getDirectChildByTagName(valueEl, "dictionary");
            if (fieldDict) {
              const buttonCaption = this.findDictStringValue(fieldDict, "buttonCaption") || "";
              const content = this.extractTextAreaFieldContent(valueEl);
              if (content) {
                const defaultCaption = this.getLocalizedFeedbackText(this.projectLanguage);
                return {
                  content,
                  buttonCaption: buttonCaption || defaultCaption
                };
              }
            }
          }
        }
      }
      return { content: "", buttonCaption: "" };
    }
    /**
     * Decode HTML-encoded content (environment agnostic)
     */
    decodeHtmlContent(text) {
      if (!text) return "";
      return text.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&apos;/g, "'").replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCharCode(parseInt(hex, 16))).replace(/&#(\d+);/g, (_, dec) => String.fromCharCode(parseInt(dec, 10)));
    }
    /**
     * Find the parent TextAreaField that contains this iDevice instance
     */
    findParentTextAreaField(ideviceInst) {
      if (!ideviceInst) return null;
      const parentDict = ideviceInst.parentNode;
      if (parentDict && parentDict.tagName === "dictionary") {
        const parentInst = parentDict.parentNode;
        if (parentInst && parentInst.tagName === "instance") {
          const parentClass = parentInst.getAttribute("class") || "";
          if (parentClass.includes("TextAreaField")) {
            return parentInst;
          }
        }
      }
      return null;
    }
    /**
     * Check if class is a generic Idevice class
     */
    isGenericIdeviceClass(className) {
      return className.endsWith(".Idevice") && !className.startsWith("exe.engine.");
    }
    /**
     * Map generic iDevice type names to modern types
     */
    mapGenericIdeviceType(typeName) {
      const typeMap = {};
      return typeMap[typeName.toLowerCase()] || "text";
    }
    // =========================================================================
    // DOM Query Helpers (compatible with @xmldom/xmldom)
    // Note: @xmldom/xmldom doesn't support querySelector/querySelectorAll
    // =========================================================================
    /**
     * Get elements by tag name
     */
    getElementsByTagName(parent, tagName) {
      const elements = parent.getElementsByTagName(tagName);
      return Array.from(elements);
    }
    /**
     * Get elements by attribute value
     */
    getElementsByAttribute(parent, tagName, attrName, attrValue) {
      const elements = this.getElementsByTagName(parent, tagName);
      return elements.filter((el) => el.getAttribute(attrName) === attrValue);
    }
    /**
     * Get direct child element by tag name
     */
    getDirectChildByTagName(parent, tagName) {
      const children = Array.from(parent.childNodes).filter((n) => n.nodeType === 1);
      return children.find((el) => el.tagName === tagName) || null;
    }
    /**
     * Get element by class name (simple implementation)
     */
    getElementByClassName(parent, tagName, className) {
      const elements = this.getElementsByTagName(parent, tagName);
      return elements.find((el) => (el.getAttribute("class") || "").split(/\s+/).includes(className)) || null;
    }
    /**
     * Get inner HTML of an element (environment agnostic)
     */
    getInnerHtml(element) {
      if (!element) return "";
      const children = Array.from(element.childNodes);
      return children.map((node) => {
        if (node.nodeType === 3) {
          return node.textContent || "";
        } else if (node.nodeType === 1) {
          const el = node;
          const tagName = el.tagName.toLowerCase();
          const attrs = [];
          if (el.attributes) {
            for (let i = 0; i < el.attributes.length; i++) {
              const attr = el.attributes[i];
              attrs.push(`${attr.name}="${attr.value}"`);
            }
          }
          const attrStr = attrs.length > 0 ? " " + attrs.join(" ") : "";
          const innerHtml = this.getInnerHtml(el);
          if (["br", "hr", "img", "input"].includes(tagName)) {
            return `<${tagName}${attrStr} />`;
          }
          return `<${tagName}${attrStr}>${innerHtml}</${tagName}>`;
        }
        return "";
      }).join("");
    }
  };

  // src/shared/import/ElpxImporter.ts
  var ElpxImporter = class {
    /**
     * Create a new ElpxImporter
     * @param ydoc - Yjs document to populate
     * @param assetHandler - Asset handler for storing assets (optional)
     * @param logger - Logger for debug output (optional)
     */
    constructor(ydoc, assetHandler = null, logger = defaultLogger) {
      this.assetMap = /* @__PURE__ */ new Map();
      this.onProgress = null;
      this.ydoc = ydoc;
      this.assetHandler = assetHandler;
      this.logger = logger;
    }
    // =========================================================================
    // DOM Query Helpers (compatible with @xmldom/xmldom)
    // Note: @xmldom/xmldom doesn't support querySelector/querySelectorAll
    // =========================================================================
    /**
     * Get all elements by tag name (compatible with @xmldom/xmldom)
     */
    getElements(parent, tagName) {
      const elements = parent.getElementsByTagName(tagName);
      return Array.from(elements);
    }
    /**
     * Get first element by tag name (compatible with @xmldom/xmldom)
     */
    getElement(parent, tagName) {
      const elements = parent.getElementsByTagName(tagName);
      return elements[0] || null;
    }
    /**
     * Report progress to callback if set
     */
    reportProgress(phase, percent, message) {
      if (this.onProgress) {
        this.onProgress({ phase, percent, message });
      }
    }
    /**
     * Get the navigation Y.Array from the document
     */
    getNavigation() {
      return this.ydoc.getArray("navigation");
    }
    /**
     * Get the metadata Y.Map from the document
     */
    getMetadata() {
      return this.ydoc.getMap("metadata");
    }
    /**
     * Import from a buffer (Uint8Array)
     * This is the main entry point for server-side usage
     * @param buffer - ELP/ELPX file as Uint8Array
     * @param options - Import options
     * @returns Import statistics
     */
    async importFromBuffer(buffer, options = {}) {
      const { clearExisting = true, parentId = null, onProgress = null } = options;
      if (onProgress) {
        this.onProgress = onProgress;
      }
      this.logger.log("[ElpxImporter] Starting import from buffer");
      this.reportProgress("decompress", 0, "Decompressing...");
      const zip = unzipSync(buffer);
      this.reportProgress("decompress", 10, "File decompressed");
      let workingZip = zip;
      if (!zip["content.xml"] && !zip["contentv3.xml"]) {
        const elpFiles = Object.keys(zip).filter(
          (name) => !name.includes("/") && (name.toLowerCase().endsWith(".elp") || name.toLowerCase().endsWith(".elpx"))
        );
        if (elpFiles.length === 1) {
          this.logger.log(`[ElpxImporter] Found nested ELP file: ${elpFiles[0]}, extracting...`);
          const nestedElpData = zip[elpFiles[0]];
          workingZip = unzipSync(nestedElpData);
        } else if (elpFiles.length > 1) {
          throw new Error("ZIP contains multiple ELP files. Please extract and open one at a time.");
        }
      }
      let contentFile = workingZip["content.xml"];
      let isLegacyFormat = false;
      if (!contentFile) {
        contentFile = workingZip["contentv3.xml"];
        isLegacyFormat = true;
      }
      if (!contentFile) {
        throw new Error("No content.xml found in .elpx file");
      }
      const contentXml = new TextDecoder().decode(contentFile);
      const parser = new import_xmldom2.DOMParser();
      const xmlDoc = parser.parseFromString(contentXml, "text/xml");
      const parseError = xmlDoc.getElementsByTagName("parsererror")[0];
      if (parseError) {
        throw new Error(`XML parsing error: ${parseError.textContent}`);
      }
      const rootElement = xmlDoc.documentElement?.tagName;
      if (rootElement === "instance" || rootElement === "dictionary") {
        this.logger.log("[ElpxImporter] Legacy Python pickle format detected");
        const legacyParser = new LegacyXmlParser(this.logger);
        const parsedData = legacyParser.parse(contentXml);
        const stats2 = await this.importLegacyStructure(parsedData, workingZip, { clearExisting, parentId });
        this.logger.log("[ElpxImporter] Legacy import complete:", stats2);
        return stats2;
      }
      const stats = await this.importStructure(xmlDoc, workingZip, { clearExisting, parentId });
      this.logger.log("[ElpxImporter] Import complete:", stats);
      return stats;
    }
    /**
     * Import from already-unzipped contents (for server-side use when files are already extracted)
     * @param zipContents - Object mapping file paths to their content as Uint8Array
     * @param options - Import options
     * @returns Import statistics
     */
    async importFromZipContents(zipContents, options = {}) {
      const { clearExisting = true, parentId = null, onProgress = null } = options;
      if (onProgress) {
        this.onProgress = onProgress;
      }
      this.logger.log("[ElpxImporter] Starting import from zip contents");
      this.reportProgress("decompress", 10, "Files ready");
      let contentFile = zipContents["content.xml"];
      let isLegacyFormat = false;
      if (!contentFile) {
        contentFile = zipContents["contentv3.xml"];
        isLegacyFormat = true;
      }
      if (!contentFile) {
        throw new Error("No content.xml found in provided files");
      }
      const contentXml = new TextDecoder().decode(contentFile);
      const parser = new import_xmldom2.DOMParser();
      const xmlDoc = parser.parseFromString(contentXml, "text/xml");
      const parseError = xmlDoc.getElementsByTagName("parsererror")[0];
      if (parseError) {
        throw new Error(`XML parsing error: ${parseError.textContent}`);
      }
      const rootElement = xmlDoc.documentElement?.tagName;
      if (rootElement === "instance" || rootElement === "dictionary") {
        this.logger.log("[ElpxImporter] Legacy Python pickle format detected");
        const legacyParser = new LegacyXmlParser(this.logger);
        const parsedData = legacyParser.parse(contentXml);
        const stats2 = await this.importLegacyStructure(parsedData, zipContents, { clearExisting, parentId });
        this.logger.log("[ElpxImporter] Legacy import from zip contents complete:", stats2);
        return stats2;
      }
      const stats = await this.importStructure(xmlDoc, zipContents, { clearExisting, parentId });
      this.logger.log("[ElpxImporter] Import from zip contents complete:", stats);
      return stats;
    }
    /**
     * Import document structure from parsed XML
     */
    async importStructure(xmlDoc, zip, options = {}) {
      const { clearExisting = true, parentId = null } = options;
      const stats = { pages: 0, blocks: 0, components: 0, assets: 0 };
      this.reportProgress("assets", 10, "Extracting assets...");
      stats.assets = await this.importAssets(zip);
      this.reportProgress("assets", 50, "Assets extracted");
      const navigation = this.getNavigation();
      const metadata = this.getMetadata();
      const odeNavStructures = this.findNavStructures(xmlDoc);
      this.logger.log("[ElpxImporter] Root element:", xmlDoc.documentElement?.tagName);
      this.logger.log("[ElpxImporter] Found odeNavStructure elements:", odeNavStructures.length);
      const pageMap = /* @__PURE__ */ new Map();
      for (const navNode of odeNavStructures) {
        const pageId = this.getPageId(navNode);
        if (pageId) {
          pageMap.set(pageId, navNode);
        }
      }
      const rootNavStructures = [];
      for (const navNode of odeNavStructures) {
        const navParentId = this.getParentPageId(navNode);
        if (!navParentId || navParentId === "" || navParentId === "null") {
          rootNavStructures.push(navNode);
        }
      }
      rootNavStructures.sort((a, b) => {
        const orderA = this.getNavOrder(a);
        const orderB = this.getNavOrder(b);
        return orderA - orderB;
      });
      this.logger.log("[ElpxImporter] Root-level pages to import:", rootNavStructures.length);
      const odeProperties = this.getElement(xmlDoc, "odeProperties");
      const metadataValues = this.extractMetadata(xmlDoc, odeProperties);
      let orderOffset = 0;
      if (!clearExisting) {
        orderOffset = this.getNextAvailableOrder(parentId);
        this.logger.log("[ElpxImporter] Order offset for import:", orderOffset, "at parent:", parentId);
      }
      const pageStructures = [];
      const idRemap = /* @__PURE__ */ new Map();
      this.buildFlatPageList(
        rootNavStructures,
        zip,
        odeNavStructures,
        pageStructures,
        parentId,
        orderOffset,
        idRemap,
        true
      );
      this.logger.log(
        "[ElpxImporter] Built flat page list:",
        pageStructures.length,
        "pages, parentId:",
        parentId,
        "idRemap size:",
        idRemap.size
      );
      this.reportProgress("structure", 50, "Importing structure...");
      this.logger.log("[ElpxImporter] Starting Yjs transaction...");
      try {
        this.ydoc.transact(() => {
          this.logger.log("[ElpxImporter] Inside transaction");
          if (clearExisting) {
            this.logger.log("[ElpxImporter] Clearing existing navigation, length:", navigation.length);
            while (navigation.length > 0) {
              navigation.delete(0);
            }
            this.logger.log("[ElpxImporter] Navigation cleared");
          }
          if (odeProperties && clearExisting) {
            this.logger.log("[ElpxImporter] Setting metadata...");
            this.setMetadata(metadata, metadataValues);
            this.logger.log("[ElpxImporter] Metadata set");
          }
          this.logger.log("[ElpxImporter] Creating", pageStructures.length, "page structures...");
          for (let i = 0; i < pageStructures.length; i++) {
            const pageData = pageStructures[i];
            this.logger.log(
              `[ElpxImporter] Processing page ${i + 1}/${pageStructures.length}: ${pageData.pageName}`
            );
            const pageYMap = this.createPageYMap(pageData, stats);
            if (pageYMap) {
              navigation.push([pageYMap]);
              stats.pages++;
            }
          }
          this.logger.log("[ElpxImporter] All pages created");
        });
        this.logger.log("[ElpxImporter] Transaction completed successfully");
        this.reportProgress("structure", 80, "Structure imported");
      } catch (transactionErr) {
        this.logger.error("[ElpxImporter] TRANSACTION ERROR:", transactionErr);
        throw transactionErr;
      }
      this.reportProgress("precache", 80, "Precaching assets...");
      if (this.assetHandler?.preloadAllAssets) {
        await this.assetHandler.preloadAllAssets();
      }
      this.reportProgress("precache", 100, "Import complete");
      stats.theme = metadataValues.theme || null;
      this.logger.log("[ElpxImporter] Import complete:", stats);
      return stats;
    }
    /**
     * Import legacy structure from parsed LegacyXmlParser data
     */
    async importLegacyStructure(parsedData, zip, options = {}) {
      const { clearExisting = true, parentId = null } = options;
      const stats = { pages: 0, blocks: 0, components: 0, assets: 0 };
      this.reportProgress("assets", 10, "Extracting assets...");
      stats.assets = await this.importAssets(zip);
      this.reportProgress("assets", 50, "Assets extracted");
      const navigation = this.getNavigation();
      const metadata = this.getMetadata();
      const pageStructures = this.convertLegacyPagesToPageData(parsedData.pages, parentId);
      this.logger.log("[ElpxImporter] Converted legacy pages:", pageStructures.length);
      this.reportProgress("structure", 50, "Importing structure...");
      this.logger.log("[ElpxImporter] Starting Yjs transaction for legacy import...");
      try {
        this.ydoc.transact(() => {
          this.logger.log("[ElpxImporter] Inside legacy transaction");
          if (clearExisting) {
            this.logger.log("[ElpxImporter] Clearing existing navigation, length:", navigation.length);
            while (navigation.length > 0) {
              navigation.delete(0);
            }
            this.logger.log("[ElpxImporter] Navigation cleared");
          }
          if (clearExisting) {
            this.logger.log("[ElpxImporter] Setting legacy metadata...");
            this.setLegacyMetadata(metadata, parsedData.meta);
            this.logger.log("[ElpxImporter] Legacy metadata set");
          }
          this.logger.log("[ElpxImporter] Creating", pageStructures.length, "page structures...");
          for (let i = 0; i < pageStructures.length; i++) {
            const pageData = pageStructures[i];
            this.logger.log(
              `[ElpxImporter] Processing legacy page ${i + 1}/${pageStructures.length}: ${pageData.pageName}`
            );
            const pageYMap = this.createPageYMap(pageData, stats);
            if (pageYMap) {
              navigation.push([pageYMap]);
              stats.pages++;
            }
          }
          this.logger.log("[ElpxImporter] All legacy pages created");
        });
        this.logger.log("[ElpxImporter] Legacy transaction completed successfully");
        this.reportProgress("structure", 80, "Structure imported");
      } catch (transactionErr) {
        this.logger.error("[ElpxImporter] LEGACY TRANSACTION ERROR:", transactionErr);
        throw transactionErr;
      }
      this.reportProgress("precache", 80, "Precaching assets...");
      if (this.assetHandler?.preloadAllAssets) {
        await this.assetHandler.preloadAllAssets();
      }
      this.reportProgress("precache", 100, "Import complete");
      this.logger.log("[ElpxImporter] Legacy import complete:", stats);
      return stats;
    }
    /**
     * Convert legacy pages to PageData format
     */
    convertLegacyPagesToPageData(legacyPages, rootParentId) {
      const pageStructures = [];
      for (const legacyPage of legacyPages) {
        const parentId = legacyPage.parent_id === null ? rootParentId : legacyPage.parent_id;
        const pageData = {
          id: legacyPage.id,
          pageId: legacyPage.id,
          pageName: legacyPage.title,
          title: legacyPage.title,
          parentId,
          order: legacyPage.position,
          createdAt: (/* @__PURE__ */ new Date()).toISOString(),
          blocks: [],
          properties: {}
        };
        for (const legacyBlock of legacyPage.blocks) {
          const blockData = this.convertLegacyBlockToBlockData(legacyBlock);
          pageData.blocks.push(blockData);
        }
        pageStructures.push(pageData);
      }
      return pageStructures;
    }
    /**
     * Convert legacy block to BlockData format
     */
    convertLegacyBlockToBlockData(legacyBlock) {
      const blockData = {
        id: legacyBlock.id,
        blockId: legacyBlock.id,
        blockName: legacyBlock.name,
        iconName: legacyBlock.iconName,
        order: legacyBlock.position,
        createdAt: (/* @__PURE__ */ new Date()).toISOString(),
        components: [],
        properties: legacyBlock.blockProperties || {}
      };
      for (const legacyIdevice of legacyBlock.idevices) {
        const componentData = this.convertLegacyIdeviceToComponentData(legacyIdevice);
        blockData.components.push(componentData);
      }
      return blockData;
    }
    /**
     * Convert legacy iDevice to ComponentData format
     */
    convertLegacyIdeviceToComponentData(legacyIdevice) {
      let htmlView = legacyIdevice.htmlView || "";
      if (legacyIdevice.feedbackHtml) {
        const buttonText = legacyIdevice.feedbackButton || "Show Feedback";
        htmlView += `<div class="iDevice_buttons feedback-button js-required">`;
        htmlView += `<input type="button" class="feedbacktooglebutton" value="${this.escapeHtmlAttr(buttonText)}" `;
        htmlView += `data-text-a="${this.escapeHtmlAttr(buttonText)}" data-text-b="${this.escapeHtmlAttr(buttonText)}">`;
        htmlView += `</div>`;
        htmlView += `<div class="feedback js-feedback js-hidden" style="display: none;">${legacyIdevice.feedbackHtml}</div>`;
      }
      if (this.assetHandler && this.assetMap.size > 0 && htmlView) {
        try {
          htmlView = this.assetHandler.convertContextPathToAssetRefs(htmlView, this.assetMap);
        } catch (convErr) {
          this.logger.warn(`[ElpxImporter] Error converting asset paths for ${legacyIdevice.id}:`, convErr);
        }
      }
      let properties = legacyIdevice.properties || {};
      if (legacyIdevice.type === "text" && htmlView) {
        properties = {
          ...properties,
          textTextarea: htmlView
        };
      }
      const componentData = {
        id: legacyIdevice.id,
        ideviceId: legacyIdevice.id,
        ideviceType: legacyIdevice.type,
        type: legacyIdevice.type,
        order: legacyIdevice.position,
        createdAt: (/* @__PURE__ */ new Date()).toISOString(),
        htmlView,
        properties,
        componentProps: {},
        structureProps: {}
      };
      if (legacyIdevice.cssClass) {
        componentData.structureProps.cssClass = legacyIdevice.cssClass;
      }
      if (componentData.properties && this.assetHandler && this.assetMap.size > 0) {
        try {
          componentData.properties = this.convertAssetPathsInObject(componentData.properties);
        } catch (convErr) {
          this.logger.warn(`[ElpxImporter] Error converting paths in props for ${legacyIdevice.id}:`, convErr);
        }
      }
      return componentData;
    }
    /**
     * Set metadata on the Yjs document from legacy format
     */
    setLegacyMetadata(metadata, legacyMeta) {
      metadata.set("title", legacyMeta.title);
      metadata.set("author", legacyMeta.author);
      metadata.set("language", legacyMeta.language || "en");
      metadata.set("description", legacyMeta.description);
      metadata.set("license", legacyMeta.license);
      metadata.set("addPagination", legacyMeta.pp_addPagination);
      metadata.set("addSearchBox", legacyMeta.pp_addSearchBox);
      metadata.set("addExeLink", legacyMeta.pp_addExeLink);
      metadata.set("addAccessibilityToolbar", legacyMeta.pp_addAccessibilityToolbar);
      metadata.set("exportSource", legacyMeta.exportSource);
      metadata.set("addMathJax", false);
      metadata.set("globalFont", "default");
      if (legacyMeta.extraHeadContent) {
        metadata.set("extraHeadContent", legacyMeta.extraHeadContent);
      }
      if (legacyMeta.footer) {
        metadata.set("footer", legacyMeta.footer);
      }
    }
    /**
     * Escape HTML special characters for attribute values
     */
    escapeHtmlAttr(str) {
      if (!str) return "";
      return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
    }
    /**
     * Extract metadata from XML
     */
    extractMetadata(xmlDoc, odeProperties) {
      let themeFromXml = "";
      const userPreferences = this.getElement(xmlDoc, "userPreferences");
      if (userPreferences) {
        const themePrefs = this.getElements(userPreferences, "userPreference");
        for (const pref of themePrefs) {
          const keyEl = this.getElement(pref, "key");
          const valueEl = this.getElement(pref, "value");
          if (keyEl?.textContent === "theme" && valueEl) {
            themeFromXml = valueEl.textContent || "";
            break;
          }
        }
      }
      if (!themeFromXml && odeProperties) {
        themeFromXml = this.getPropertyValue(odeProperties, "pp_style") || "";
      }
      return {
        title: this.getMetadataProperty(odeProperties, "pp_title", "Imported Project"),
        subtitle: this.getMetadataProperty(odeProperties, "pp_subtitle"),
        author: this.getMetadataProperty(odeProperties, "pp_author"),
        language: this.getMetadataProperty(odeProperties, "pp_lang", "en"),
        description: this.getMetadataProperty(odeProperties, "pp_description"),
        license: this.getMetadataProperty(odeProperties, "pp_license"),
        theme: themeFromXml,
        addPagination: this.getBooleanMetadataProperty(odeProperties, "pp_addPagination", false),
        addSearchBox: this.getBooleanMetadataProperty(odeProperties, "pp_addSearchBox", false),
        addExeLink: this.getBooleanMetadataProperty(odeProperties, "pp_addExeLink", true),
        addAccessibilityToolbar: this.getBooleanMetadataProperty(
          odeProperties,
          "pp_addAccessibilityToolbar",
          false
        ),
        exportSource: this.getBooleanMetadataProperty(odeProperties, "exportSource", true),
        extraHeadContent: this.getMetadataProperty(odeProperties, "pp_extraHeadContent"),
        footer: this.getMetadataProperty(odeProperties, "footer"),
        addMathJax: this.getBooleanMetadataProperty(odeProperties, "pp_addMathJax", false),
        globalFont: this.getMetadataProperty(odeProperties, "pp_globalFont", "default")
      };
    }
    /**
     * Set metadata on the Yjs document
     */
    setMetadata(metadata, values) {
      metadata.set("title", values.title);
      if (values.subtitle) {
        metadata.set("subtitle", values.subtitle);
      }
      metadata.set("author", values.author);
      metadata.set("language", values.language);
      metadata.set("description", values.description);
      metadata.set("license", values.license);
      if (values.theme) {
        metadata.set("theme", values.theme);
        this.logger.log("[ElpxImporter] Theme set:", values.theme);
      }
      metadata.set("addPagination", values.addPagination);
      metadata.set("addSearchBox", values.addSearchBox);
      metadata.set("addExeLink", values.addExeLink);
      metadata.set("addAccessibilityToolbar", values.addAccessibilityToolbar);
      metadata.set("exportSource", values.exportSource);
      metadata.set("addMathJax", values.addMathJax);
      metadata.set("globalFont", values.globalFont);
      if (values.extraHeadContent) {
        metadata.set("extraHeadContent", values.extraHeadContent);
      }
      if (values.footer) {
        metadata.set("footer", values.footer);
      }
    }
    /**
     * Build a flat list of all pages (recursive helper)
     */
    buildFlatPageList(navNodes, zip, allNavStructures, flatList, parentId, orderOffset, idRemap, isRootLevel) {
      let siblingOrder = 0;
      for (const navNode of navNodes) {
        const originalPageId = this.getPageId(navNode);
        const newPageId = this.generateId("page");
        if (originalPageId) {
          idRemap.set(originalPageId, newPageId);
        }
        const calculatedOrder = isRootLevel ? orderOffset + siblingOrder : siblingOrder;
        const pageData = this.buildPageData(navNode, zip, parentId, newPageId, calculatedOrder);
        if (pageData) {
          flatList.push(pageData);
          siblingOrder++;
          const childNavNodes = [];
          for (const childNav of allNavStructures) {
            const childXmlParentId = this.getParentPageId(childNav);
            if (childXmlParentId === originalPageId) {
              childNavNodes.push(childNav);
            }
          }
          childNavNodes.sort((a, b) => this.getNavOrder(a) - this.getNavOrder(b));
          if (childNavNodes.length > 0) {
            this.buildFlatPageList(
              childNavNodes,
              zip,
              allNavStructures,
              flatList,
              newPageId,
              0,
              idRemap,
              false
            );
          }
        }
      }
    }
    /**
     * Build plain JavaScript data structure from XML
     */
    buildPageData(navNode, zip, parentId, newPageId, calculatedOrder) {
      const pageId = newPageId;
      const pageName = this.getPageName(navNode);
      const order = calculatedOrder;
      const properties = this.getNavStructureProperties(navNode);
      const pageData = {
        id: pageId,
        pageId,
        pageName,
        title: pageName,
        parentId,
        order,
        createdAt: (/* @__PURE__ */ new Date()).toISOString(),
        blocks: [],
        properties
      };
      const pagStructures = this.findPagStructures(navNode);
      const sortedPagStructures = Array.from(pagStructures).sort((a, b) => {
        return this.getPagOrder(a) - this.getPagOrder(b);
      });
      for (const pagNode of sortedPagStructures) {
        const blockData = this.buildBlockData(pagNode, zip);
        if (blockData) {
          pageData.blocks.push(blockData);
        }
      }
      return pageData;
    }
    /**
     * Build plain JavaScript data structure for a block
     */
    buildBlockData(pagNode, zip) {
      const blockId = pagNode.getAttribute("odePagStructureId") || this.getTextContent(pagNode, "odeBlockId") || this.generateId("block");
      const blockName = pagNode.getAttribute("blockName") || this.getTextContent(pagNode, "blockName") || "";
      const order = this.getPagOrder(pagNode);
      const iconName = pagNode.getAttribute("iconName") || this.getTextContent(pagNode, "iconName") || "";
      const properties = this.getPagStructureProperties(pagNode);
      const blockData = {
        id: blockId,
        blockId,
        blockName,
        iconName,
        order,
        createdAt: (/* @__PURE__ */ new Date()).toISOString(),
        components: [],
        properties
      };
      const odeComponents = this.findOdeComponents(pagNode);
      const sortedComponents = Array.from(odeComponents).sort((a, b) => {
        return this.getComponentOrder(a) - this.getComponentOrder(b);
      });
      for (const compNode of sortedComponents) {
        const compData = this.buildComponentData(compNode, zip);
        if (compData) {
          blockData.components.push(compData);
        }
      }
      return blockData;
    }
    /**
     * Build plain JavaScript data structure for a component
     */
    buildComponentData(compNode, _zip) {
      const componentId = compNode.getAttribute("odeComponentId") || this.getTextContent(compNode, "odeIdeviceId") || this.generateId("idevice");
      let ideviceType = compNode.getAttribute("odeIdeviceTypeDirName") || compNode.getAttribute("odeIdeviceTypeName") || this.getTextContent(compNode, "odeIdeviceTypeName") || "FreeTextIdevice";
      if (LEGACY_TYPE_ALIASES[ideviceType]) {
        ideviceType = LEGACY_TYPE_ALIASES[ideviceType];
      }
      const order = this.getComponentOrder(compNode);
      const compData = {
        id: componentId,
        ideviceId: componentId,
        ideviceType,
        type: ideviceType,
        order,
        createdAt: (/* @__PURE__ */ new Date()).toISOString(),
        htmlView: "",
        properties: null,
        componentProps: {},
        structureProps: {}
      };
      const htmlViewNode = this.getElement(compNode, "htmlView");
      if (htmlViewNode) {
        let htmlContent = this.decodeHtmlContent(htmlViewNode.textContent || "") || "";
        if (this.assetHandler && this.assetMap.size > 0 && htmlContent) {
          try {
            const converted = this.assetHandler.convertContextPathToAssetRefs(htmlContent, this.assetMap);
            htmlContent = typeof converted === "string" ? converted : htmlContent;
          } catch (convErr) {
            this.logger.warn(`[ElpxImporter] Error converting asset paths for ${componentId}:`, convErr);
          }
        }
        compData.htmlView = typeof htmlContent === "string" ? htmlContent : "";
      }
      const jsonPropsNode = this.getElement(compNode, "jsonProperties");
      if (jsonPropsNode) {
        try {
          const jsonStr = this.decodeHtmlContent(jsonPropsNode.textContent || "{}") || "{}";
          let props = {};
          try {
            props = JSON.parse(jsonStr);
          } catch (parseErr) {
            this.logger.warn(`[ElpxImporter] Invalid JSON for ${componentId}, using empty object`);
            props = {};
          }
          if (this.assetHandler && this.assetMap.size > 0 && props && typeof props === "object") {
            try {
              props = this.convertAssetPathsInObject(props);
            } catch (convErr) {
              this.logger.warn(`[ElpxImporter] Error converting paths in JSON for ${componentId}:`, convErr);
            }
          }
          compData.properties = props;
        } catch (e) {
          this.logger.warn(`[ElpxImporter] Failed to process JSON properties for ${componentId}:`, e);
        }
      }
      const componentProps = this.getElements(compNode, "odeComponentProperty");
      for (const propNode of componentProps) {
        const key = propNode.getAttribute("key") || this.getTextContent(propNode, "key");
        const value = propNode.getAttribute("value") || this.getTextContent(propNode, "value") || propNode.textContent;
        if (key && value) {
          compData.componentProps[key] = value;
        }
      }
      const structureProps = this.getComponentsProperties(compNode);
      if (compData.properties && typeof compData.properties === "object") {
        const propsToMerge = ["visibility", "teacherOnly", "identifier", "cssClass"];
        for (const key of propsToMerge) {
          if (compData.properties[key] !== void 0) {
            const value = compData.properties[key];
            if (typeof value === "boolean") {
              structureProps[key] = value ? "true" : "false";
            } else {
              structureProps[key] = String(value);
            }
          }
        }
      }
      compData.structureProps = structureProps;
      return compData;
    }
    /**
     * Create Y.Map from plain page data (called INSIDE transaction)
     */
    createPageYMap(pageData, stats) {
      const pageMap = new Map2();
      pageMap.set("id", pageData.id);
      pageMap.set("pageId", pageData.pageId);
      pageMap.set("pageName", pageData.pageName);
      pageMap.set("title", pageData.title);
      pageMap.set("parentId", pageData.parentId);
      pageMap.set("order", pageData.order);
      pageMap.set("createdAt", pageData.createdAt);
      if (pageData.properties && Object.keys(pageData.properties).length > 0) {
        const propsMap = new Map2();
        for (const [key, value] of Object.entries(pageData.properties)) {
          if (value !== void 0 && value !== null) {
            if (typeof value === "object") {
              propsMap.set(key, JSON.stringify(value));
            } else {
              propsMap.set(key, value);
            }
          }
        }
        pageMap.set("properties", propsMap);
      }
      const blocksArray = new Array2();
      for (const blockData of pageData.blocks) {
        const blockMap = this.createBlockYMap(blockData, stats);
        if (blockMap) {
          blocksArray.push([blockMap]);
          stats.blocks++;
        }
      }
      pageMap.set("blocks", blocksArray);
      return pageMap;
    }
    /**
     * Create Y.Map from plain block data (called INSIDE transaction)
     */
    createBlockYMap(blockData, stats) {
      const blockMap = new Map2();
      blockMap.set("id", blockData.id);
      blockMap.set("blockId", blockData.blockId);
      blockMap.set("blockName", blockData.blockName);
      blockMap.set("iconName", blockData.iconName || "");
      blockMap.set("order", blockData.order);
      blockMap.set("createdAt", blockData.createdAt);
      if (blockData.properties && Object.keys(blockData.properties).length > 0) {
        const propsMap = new Map2();
        for (const [key, value] of Object.entries(blockData.properties)) {
          if (value !== void 0 && value !== null) {
            if (typeof value === "object") {
              propsMap.set(key, JSON.stringify(value));
            } else {
              propsMap.set(key, value);
            }
          }
        }
        blockMap.set("properties", propsMap);
      }
      const componentsArray = new Array2();
      for (const compData of blockData.components) {
        const compMap = this.createComponentYMap(compData);
        if (compMap) {
          componentsArray.push([compMap]);
          stats.components++;
        }
      }
      blockMap.set("components", componentsArray);
      return blockMap;
    }
    /**
     * Create Y.Map from plain component data (called INSIDE transaction)
     */
    createComponentYMap(compData) {
      const compMap = new Map2();
      compMap.set("id", compData.id);
      compMap.set("ideviceId", compData.ideviceId);
      compMap.set("ideviceType", compData.ideviceType);
      compMap.set("type", compData.type);
      compMap.set("order", compData.order);
      compMap.set("createdAt", compData.createdAt);
      if (compData.htmlView) {
        compMap.set("htmlView", compData.htmlView);
        this.logger.log(
          `[ElpxImporter] createComponentYMap: Stored htmlView for ${compData.id}, length=${compData.htmlView.length}`
        );
      } else {
        this.logger.log(`[ElpxImporter] createComponentYMap: No htmlView for ${compData.id}`);
      }
      if (compData.properties && typeof compData.properties === "object") {
        try {
          const jsonStr = JSON.stringify(compData.properties);
          compMap.set("jsonProperties", jsonStr);
        } catch (err2) {
          this.logger.error("[ElpxImporter] ERROR stringifying properties:", err2);
        }
      }
      if (compData.componentProps) {
        for (const [key, value] of Object.entries(compData.componentProps)) {
          if (value != null && typeof value !== "object") {
            compMap.set(`prop_${key}`, String(value));
          }
        }
      }
      if (compData.structureProps && Object.keys(compData.structureProps).length > 0) {
        const propsMap = new Map2();
        for (const [key, value] of Object.entries(compData.structureProps)) {
          if (value !== void 0 && value !== null) {
            if (typeof value === "object") {
              propsMap.set(key, JSON.stringify(value));
            } else {
              propsMap.set(key, value);
            }
          }
        }
        compMap.set("properties", propsMap);
      }
      return compMap;
    }
    /**
     * Find all odeNavStructure elements using multiple strategies
     */
    findNavStructures(xmlDoc) {
      let structures = this.getElements(xmlDoc, "odeNavStructure");
      if (structures.length > 0) return structures;
      const container = this.getElement(xmlDoc, "odeNavStructures");
      if (container) {
        structures = this.getElements(container, "odeNavStructure");
        if (structures.length > 0) return structures;
      }
      this.logger.warn("[ElpxImporter] No odeNavStructure elements found");
      return [];
    }
    /**
     * Get page ID from nav structure
     */
    getPageId(navNode) {
      const id = navNode.getAttribute("odeNavStructureId");
      if (id) return this.sanitizeId(id);
      const idEl = this.getElement(navNode, "odePageId");
      if (idEl) return this.sanitizeId(idEl.textContent);
      return null;
    }
    /**
     * Get parent page ID from nav structure
     */
    getParentPageId(navNode) {
      const parentId = navNode.getAttribute("parentOdeNavStructureId");
      if (parentId) return this.sanitizeId(parentId);
      const parentEl = this.getElement(navNode, "odeParentPageId");
      if (parentEl) return this.sanitizeId(parentEl.textContent);
      return null;
    }
    /**
     * Get page name from nav structure
     */
    getPageName(navNode) {
      let name = navNode.getAttribute("odePageName");
      if (name) return name;
      name = navNode.getAttribute("pageName");
      if (name) return name;
      const nameEl = this.getElement(navNode, "pageName");
      if (nameEl?.textContent) return nameEl.textContent;
      const odeNameEl = this.getElement(navNode, "odePageName");
      if (odeNameEl?.textContent) return odeNameEl.textContent;
      return "Untitled Page";
    }
    /**
     * Get navigation order from nav structure
     */
    getNavOrder(navNode) {
      return this.getOrderValue(navNode, ["odeNavStructureOrder"], "odeNavStructureOrder");
    }
    /**
     * Generic helper to extract XML properties from a container element
     * Consolidates the common pattern used by page, block, and component property extraction
     *
     * @param parentNode - The parent element containing the properties container
     * @param containerTag - Tag name of the properties container (e.g., 'odeNavStructureProperties')
     * @param propertyTag - Tag name of individual property elements (e.g., 'odeNavStructureProperty')
     * @param defaults - Default property values to use as base
     * @returns Record of extracted properties with defaults applied
     */
    extractXmlProperties(parentNode, containerTag, propertyTag, defaults) {
      const properties = { ...defaults };
      const propsContainer = this.getElement(parentNode, containerTag);
      if (!propsContainer) return properties;
      const propNodes = this.getElements(propsContainer, propertyTag);
      for (const propNode of propNodes) {
        const key = this.getTextContent(propNode, "key");
        const value = this.getTextContent(propNode, "value");
        if (key && value !== null) {
          properties[key] = value === "true" || value === "false" ? value === "true" : value;
        }
      }
      return properties;
    }
    /**
     * Extract page properties from odeNavStructureProperties
     */
    getNavStructureProperties(navNode) {
      return this.extractXmlProperties(
        navNode,
        "odeNavStructureProperties",
        "odeNavStructureProperty",
        PAGE_PROPERTY_DEFAULTS
      );
    }
    /**
     * Extract block properties from odePagStructureProperties
     */
    getPagStructureProperties(pagNode) {
      return this.extractXmlProperties(
        pagNode,
        "odePagStructureProperties",
        "odePagStructureProperty",
        BLOCK_PROPERTY_DEFAULTS
      );
    }
    /**
     * Extract component properties from odeComponentsProperties
     */
    getComponentsProperties(compNode) {
      return this.extractXmlProperties(
        compNode,
        "odeComponentsProperties",
        "odeComponentsProperty",
        COMPONENT_PROPERTY_DEFAULTS
      );
    }
    /**
     * Find odePagStructure elements within a nav structure
     */
    findPagStructures(navNode) {
      const container = this.getElement(navNode, "odePagStructures");
      if (container) {
        const structures = this.getElements(container, "odePagStructure");
        if (structures.length > 0) return structures;
      }
      return this.getElements(navNode, "odePagStructure");
    }
    /**
     * Generic helper to extract order value from an element
     * Checks multiple attribute names and a child element for the order value
     *
     * @param node - The element to extract order from
     * @param attrNames - Array of attribute names to check (in order of priority)
     * @param childTagName - Child element tag name to check as fallback
     * @returns The order value or 0 if not found
     */
    getOrderValue(node, attrNames, childTagName) {
      for (const attrName of attrNames) {
        const order = node.getAttribute(attrName);
        if (order) return parseInt(order, 10) || 0;
      }
      const orderEl = this.getElement(node, childTagName);
      if (orderEl) return parseInt(orderEl.textContent || "0", 10) || 0;
      return 0;
    }
    /**
     * Get block order from pag structure
     */
    getPagOrder(pagNode) {
      return this.getOrderValue(pagNode, ["odePagStructureOrder"], "odePagStructureOrder");
    }
    /**
     * Find odeComponent elements within a pag structure
     */
    findOdeComponents(pagNode) {
      const container = this.getElement(pagNode, "odeComponents");
      if (container) {
        const components = this.getElements(container, "odeComponent");
        if (components.length > 0) return components;
      }
      return this.getElements(pagNode, "odeComponent");
    }
    /**
     * Get component order
     */
    getComponentOrder(compNode) {
      return this.getOrderValue(compNode, ["odeComponentOrder", "odeComponentsOrder"], "odeComponentsOrder");
    }
    /**
     * Import assets from ZIP file
     */
    async importAssets(zip) {
      if (!this.assetHandler) {
        this.logger.log("[ElpxImporter] No AssetHandler, skipping asset import");
        return 0;
      }
      this.assetMap = await this.assetHandler.extractAssetsFromZip(zip);
      this.logger.log(`[ElpxImporter] Imported ${this.assetMap.size} assets`);
      if (this.assetHandler.extractThemeFromZip) {
        try {
          const themeInfo = await this.assetHandler.extractThemeFromZip(zip);
          if (themeInfo.themeName) {
            this.logger.log(
              `[ElpxImporter] Extracted embedded theme: ${themeInfo.themeName} (downloadable: ${themeInfo.downloadable})`
            );
          }
        } catch (e) {
          this.logger.warn("[ElpxImporter] Error extracting theme:", e);
        }
      }
      return this.assetMap.size;
    }
    /**
     * Get property value from odeProperties container
     */
    getPropertyValue(propsContainer, key) {
      const directEl = this.getElement(propsContainer, key);
      if (directEl) return directEl.textContent;
      const props = this.getElements(propsContainer, "odeProperty");
      for (const prop of props) {
        const keyEl = this.getElement(prop, "key");
        const valueEl = this.getElement(prop, "value");
        if (keyEl?.textContent === key && valueEl) {
          return valueEl.textContent;
        }
      }
      return null;
    }
    /**
     * Parse boolean property value from odeProperties container
     */
    parseBooleanProperty(container, key, defaultValue) {
      const value = this.getPropertyValue(container, key);
      if (value === null || value === void 0 || value === "") {
        return defaultValue;
      }
      if (typeof value === "string") {
        const lower = value.toLowerCase();
        if (lower === "true" || lower === "1") return true;
        if (lower === "false" || lower === "0") return false;
      }
      return defaultValue;
    }
    /**
     * Helper to extract a string metadata property with a default value
     * Simplifies the common pattern of checking for odeProperties existence
     *
     * @param odeProperties - The odeProperties container element (may be null)
     * @param key - Property key to extract
     * @param defaultValue - Default value if property not found
     * @returns Property value or default
     */
    getMetadataProperty(odeProperties, key, defaultValue = "") {
      if (!odeProperties) return defaultValue;
      return this.getPropertyValue(odeProperties, key) || defaultValue;
    }
    /**
     * Helper to extract a boolean metadata property with a default value
     * Simplifies the common pattern of checking for odeProperties existence
     *
     * @param odeProperties - The odeProperties container element (may be null)
     * @param key - Property key to extract
     * @param defaultValue - Default value if property not found
     * @returns Property value or default
     */
    getBooleanMetadataProperty(odeProperties, key, defaultValue) {
      if (!odeProperties) return defaultValue;
      return this.parseBooleanProperty(odeProperties, key, defaultValue);
    }
    /**
     * Decode HTML-encoded content
     * Note: This is a simplified version for server-side use.
     * The browser version uses a textarea element for more complete decoding.
     */
    decodeHtmlContent(text) {
      if (!text) return "";
      return text.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&apos;/g, "'").replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCharCode(parseInt(hex, 16))).replace(/&#(\d+);/g, (_, dec) => String.fromCharCode(parseInt(dec, 10)));
    }
    /**
     * Get text content from a child element
     */
    getTextContent(parent, tagName) {
      const el = this.getElement(parent, tagName);
      return el ? el.textContent : null;
    }
    /**
     * Generate a unique ID
     */
    generateId(prefix) {
      const timestamp = Date.now().toString(36);
      const random = Math.random().toString(36).substring(2, 11);
      return `${prefix}-${timestamp}-${random}`;
    }
    /**
     * Sanitize an ID string
     */
    sanitizeId(id) {
      if (!id || typeof id !== "string") return null;
      const sanitized = id.trim();
      return sanitized || null;
    }
    /**
     * Calculate the next available order value at a given parent level
     */
    getNextAvailableOrder(parentId) {
      const navigation = this.getNavigation();
      let maxOrder = -1;
      for (let i = 0; i < navigation.length; i++) {
        const pageMap = navigation.get(i);
        const pageParentId = pageMap.get("parentId");
        const sameLevel = parentId === null && !pageParentId || parentId === pageParentId;
        if (sameLevel) {
          const order = pageMap.get("order") ?? 0;
          if (order > maxOrder) {
            maxOrder = order;
          }
        }
      }
      return maxOrder + 1;
    }
    /**
     * Recursively convert {{context_path}} references and resources/ paths to asset:// URLs in an object
     */
    convertAssetPathsInObject(obj) {
      if (obj === null || obj === void 0) {
        return obj;
      }
      if (typeof obj === "string") {
        if (obj.includes("{{context_path}}") && this.assetHandler) {
          return this.assetHandler.convertContextPathToAssetRefs(obj, this.assetMap);
        }
        if (obj.startsWith("resources/") && this.assetMap.size > 0) {
          const assetUrl = this.findAssetUrlForPath(obj);
          if (assetUrl) {
            return assetUrl;
          }
        }
        return obj;
      }
      if (Array.isArray(obj)) {
        return obj.map((item) => this.convertAssetPathsInObject(item));
      }
      if (typeof obj === "object") {
        const result = {};
        for (const [key, value] of Object.entries(obj)) {
          result[key] = this.convertAssetPathsInObject(value);
        }
        return result;
      }
      return obj;
    }
    /**
     * Find asset URL for a given path, trying various lookup strategies
     * Handles legacy ELP files where assets are at root level (just filename in assetMap)
     * but referenced with resources/ prefix in iDevice properties
     */
    findAssetUrlForPath(assetPath) {
      if (this.assetMap.has(assetPath)) {
        const assetId = this.assetMap.get(assetPath);
        return `asset://${assetId}/${assetPath.split("/").pop()}`;
      }
      if (assetPath.startsWith("resources/")) {
        const pathWithoutPrefix = assetPath.substring("resources/".length);
        if (this.assetMap.has(pathWithoutPrefix)) {
          const assetId = this.assetMap.get(pathWithoutPrefix);
          return `asset://${assetId}/${pathWithoutPrefix.split("/").pop()}`;
        }
      }
      const filename = assetPath.split("/").pop();
      if (filename) {
        for (const [path, assetId] of this.assetMap.entries()) {
          if (path === filename || path.endsWith("/" + filename)) {
            return `asset://${assetId}/${filename}`;
          }
        }
      }
      return null;
    }
  };

  // src/shared/import/adapters/BrowserAssetHandler.ts
  function getBrowserLogger() {
    if (typeof window !== "undefined" && window.Logger) {
      return window.Logger;
    }
    return {
      log: (...args) => console.log(...args),
      warn: (...args) => console.warn(...args),
      error: (...args) => console.error(...args)
    };
  }
  var BrowserAssetHandler = class {
    /**
     * Create a new BrowserAssetHandler
     * @param assetManager - Browser AssetManager instance
     * @param logger - Logger instance (optional)
     */
    constructor(assetManager, logger) {
      this.initialized = false;
      this.assetManager = assetManager;
      this.logger = logger || getBrowserLogger();
    }
    /**
     * Ensure AssetManager is initialized
     */
    async ensureInitialized() {
      if (!this.initialized) {
        await this.assetManager.init();
        this.initialized = true;
      }
    }
    /**
     * Store an asset and return its ID
     * @param id - Asset identifier (UUID)
     * @param data - Asset binary data
     * @param metadata - Asset metadata
     * @returns Asset ID
     */
    async storeAsset(id, data, metadata) {
      await this.ensureInitialized();
      const blob = new Blob([data], { type: metadata.mimeType });
      await this.assetManager.storeBlob(id, blob);
      this.assetManager.setAssetMetadata(id, {
        filename: metadata.filename,
        folderPath: metadata.folderPath || "",
        mime: metadata.mimeType,
        size: data.length,
        hash: "",
        // Hash calculated elsewhere if needed
        uploaded: false,
        createdAt: (/* @__PURE__ */ new Date()).toISOString()
      });
      this.logger.log(`[BrowserAssetHandler] Stored asset ${id}: ${metadata.filename}`);
      return id;
    }
    /**
     * Extract all assets from a ZIP object
     * Delegates to AssetManager's existing implementation
     * @param zip - Extracted ZIP files object from fflate {path: Uint8Array}
     * @returns Map of original path to asset ID
     */
    async extractAssetsFromZip(zip) {
      await this.ensureInitialized();
      return this.assetManager.extractAssetsFromZip(zip);
    }
    /**
     * Convert {{context_path}} references to asset:// URLs
     * Delegates to AssetManager's existing implementation
     * @param html - HTML content with {{context_path}} references
     * @param assetMap - Map of original paths to asset IDs
     * @returns HTML with asset:// URLs
     */
    convertContextPathToAssetRefs(html, assetMap) {
      return this.assetManager.convertContextPathToAssetRefs(html, assetMap);
    }
    /**
     * Preload all assets for immediate rendering
     * Delegates to AssetManager's existing implementation
     */
    async preloadAllAssets() {
      await this.ensureInitialized();
      await this.assetManager.preloadAllAssets();
    }
    /**
     * Clear all stored assets (optional)
     * Not implemented - AssetManager handles this differently
     */
    async clear() {
      this.logger.log("[BrowserAssetHandler] clear() called but not implemented");
    }
  };
  function createBrowserAssetHandler(assetManager) {
    if (!assetManager) {
      return null;
    }
    return new BrowserAssetHandler(assetManager);
  }

  // src/shared/import/browser/index.ts
  function getBrowserLogger2() {
    if (typeof window !== "undefined") {
      const windowLogger = window.Logger;
      if (windowLogger) {
        return windowLogger;
      }
    }
    return {
      log: (...args) => console.log(...args),
      warn: (...args) => console.warn(...args),
      error: (...args) => console.error(...args)
    };
  }
  var BrowserElpxImporter = class {
    /**
     * @param documentManager - YjsDocumentManager instance
     * @param assetManager - AssetManager instance (optional)
     */
    constructor(documentManager, assetManager = null) {
      this.importer = null;
      this.manager = documentManager;
      this.assetManager = assetManager;
      this.logger = getBrowserLogger2();
    }
    /**
     * Initialize the underlying ElpxImporter with Y.Doc
     */
    getImporter() {
      if (!this.importer) {
        const ydoc = this.manager.getDoc();
        const assetHandler = this.assetManager ? createBrowserAssetHandler(this.assetManager) : null;
        this.importer = new ElpxImporter(ydoc, assetHandler, this.logger);
      }
      return this.importer;
    }
    /**
     * Import an .elpx file (browser File API)
     * Compatible with the old ElpxImporter.importFromFile() API
     *
     * @param file - The .elpx file to import
     * @param options - Import options
     * @returns Import statistics
     */
    async importFromFile(file, options = {}) {
      const { clearExisting = true, parentId = null, onProgress = null, clearIndexedDB = false } = options;
      this.logger.log(`[BrowserElpxImporter] Importing ${file.name}...`);
      if (clearIndexedDB && this.assetManager && "projectId" in this.manager) {
        const dbName = `exelearning-project-${this.manager.projectId}`;
        this.logger.log(`[BrowserElpxImporter] Clearing IndexedDB: ${dbName}`);
        try {
          await new Promise((resolve, reject) => {
            const request = indexedDB.deleteDatabase(dbName);
            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
            request.onblocked = () => setTimeout(resolve, 1e3);
          });
        } catch (e) {
          console.warn("[BrowserElpxImporter] Failed to clear IndexedDB:", e);
        }
      }
      const arrayBuffer = await file.arrayBuffer();
      const buffer = new Uint8Array(arrayBuffer);
      const importer = this.getImporter();
      return importer.importFromBuffer(buffer, { clearExisting, parentId, onProgress });
    }
  };
  function createBrowserImporter(documentManager, assetManager = null) {
    return new BrowserElpxImporter(documentManager, assetManager);
  }
  if (typeof window !== "undefined") {
    window.LegacyHandlerRegistry = LegacyHandlerRegistry;
    window.LEGACY_TYPE_MAP = LEGACY_TYPE_MAP;
    window.getLegacyTypeName = getLegacyTypeName;
    window.ElpxImporter = BrowserElpxImporter;
    window.ElpxImporterCore = ElpxImporter;
    window.BrowserAssetHandler = BrowserAssetHandler;
    window.createBrowserImporter = createBrowserImporter;
    const windowExports = {
      // ElpxImporter
      ElpxImporter: BrowserElpxImporter,
      ElpxImporterCore: ElpxImporter,
      BrowserAssetHandler,
      createBrowserImporter,
      createBrowserAssetHandler,
      // Registry
      LegacyHandlerRegistry,
      LEGACY_TYPE_MAP,
      getLegacyTypeName,
      // Base class
      BaseLegacyHandler,
      // All handlers
      DefaultHandler,
      FreeTextHandler,
      MultichoiceHandler,
      TrueFalseHandler,
      GalleryHandler,
      CaseStudyHandler,
      FillHandler,
      DropdownHandler,
      ScormTestHandler,
      ExternalUrlHandler,
      FileAttachHandler,
      ImageMagnifierHandler,
      GeogebraHandler,
      InteractiveVideoHandler,
      GameHandler,
      FpdSolvedExerciseHandler,
      WikipediaHandler,
      RssHandler,
      NotaHandler
    };
    window.SharedImporters = windowExports;
    console.log("[SharedImporters] Browser import system loaded (with unified ElpxImporter)");
  }
})();
