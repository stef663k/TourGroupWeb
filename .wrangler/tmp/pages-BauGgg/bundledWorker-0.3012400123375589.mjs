var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __esm = (fn, res, err) => function __init() {
  if (err) throw err[0];
  try {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  } catch (e3) {
    throw err = [e3], e3;
  }
};
var __commonJS = (cb, mod) => function __require() {
  try {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  } catch (e3) {
    throw mod = 0, e3;
  }
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key2 of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key2) && key2 !== except)
        __defProp(to, key2, { get: () => from[key2], enumerable: !(desc = __getOwnPropDesc(from, key2)) || desc.enumerable });
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

// ../../node_modules/unenv/dist/runtime/_internal/utils.mjs
// @__NO_SIDE_EFFECTS__
function createNotImplementedError(name) {
  return new Error(`[unenv] ${name} is not implemented yet!`);
}
// @__NO_SIDE_EFFECTS__
function notImplemented(name) {
  const fn = /* @__PURE__ */ __name(() => {
    throw /* @__PURE__ */ createNotImplementedError(name);
  }, "fn");
  return Object.assign(fn, { __unenv__: true });
}
// @__NO_SIDE_EFFECTS__
function notImplementedClass(name) {
  return class {
    __unenv__ = true;
    constructor() {
      throw new Error(`[unenv] ${name} is not implemented yet!`);
    }
  };
}
var init_utils = __esm({
  "../../node_modules/unenv/dist/runtime/_internal/utils.mjs"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    __name(createNotImplementedError, "createNotImplementedError");
    __name(notImplemented, "notImplemented");
    __name(notImplementedClass, "notImplementedClass");
  }
});

// ../../node_modules/unenv/dist/runtime/node/internal/perf_hooks/performance.mjs
var _timeOrigin, _performanceNow, nodeTiming, PerformanceEntry, PerformanceMark, PerformanceMeasure, PerformanceResourceTiming, PerformanceObserverEntryList, Performance, PerformanceObserver, performance;
var init_performance = __esm({
  "../../node_modules/unenv/dist/runtime/node/internal/perf_hooks/performance.mjs"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_utils();
    _timeOrigin = globalThis.performance?.timeOrigin ?? Date.now();
    _performanceNow = globalThis.performance?.now ? globalThis.performance.now.bind(globalThis.performance) : () => Date.now() - _timeOrigin;
    nodeTiming = {
      name: "node",
      entryType: "node",
      startTime: 0,
      duration: 0,
      nodeStart: 0,
      v8Start: 0,
      bootstrapComplete: 0,
      environment: 0,
      loopStart: 0,
      loopExit: 0,
      idleTime: 0,
      uvMetricsInfo: {
        loopCount: 0,
        events: 0,
        eventsWaiting: 0
      },
      detail: void 0,
      toJSON() {
        return this;
      }
    };
    PerformanceEntry = class {
      static {
        __name(this, "PerformanceEntry");
      }
      __unenv__ = true;
      detail;
      entryType = "event";
      name;
      startTime;
      constructor(name, options2) {
        this.name = name;
        this.startTime = options2?.startTime || _performanceNow();
        this.detail = options2?.detail;
      }
      get duration() {
        return _performanceNow() - this.startTime;
      }
      toJSON() {
        return {
          name: this.name,
          entryType: this.entryType,
          startTime: this.startTime,
          duration: this.duration,
          detail: this.detail
        };
      }
    };
    PerformanceMark = class PerformanceMark2 extends PerformanceEntry {
      static {
        __name(this, "PerformanceMark");
      }
      entryType = "mark";
      constructor() {
        super(...arguments);
      }
      get duration() {
        return 0;
      }
    };
    PerformanceMeasure = class extends PerformanceEntry {
      static {
        __name(this, "PerformanceMeasure");
      }
      entryType = "measure";
    };
    PerformanceResourceTiming = class extends PerformanceEntry {
      static {
        __name(this, "PerformanceResourceTiming");
      }
      entryType = "resource";
      serverTiming = [];
      connectEnd = 0;
      connectStart = 0;
      decodedBodySize = 0;
      domainLookupEnd = 0;
      domainLookupStart = 0;
      encodedBodySize = 0;
      fetchStart = 0;
      initiatorType = "";
      name = "";
      nextHopProtocol = "";
      redirectEnd = 0;
      redirectStart = 0;
      requestStart = 0;
      responseEnd = 0;
      responseStart = 0;
      secureConnectionStart = 0;
      startTime = 0;
      transferSize = 0;
      workerStart = 0;
      responseStatus = 0;
    };
    PerformanceObserverEntryList = class {
      static {
        __name(this, "PerformanceObserverEntryList");
      }
      __unenv__ = true;
      getEntries() {
        return [];
      }
      getEntriesByName(_name, _type) {
        return [];
      }
      getEntriesByType(type) {
        return [];
      }
    };
    Performance = class {
      static {
        __name(this, "Performance");
      }
      __unenv__ = true;
      timeOrigin = _timeOrigin;
      eventCounts = /* @__PURE__ */ new Map();
      _entries = [];
      _resourceTimingBufferSize = 0;
      navigation = void 0;
      timing = void 0;
      timerify(_fn, _options) {
        throw createNotImplementedError("Performance.timerify");
      }
      get nodeTiming() {
        return nodeTiming;
      }
      eventLoopUtilization() {
        return {};
      }
      markResourceTiming() {
        return new PerformanceResourceTiming("");
      }
      onresourcetimingbufferfull = null;
      now() {
        if (this.timeOrigin === _timeOrigin) {
          return _performanceNow();
        }
        return Date.now() - this.timeOrigin;
      }
      clearMarks(markName) {
        this._entries = markName ? this._entries.filter((e3) => e3.name !== markName) : this._entries.filter((e3) => e3.entryType !== "mark");
      }
      clearMeasures(measureName) {
        this._entries = measureName ? this._entries.filter((e3) => e3.name !== measureName) : this._entries.filter((e3) => e3.entryType !== "measure");
      }
      clearResourceTimings() {
        this._entries = this._entries.filter((e3) => e3.entryType !== "resource" || e3.entryType !== "navigation");
      }
      getEntries() {
        return this._entries;
      }
      getEntriesByName(name, type) {
        return this._entries.filter((e3) => e3.name === name && (!type || e3.entryType === type));
      }
      getEntriesByType(type) {
        return this._entries.filter((e3) => e3.entryType === type);
      }
      mark(name, options2) {
        const entry = new PerformanceMark(name, options2);
        this._entries.push(entry);
        return entry;
      }
      measure(measureName, startOrMeasureOptions, endMark) {
        let start;
        let end;
        if (typeof startOrMeasureOptions === "string") {
          start = this.getEntriesByName(startOrMeasureOptions, "mark")[0]?.startTime;
          end = this.getEntriesByName(endMark, "mark")[0]?.startTime;
        } else {
          start = Number.parseFloat(startOrMeasureOptions?.start) || this.now();
          end = Number.parseFloat(startOrMeasureOptions?.end) || this.now();
        }
        const entry = new PerformanceMeasure(measureName, {
          startTime: start,
          detail: {
            start,
            end
          }
        });
        this._entries.push(entry);
        return entry;
      }
      setResourceTimingBufferSize(maxSize) {
        this._resourceTimingBufferSize = maxSize;
      }
      addEventListener(type, listener, options2) {
        throw createNotImplementedError("Performance.addEventListener");
      }
      removeEventListener(type, listener, options2) {
        throw createNotImplementedError("Performance.removeEventListener");
      }
      dispatchEvent(event) {
        throw createNotImplementedError("Performance.dispatchEvent");
      }
      toJSON() {
        return this;
      }
    };
    PerformanceObserver = class {
      static {
        __name(this, "PerformanceObserver");
      }
      __unenv__ = true;
      static supportedEntryTypes = [];
      _callback = null;
      constructor(callback) {
        this._callback = callback;
      }
      takeRecords() {
        return [];
      }
      disconnect() {
        throw createNotImplementedError("PerformanceObserver.disconnect");
      }
      observe(options2) {
        throw createNotImplementedError("PerformanceObserver.observe");
      }
      bind(fn) {
        return fn;
      }
      runInAsyncScope(fn, thisArg, ...args) {
        return fn.call(thisArg, ...args);
      }
      asyncId() {
        return 0;
      }
      triggerAsyncId() {
        return 0;
      }
      emitDestroy() {
        return this;
      }
    };
    performance = globalThis.performance && "addEventListener" in globalThis.performance ? globalThis.performance : new Performance();
  }
});

// ../../node_modules/unenv/dist/runtime/node/perf_hooks.mjs
var init_perf_hooks = __esm({
  "../../node_modules/unenv/dist/runtime/node/perf_hooks.mjs"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_performance();
  }
});

// ../../node_modules/@cloudflare/unenv-preset/dist/runtime/polyfill/performance.mjs
var init_performance2 = __esm({
  "../../node_modules/@cloudflare/unenv-preset/dist/runtime/polyfill/performance.mjs"() {
    init_perf_hooks();
    if (!("__unenv__" in performance)) {
      const proto = Performance.prototype;
      for (const key2 of Object.getOwnPropertyNames(proto)) {
        if (key2 !== "constructor" && !(key2 in performance)) {
          const desc = Object.getOwnPropertyDescriptor(proto, key2);
          if (desc) {
            Object.defineProperty(performance, key2, desc);
          }
        }
      }
    }
    globalThis.performance = performance;
    globalThis.Performance = Performance;
    globalThis.PerformanceEntry = PerformanceEntry;
    globalThis.PerformanceMark = PerformanceMark;
    globalThis.PerformanceMeasure = PerformanceMeasure;
    globalThis.PerformanceObserver = PerformanceObserver;
    globalThis.PerformanceObserverEntryList = PerformanceObserverEntryList;
    globalThis.PerformanceResourceTiming = PerformanceResourceTiming;
  }
});

// ../../node_modules/unenv/dist/runtime/mock/noop.mjs
var noop_default;
var init_noop = __esm({
  "../../node_modules/unenv/dist/runtime/mock/noop.mjs"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    noop_default = Object.assign(() => {
    }, { __unenv__: true });
  }
});

// ../../node_modules/unenv/dist/runtime/node/console.mjs
import { Writable } from "node:stream";
var _console, _ignoreErrors, _stderr, _stdout, log, info, trace, debug, table, error, warn, createTask, clear, count, countReset, dir, dirxml, group, groupEnd, groupCollapsed, profile, profileEnd, time, timeEnd, timeLog, timeStamp, Console, _times, _stdoutErrorHandler, _stderrErrorHandler;
var init_console = __esm({
  "../../node_modules/unenv/dist/runtime/node/console.mjs"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_noop();
    init_utils();
    _console = globalThis.console;
    _ignoreErrors = true;
    _stderr = new Writable();
    _stdout = new Writable();
    log = _console?.log ?? noop_default;
    info = _console?.info ?? log;
    trace = _console?.trace ?? info;
    debug = _console?.debug ?? log;
    table = _console?.table ?? log;
    error = _console?.error ?? log;
    warn = _console?.warn ?? error;
    createTask = _console?.createTask ?? /* @__PURE__ */ notImplemented("console.createTask");
    clear = _console?.clear ?? noop_default;
    count = _console?.count ?? noop_default;
    countReset = _console?.countReset ?? noop_default;
    dir = _console?.dir ?? noop_default;
    dirxml = _console?.dirxml ?? noop_default;
    group = _console?.group ?? noop_default;
    groupEnd = _console?.groupEnd ?? noop_default;
    groupCollapsed = _console?.groupCollapsed ?? noop_default;
    profile = _console?.profile ?? noop_default;
    profileEnd = _console?.profileEnd ?? noop_default;
    time = _console?.time ?? noop_default;
    timeEnd = _console?.timeEnd ?? noop_default;
    timeLog = _console?.timeLog ?? noop_default;
    timeStamp = _console?.timeStamp ?? noop_default;
    Console = _console?.Console ?? /* @__PURE__ */ notImplementedClass("console.Console");
    _times = /* @__PURE__ */ new Map();
    _stdoutErrorHandler = noop_default;
    _stderrErrorHandler = noop_default;
  }
});

// ../../node_modules/@cloudflare/unenv-preset/dist/runtime/node/console.mjs
var workerdConsole, assert, clear2, context, count2, countReset2, createTask2, debug2, dir2, dirxml2, error2, group2, groupCollapsed2, groupEnd2, info2, log2, profile2, profileEnd2, table2, time2, timeEnd2, timeLog2, timeStamp2, trace2, warn2, console_default;
var init_console2 = __esm({
  "../../node_modules/@cloudflare/unenv-preset/dist/runtime/node/console.mjs"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_console();
    workerdConsole = globalThis["console"];
    ({
      assert,
      clear: clear2,
      context: (
        // @ts-expect-error undocumented public API
        context
      ),
      count: count2,
      countReset: countReset2,
      createTask: (
        // @ts-expect-error undocumented public API
        createTask2
      ),
      debug: debug2,
      dir: dir2,
      dirxml: dirxml2,
      error: error2,
      group: group2,
      groupCollapsed: groupCollapsed2,
      groupEnd: groupEnd2,
      info: info2,
      log: log2,
      profile: profile2,
      profileEnd: profileEnd2,
      table: table2,
      time: time2,
      timeEnd: timeEnd2,
      timeLog: timeLog2,
      timeStamp: timeStamp2,
      trace: trace2,
      warn: warn2
    } = workerdConsole);
    Object.assign(workerdConsole, {
      Console,
      _ignoreErrors,
      _stderr,
      _stderrErrorHandler,
      _stdout,
      _stdoutErrorHandler,
      _times
    });
    console_default = workerdConsole;
  }
});

// ../../node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-console
var init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console = __esm({
  "../../node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-console"() {
    init_console2();
    globalThis.console = console_default;
  }
});

// ../../node_modules/unenv/dist/runtime/node/internal/process/hrtime.mjs
var hrtime;
var init_hrtime = __esm({
  "../../node_modules/unenv/dist/runtime/node/internal/process/hrtime.mjs"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    hrtime = /* @__PURE__ */ Object.assign(/* @__PURE__ */ __name(function hrtime2(startTime) {
      const now = Date.now();
      const seconds = Math.trunc(now / 1e3);
      const nanos = now % 1e3 * 1e6;
      if (startTime) {
        let diffSeconds = seconds - startTime[0];
        let diffNanos = nanos - startTime[0];
        if (diffNanos < 0) {
          diffSeconds = diffSeconds - 1;
          diffNanos = 1e9 + diffNanos;
        }
        return [diffSeconds, diffNanos];
      }
      return [seconds, nanos];
    }, "hrtime"), { bigint: /* @__PURE__ */ __name(function bigint() {
      return BigInt(Date.now() * 1e6);
    }, "bigint") });
  }
});

// ../../node_modules/unenv/dist/runtime/node/internal/tty/read-stream.mjs
var ReadStream;
var init_read_stream = __esm({
  "../../node_modules/unenv/dist/runtime/node/internal/tty/read-stream.mjs"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    ReadStream = class {
      static {
        __name(this, "ReadStream");
      }
      fd;
      isRaw = false;
      isTTY = false;
      constructor(fd) {
        this.fd = fd;
      }
      setRawMode(mode) {
        this.isRaw = mode;
        return this;
      }
    };
  }
});

// ../../node_modules/unenv/dist/runtime/node/internal/tty/write-stream.mjs
var WriteStream;
var init_write_stream = __esm({
  "../../node_modules/unenv/dist/runtime/node/internal/tty/write-stream.mjs"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    WriteStream = class {
      static {
        __name(this, "WriteStream");
      }
      fd;
      columns = 80;
      rows = 24;
      isTTY = false;
      constructor(fd) {
        this.fd = fd;
      }
      clearLine(dir3, callback) {
        callback && callback();
        return false;
      }
      clearScreenDown(callback) {
        callback && callback();
        return false;
      }
      cursorTo(x, y, callback) {
        callback && typeof callback === "function" && callback();
        return false;
      }
      moveCursor(dx, dy, callback) {
        callback && callback();
        return false;
      }
      getColorDepth(env3) {
        return 1;
      }
      hasColors(count3, env3) {
        return false;
      }
      getWindowSize() {
        return [this.columns, this.rows];
      }
      write(str, encoding, cb) {
        if (str instanceof Uint8Array) {
          str = new TextDecoder().decode(str);
        }
        try {
          console.log(str);
        } catch {
        }
        cb && typeof cb === "function" && cb();
        return false;
      }
    };
  }
});

// ../../node_modules/unenv/dist/runtime/node/tty.mjs
var init_tty = __esm({
  "../../node_modules/unenv/dist/runtime/node/tty.mjs"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_read_stream();
    init_write_stream();
  }
});

// ../../node_modules/unenv/dist/runtime/node/internal/process/node-version.mjs
var NODE_VERSION;
var init_node_version = __esm({
  "../../node_modules/unenv/dist/runtime/node/internal/process/node-version.mjs"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    NODE_VERSION = "22.14.0";
  }
});

// ../../node_modules/unenv/dist/runtime/node/internal/process/process.mjs
import { EventEmitter } from "node:events";
var Process;
var init_process = __esm({
  "../../node_modules/unenv/dist/runtime/node/internal/process/process.mjs"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_tty();
    init_utils();
    init_node_version();
    Process = class _Process extends EventEmitter {
      static {
        __name(this, "Process");
      }
      env;
      hrtime;
      nextTick;
      constructor(impl) {
        super();
        this.env = impl.env;
        this.hrtime = impl.hrtime;
        this.nextTick = impl.nextTick;
        for (const prop of [...Object.getOwnPropertyNames(_Process.prototype), ...Object.getOwnPropertyNames(EventEmitter.prototype)]) {
          const value = this[prop];
          if (typeof value === "function") {
            this[prop] = value.bind(this);
          }
        }
      }
      // --- event emitter ---
      emitWarning(warning, type, code) {
        console.warn(`${code ? `[${code}] ` : ""}${type ? `${type}: ` : ""}${warning}`);
      }
      emit(...args) {
        return super.emit(...args);
      }
      listeners(eventName) {
        return super.listeners(eventName);
      }
      // --- stdio (lazy initializers) ---
      #stdin;
      #stdout;
      #stderr;
      get stdin() {
        return this.#stdin ??= new ReadStream(0);
      }
      get stdout() {
        return this.#stdout ??= new WriteStream(1);
      }
      get stderr() {
        return this.#stderr ??= new WriteStream(2);
      }
      // --- cwd ---
      #cwd = "/";
      chdir(cwd2) {
        this.#cwd = cwd2;
      }
      cwd() {
        return this.#cwd;
      }
      // --- dummy props and getters ---
      arch = "";
      platform = "";
      argv = [];
      argv0 = "";
      execArgv = [];
      execPath = "";
      title = "";
      pid = 200;
      ppid = 100;
      get version() {
        return `v${NODE_VERSION}`;
      }
      get versions() {
        return { node: NODE_VERSION };
      }
      get allowedNodeEnvironmentFlags() {
        return /* @__PURE__ */ new Set();
      }
      get sourceMapsEnabled() {
        return false;
      }
      get debugPort() {
        return 0;
      }
      get throwDeprecation() {
        return false;
      }
      get traceDeprecation() {
        return false;
      }
      get features() {
        return {};
      }
      get release() {
        return {};
      }
      get connected() {
        return false;
      }
      get config() {
        return {};
      }
      get moduleLoadList() {
        return [];
      }
      constrainedMemory() {
        return 0;
      }
      availableMemory() {
        return 0;
      }
      uptime() {
        return 0;
      }
      resourceUsage() {
        return {};
      }
      // --- noop methods ---
      ref() {
      }
      unref() {
      }
      // --- unimplemented methods ---
      umask() {
        throw createNotImplementedError("process.umask");
      }
      getBuiltinModule() {
        return void 0;
      }
      getActiveResourcesInfo() {
        throw createNotImplementedError("process.getActiveResourcesInfo");
      }
      exit() {
        throw createNotImplementedError("process.exit");
      }
      reallyExit() {
        throw createNotImplementedError("process.reallyExit");
      }
      kill() {
        throw createNotImplementedError("process.kill");
      }
      abort() {
        throw createNotImplementedError("process.abort");
      }
      dlopen() {
        throw createNotImplementedError("process.dlopen");
      }
      setSourceMapsEnabled() {
        throw createNotImplementedError("process.setSourceMapsEnabled");
      }
      loadEnvFile() {
        throw createNotImplementedError("process.loadEnvFile");
      }
      disconnect() {
        throw createNotImplementedError("process.disconnect");
      }
      cpuUsage() {
        throw createNotImplementedError("process.cpuUsage");
      }
      setUncaughtExceptionCaptureCallback() {
        throw createNotImplementedError("process.setUncaughtExceptionCaptureCallback");
      }
      hasUncaughtExceptionCaptureCallback() {
        throw createNotImplementedError("process.hasUncaughtExceptionCaptureCallback");
      }
      initgroups() {
        throw createNotImplementedError("process.initgroups");
      }
      openStdin() {
        throw createNotImplementedError("process.openStdin");
      }
      assert() {
        throw createNotImplementedError("process.assert");
      }
      binding() {
        throw createNotImplementedError("process.binding");
      }
      // --- attached interfaces ---
      permission = { has: /* @__PURE__ */ notImplemented("process.permission.has") };
      report = {
        directory: "",
        filename: "",
        signal: "SIGUSR2",
        compact: false,
        reportOnFatalError: false,
        reportOnSignal: false,
        reportOnUncaughtException: false,
        getReport: /* @__PURE__ */ notImplemented("process.report.getReport"),
        writeReport: /* @__PURE__ */ notImplemented("process.report.writeReport")
      };
      finalization = {
        register: /* @__PURE__ */ notImplemented("process.finalization.register"),
        unregister: /* @__PURE__ */ notImplemented("process.finalization.unregister"),
        registerBeforeExit: /* @__PURE__ */ notImplemented("process.finalization.registerBeforeExit")
      };
      memoryUsage = Object.assign(() => ({
        arrayBuffers: 0,
        rss: 0,
        external: 0,
        heapTotal: 0,
        heapUsed: 0
      }), { rss: /* @__PURE__ */ __name(() => 0, "rss") });
      // --- undefined props ---
      mainModule = void 0;
      domain = void 0;
      // optional
      send = void 0;
      exitCode = void 0;
      channel = void 0;
      getegid = void 0;
      geteuid = void 0;
      getgid = void 0;
      getgroups = void 0;
      getuid = void 0;
      setegid = void 0;
      seteuid = void 0;
      setgid = void 0;
      setgroups = void 0;
      setuid = void 0;
      // internals
      _events = void 0;
      _eventsCount = void 0;
      _exiting = void 0;
      _maxListeners = void 0;
      _debugEnd = void 0;
      _debugProcess = void 0;
      _fatalException = void 0;
      _getActiveHandles = void 0;
      _getActiveRequests = void 0;
      _kill = void 0;
      _preload_modules = void 0;
      _rawDebug = void 0;
      _startProfilerIdleNotifier = void 0;
      _stopProfilerIdleNotifier = void 0;
      _tickCallback = void 0;
      _disconnect = void 0;
      _handleQueue = void 0;
      _pendingMessage = void 0;
      _channel = void 0;
      _send = void 0;
      _linkedBinding = void 0;
    };
  }
});

// ../../node_modules/@cloudflare/unenv-preset/dist/runtime/node/process.mjs
var globalProcess, getBuiltinModule, workerdProcess, unenvProcess, exit, features, platform, _channel, _debugEnd, _debugProcess, _disconnect, _events, _eventsCount, _exiting, _fatalException, _getActiveHandles, _getActiveRequests, _handleQueue, _kill, _linkedBinding, _maxListeners, _pendingMessage, _preload_modules, _rawDebug, _send, _startProfilerIdleNotifier, _stopProfilerIdleNotifier, _tickCallback, abort, addListener, allowedNodeEnvironmentFlags, arch, argv, argv0, assert2, availableMemory, binding, channel, chdir, config, connected, constrainedMemory, cpuUsage, cwd, debugPort, disconnect, dlopen, domain, emit, emitWarning, env, eventNames, execArgv, execPath, exitCode, finalization, getActiveResourcesInfo, getegid, geteuid, getgid, getgroups, getMaxListeners, getuid, hasUncaughtExceptionCaptureCallback, hrtime3, initgroups, kill, listenerCount, listeners, loadEnvFile, mainModule, memoryUsage, moduleLoadList, nextTick, off, on, once, openStdin, permission, pid, ppid, prependListener, prependOnceListener, rawListeners, reallyExit, ref, release, removeAllListeners, removeListener, report, resourceUsage, send, setegid, seteuid, setgid, setgroups, setMaxListeners, setSourceMapsEnabled, setuid, setUncaughtExceptionCaptureCallback, sourceMapsEnabled, stderr, stdin, stdout, throwDeprecation, title, traceDeprecation, umask, unref, uptime, version, versions, _process, process_default;
var init_process2 = __esm({
  "../../node_modules/@cloudflare/unenv-preset/dist/runtime/node/process.mjs"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_hrtime();
    init_process();
    globalProcess = globalThis["process"];
    getBuiltinModule = globalProcess.getBuiltinModule;
    workerdProcess = getBuiltinModule("node:process");
    unenvProcess = new Process({
      env: globalProcess.env,
      hrtime,
      // `nextTick` is available from workerd process v1
      nextTick: workerdProcess.nextTick
    });
    ({ exit, features, platform } = workerdProcess);
    ({
      _channel,
      _debugEnd,
      _debugProcess,
      _disconnect,
      _events,
      _eventsCount,
      _exiting,
      _fatalException,
      _getActiveHandles,
      _getActiveRequests,
      _handleQueue,
      _kill,
      _linkedBinding,
      _maxListeners,
      _pendingMessage,
      _preload_modules,
      _rawDebug,
      _send,
      _startProfilerIdleNotifier,
      _stopProfilerIdleNotifier,
      _tickCallback,
      abort,
      addListener,
      allowedNodeEnvironmentFlags,
      arch,
      argv,
      argv0,
      assert: assert2,
      availableMemory,
      binding,
      channel,
      chdir,
      config,
      connected,
      constrainedMemory,
      cpuUsage,
      cwd,
      debugPort,
      disconnect,
      dlopen,
      domain,
      emit,
      emitWarning,
      env,
      eventNames,
      execArgv,
      execPath,
      exitCode,
      finalization,
      getActiveResourcesInfo,
      getegid,
      geteuid,
      getgid,
      getgroups,
      getMaxListeners,
      getuid,
      hasUncaughtExceptionCaptureCallback,
      hrtime: hrtime3,
      initgroups,
      kill,
      listenerCount,
      listeners,
      loadEnvFile,
      mainModule,
      memoryUsage,
      moduleLoadList,
      nextTick,
      off,
      on,
      once,
      openStdin,
      permission,
      pid,
      ppid,
      prependListener,
      prependOnceListener,
      rawListeners,
      reallyExit,
      ref,
      release,
      removeAllListeners,
      removeListener,
      report,
      resourceUsage,
      send,
      setegid,
      seteuid,
      setgid,
      setgroups,
      setMaxListeners,
      setSourceMapsEnabled,
      setuid,
      setUncaughtExceptionCaptureCallback,
      sourceMapsEnabled,
      stderr,
      stdin,
      stdout,
      throwDeprecation,
      title,
      traceDeprecation,
      umask,
      unref,
      uptime,
      version,
      versions
    } = unenvProcess);
    _process = {
      abort,
      addListener,
      allowedNodeEnvironmentFlags,
      hasUncaughtExceptionCaptureCallback,
      setUncaughtExceptionCaptureCallback,
      loadEnvFile,
      sourceMapsEnabled,
      arch,
      argv,
      argv0,
      chdir,
      config,
      connected,
      constrainedMemory,
      availableMemory,
      cpuUsage,
      cwd,
      debugPort,
      dlopen,
      disconnect,
      emit,
      emitWarning,
      env,
      eventNames,
      execArgv,
      execPath,
      exit,
      finalization,
      features,
      getBuiltinModule,
      getActiveResourcesInfo,
      getMaxListeners,
      hrtime: hrtime3,
      kill,
      listeners,
      listenerCount,
      memoryUsage,
      nextTick,
      on,
      off,
      once,
      pid,
      platform,
      ppid,
      prependListener,
      prependOnceListener,
      rawListeners,
      release,
      removeAllListeners,
      removeListener,
      report,
      resourceUsage,
      setMaxListeners,
      setSourceMapsEnabled,
      stderr,
      stdin,
      stdout,
      title,
      throwDeprecation,
      traceDeprecation,
      umask,
      uptime,
      version,
      versions,
      // @ts-expect-error old API
      domain,
      initgroups,
      moduleLoadList,
      reallyExit,
      openStdin,
      assert: assert2,
      binding,
      send,
      exitCode,
      channel,
      getegid,
      geteuid,
      getgid,
      getgroups,
      getuid,
      setegid,
      seteuid,
      setgid,
      setgroups,
      setuid,
      permission,
      mainModule,
      _events,
      _eventsCount,
      _exiting,
      _maxListeners,
      _debugEnd,
      _debugProcess,
      _fatalException,
      _getActiveHandles,
      _getActiveRequests,
      _kill,
      _preload_modules,
      _rawDebug,
      _startProfilerIdleNotifier,
      _stopProfilerIdleNotifier,
      _tickCallback,
      _disconnect,
      _handleQueue,
      _pendingMessage,
      _channel,
      _send,
      _linkedBinding
    };
    process_default = _process;
  }
});

// ../../node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-process
var init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process = __esm({
  "../../node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-process"() {
    init_process2();
    globalThis.process = process_default;
  }
});

// ../../node_modules/devalue/src/constants.js
var UNDEFINED, HOLE, NAN, POSITIVE_INFINITY, NEGATIVE_INFINITY, NEGATIVE_ZERO, SPARSE, MAX_ARRAY_LEN, MAX_ARRAY_INDEX;
var init_constants = __esm({
  "../../node_modules/devalue/src/constants.js"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    UNDEFINED = -1;
    HOLE = -2;
    NAN = -3;
    POSITIVE_INFINITY = -4;
    NEGATIVE_INFINITY = -5;
    NEGATIVE_ZERO = -6;
    SPARSE = -7;
    MAX_ARRAY_LEN = 2 ** 32 - 1;
    MAX_ARRAY_INDEX = MAX_ARRAY_LEN - 1;
  }
});

// ../../node_modules/devalue/src/utils.js
function is_primitive(thing) {
  return thing === null || typeof thing !== "object" && typeof thing !== "function";
}
function is_plain_object(thing) {
  const proto = Object.getPrototypeOf(thing);
  return proto === Object.prototype || proto === null || Object.getPrototypeOf(proto) === null || Object.getOwnPropertyNames(proto).sort().join("\0") === object_proto_names;
}
function get_type(thing) {
  return Object.prototype.toString.call(thing).slice(8, -1);
}
function is_buffer(thing) {
  return typeof Buffer !== "undefined" && Buffer.isBuffer(thing);
}
function get_escaped_char(char) {
  switch (char) {
    case '"':
      return '\\"';
    case "<":
      return "\\u003C";
    case "\\":
      return "\\\\";
    case "\n":
      return "\\n";
    case "\r":
      return "\\r";
    case "	":
      return "\\t";
    case "\b":
      return "\\b";
    case "\f":
      return "\\f";
    case "\u2028":
      return "\\u2028";
    case "\u2029":
      return "\\u2029";
    default:
      return char < " " ? `\\u${char.charCodeAt(0).toString(16).padStart(4, "0")}` : "";
  }
}
function stringify_string(str) {
  let result = "";
  let last_pos = 0;
  const len = str.length;
  for (let i = 0; i < len; i += 1) {
    const char = str[i];
    const replacement = get_escaped_char(char);
    if (replacement) {
      result += str.slice(last_pos, i) + replacement;
      last_pos = i + 1;
    }
  }
  return `"${last_pos === 0 ? str : result + str.slice(last_pos)}"`;
}
function enumerable_symbols(object) {
  return Object.getOwnPropertySymbols(object).filter(
    (symbol) => Object.getOwnPropertyDescriptor(object, symbol).enumerable
  );
}
function stringify_key(key2) {
  return is_identifier.test(key2) ? "." + key2 : "[" + JSON.stringify(key2) + "]";
}
function is_valid_array_index(n2) {
  if (!Number.isInteger(n2)) return false;
  if (n2 < 0) return false;
  if (n2 > MAX_ARRAY_INDEX) return false;
  return true;
}
function is_valid_array_len(n2) {
  if (!Number.isInteger(n2)) return false;
  if (n2 < 0) return false;
  if (n2 > MAX_ARRAY_LEN) return false;
  return true;
}
function is_valid_array_index_string(s3) {
  if (s3.length === 0) return false;
  if (s3.length > 1 && s3.charCodeAt(0) === 48) return false;
  for (let i = 0; i < s3.length; i++) {
    const c2 = s3.charCodeAt(i);
    if (c2 < 48 || c2 > 57) return false;
  }
  return is_valid_array_index(+s3);
}
function array_index_cut(keys) {
  for (var i = keys.length - 1; i >= 0; i--) {
    if (is_valid_array_index_string(keys[i])) {
      break;
    }
  }
  return i + 1;
}
function valid_array_indices(array2) {
  const keys = Object.keys(array2);
  keys.length = array_index_cut(keys);
  return keys;
}
var escaped, DevalueError, object_proto_names, is_identifier;
var init_utils2 = __esm({
  "../../node_modules/devalue/src/utils.js"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_constants();
    escaped = {
      "<": "\\u003C",
      "\\": "\\\\",
      "\b": "\\b",
      "\f": "\\f",
      "\n": "\\n",
      "\r": "\\r",
      "	": "\\t",
      "\u2028": "\\u2028",
      "\u2029": "\\u2029"
    };
    DevalueError = class extends Error {
      static {
        __name(this, "DevalueError");
      }
      /**
       * @param {string} message
       * @param {string[]} keys
       * @param {any} [value] - The value that failed to be serialized
       * @param {any} [root] - The root value being serialized
       */
      constructor(message, keys, value, root2) {
        super(message);
        this.name = "DevalueError";
        this.path = keys.join("");
        this.value = value;
        this.root = root2;
      }
    };
    __name(is_primitive, "is_primitive");
    object_proto_names = /* @__PURE__ */ Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
    __name(is_plain_object, "is_plain_object");
    __name(get_type, "get_type");
    __name(is_buffer, "is_buffer");
    __name(get_escaped_char, "get_escaped_char");
    __name(stringify_string, "stringify_string");
    __name(enumerable_symbols, "enumerable_symbols");
    is_identifier = /^[a-zA-Z_$][a-zA-Z_$0-9]*$/;
    __name(stringify_key, "stringify_key");
    __name(is_valid_array_index, "is_valid_array_index");
    __name(is_valid_array_len, "is_valid_array_len");
    __name(is_valid_array_index_string, "is_valid_array_index_string");
    __name(array_index_cut, "array_index_cut");
    __name(valid_array_indices, "valid_array_indices");
  }
});

// ../../node_modules/devalue/src/uneval.js
function uneval(value, replacer) {
  const counts = /* @__PURE__ */ new Map();
  const keys = [];
  const custom = /* @__PURE__ */ new Map();
  let primitives;
  function stringify_cached_primitive(thing) {
    if (typeof thing === "string" && thing.length >= MIN_STRING_LENGTH || typeof thing === "bigint") {
      primitives ??= /* @__PURE__ */ new Map();
      let literal = primitives.get(thing);
      if (literal === void 0) {
        literal = stringify_primitive(thing);
        primitives.set(thing, literal);
      }
      return literal;
    }
    return stringify_primitive(thing);
  }
  __name(stringify_cached_primitive, "stringify_cached_primitive");
  function walk(thing) {
    if (!is_primitive(thing)) {
      if (counts.has(thing)) {
        counts.set(thing, counts.get(thing) + 1);
        return;
      }
      counts.set(thing, 1);
      if (replacer) {
        const str2 = replacer(thing, (value2) => uneval(value2, replacer));
        if (typeof str2 === "string") {
          custom.set(thing, str2);
          return;
        }
      }
      if (typeof thing === "function") {
        throw new DevalueError(`Cannot stringify a function`, keys, thing, value);
      }
      const type = get_type(thing);
      switch (type) {
        case "BigInt":
        case "String":
          walk(thing.valueOf());
          return;
        case "Number":
        case "Boolean":
        case "Date":
        case "RegExp":
        case "URL":
        case "URLSearchParams":
          return;
        case "Array":
          for (const i of valid_array_indices(thing)) {
            keys.push(`[${i}]`);
            walk(thing[i]);
            keys.pop();
          }
          break;
        case "Set":
          Array.from(thing).forEach(walk);
          break;
        case "Map":
          for (const [key2, value2] of thing) {
            keys.push(`.get(${is_primitive(key2) ? stringify_cached_primitive(key2) : "..."})`);
            walk(key2);
            walk(value2);
            keys.pop();
          }
          break;
        case "Int8Array":
        case "Uint8Array":
        case "Uint8ClampedArray":
        case "Int16Array":
        case "Uint16Array":
        case "Float16Array":
        case "Int32Array":
        case "Uint32Array":
        case "Float32Array":
        case "Float64Array":
        case "BigInt64Array":
        case "BigUint64Array":
        case "DataView":
          if (!is_buffer(thing)) walk(thing.buffer);
          return;
        case "ArrayBuffer":
          return;
        case "Temporal.Duration":
        case "Temporal.Instant":
        case "Temporal.PlainDate":
        case "Temporal.PlainTime":
        case "Temporal.PlainDateTime":
        case "Temporal.PlainMonthDay":
        case "Temporal.PlainYearMonth":
        case "Temporal.ZonedDateTime":
          return;
        default:
          if (!is_plain_object(thing)) {
            throw new DevalueError(`Cannot stringify arbitrary non-POJOs`, keys, thing, value);
          }
          if (enumerable_symbols(thing).length > 0) {
            throw new DevalueError(`Cannot stringify POJOs with symbolic keys`, keys, thing, value);
          }
          for (const key2 of Object.keys(thing)) {
            if (key2 === "__proto__") {
              throw new DevalueError(
                `Cannot stringify objects with __proto__ keys`,
                keys,
                thing,
                value
              );
            }
            keys.push(stringify_key(key2));
            walk(thing[key2]);
            keys.pop();
          }
      }
    } else if (typeof thing === "symbol") {
      throw new DevalueError(`Cannot stringify a Symbol primitive`, keys, thing, value);
    } else if (typeof thing === "string" && thing.length >= MIN_STRING_LENGTH || typeof thing === "bigint") {
      counts.set(thing, (counts.get(thing) || 0) + 1);
    }
  }
  __name(walk, "walk");
  walk(value);
  const names = /* @__PURE__ */ new Map();
  const repeated = [];
  counts.forEach((count3, thing) => {
    if (count3 > 1) repeated.push([thing, count3]);
  });
  repeated.sort((a, b) => b[1] - a[1]).forEach(([thing, count3]) => {
    const name = get_name(names.size);
    if (is_primitive(thing)) {
      const length = stringify_cached_primitive(thing).length;
      if (length * count3 <= length + (count3 + 1) * name.length + 25) return;
    }
    names.set(thing, name);
  });
  function stringify4(thing) {
    if (names.has(thing)) {
      return names.get(thing);
    }
    if (is_primitive(thing)) {
      return stringify_primitive(thing);
    }
    if (custom.has(thing)) {
      return custom.get(thing);
    }
    const type = get_type(thing);
    switch (type) {
      case "Number":
      case "String":
      case "Boolean":
      case "BigInt":
        return `Object(${stringify4(thing.valueOf())})`;
      case "RegExp":
        const { source: source2, flags: flags2 } = thing;
        return flags2 ? `new RegExp(${stringify_string(source2)},"${flags2}")` : `new RegExp(${stringify_string(source2)})`;
      case "Date":
        return `new Date(${thing.getTime()})`;
      case "URL":
        return `new URL(${stringify_string(thing.toString())})`;
      case "URLSearchParams":
        return `new URLSearchParams(${stringify_string(thing.toString())})`;
      case "Array": {
        let has_holes = false;
        let result = "[";
        for (let i = 0; i < thing.length; i += 1) {
          if (i > 0) result += ",";
          if (Object.hasOwn(thing, i)) {
            result += stringify4(thing[i]);
          } else if (!has_holes) {
            const populated_keys = valid_array_indices(thing);
            const population = populated_keys.length;
            const d = String(thing.length).length;
            const array2 = stringify_sparse_array(thing.length);
            const hole_cost = thing.length + 2;
            const sparse_cost = array2.length + 18 + population * (d + 2);
            if (hole_cost > sparse_cost) {
              const entries = populated_keys.map((k) => `${k}:${stringify4(thing[k])}`).join(",");
              return `Object.assign(${array2},{${entries}})`;
            }
            has_holes = true;
          }
        }
        const tail = thing.length === 0 || Object.hasOwn(thing, thing.length - 1) ? "" : ",";
        return result + tail + "]";
      }
      case "Set":
      case "Map":
        return `new ${type}([${Array.from(thing).map(stringify4).join(",")}])`;
      case "Int8Array":
      case "Uint8Array":
      case "Uint8ClampedArray":
      case "Int16Array":
      case "Uint16Array":
      case "Float16Array":
      case "Int32Array":
      case "Uint32Array":
      case "Float32Array":
      case "Float64Array":
      case "BigInt64Array":
      case "BigUint64Array": {
        if (is_buffer(thing)) thing = new Uint8Array(thing);
        let str2 = `new ${type}`;
        if (!names.has(thing.buffer)) {
          str2 += `([${stringify_typed_array_elements(type, thing.buffer)}])`;
        } else {
          str2 += `(${stringify4(thing.buffer)})`;
        }
        if (thing.byteLength !== thing.buffer.byteLength) {
          const start = thing.byteOffset / thing.BYTES_PER_ELEMENT;
          const end = start + thing.length;
          str2 += `.subarray(${start},${end})`;
        }
        return str2;
      }
      case "DataView": {
        let str2 = `new DataView`;
        if (!names.has(thing.buffer)) {
          str2 += `(new Uint8Array([${new Uint8Array(thing.buffer)}]).buffer`;
        } else {
          str2 += `(${stringify4(thing.buffer)}`;
        }
        if (thing.byteLength !== thing.buffer.byteLength) {
          str2 += `,${thing.byteOffset},${thing.byteLength}`;
        }
        return str2 + ")";
      }
      case "ArrayBuffer": {
        const ui8 = new Uint8Array(thing);
        return `new Uint8Array([${ui8.toString()}]).buffer`;
      }
      case "Temporal.Duration":
      case "Temporal.Instant":
      case "Temporal.PlainDate":
      case "Temporal.PlainTime":
      case "Temporal.PlainDateTime":
      case "Temporal.PlainMonthDay":
      case "Temporal.PlainYearMonth":
      case "Temporal.ZonedDateTime":
        return `${type}.from(${stringify_string(thing.toString())})`;
      default:
        const keys2 = Object.keys(thing);
        const obj = keys2.map((key2) => `${safe_key(key2)}:${stringify4(thing[key2])}`).join(",");
        const proto = Object.getPrototypeOf(thing);
        if (proto === null) {
          return keys2.length > 0 ? `{${obj},__proto__:null}` : `{__proto__:null}`;
        }
        return `{${obj}}`;
    }
  }
  __name(stringify4, "stringify");
  const str = stringify4(value);
  if (names.size) {
    const params = [];
    const statements = [];
    const values = [];
    const reconstructions = [];
    names.forEach((name, thing) => {
      params.push(name);
      if (custom.has(thing)) {
        values.push(
          /** @type {string} */
          custom.get(thing)
        );
        return;
      }
      if (is_primitive(thing)) {
        values.push(stringify_cached_primitive(thing));
        return;
      }
      const type = get_type(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
        case "BigInt": {
          const primitive = thing.valueOf();
          if (names.has(primitive)) {
            values.push("{}");
            reconstructions.push(`${name}=Object(${stringify4(primitive)})`);
          } else {
            values.push(`Object(${stringify4(primitive)})`);
          }
          break;
        }
        case "RegExp":
          const { source: source2, flags: flags2 } = thing;
          const regexp = flags2 ? `new RegExp(${stringify_string(source2)},"${flags2}")` : `new RegExp(${stringify_string(source2)})`;
          values.push(regexp);
          break;
        case "Date":
          values.push(`new Date(${thing.getTime()})`);
          break;
        case "URL":
          values.push(`new URL(${stringify_string(thing.toString())})`);
          break;
        case "URLSearchParams":
          values.push(`new URLSearchParams(${stringify_string(thing.toString())})`);
          break;
        case "Array": {
          const populated_keys = valid_array_indices(thing);
          values.push(
            thing.length > 32 + 2 * populated_keys.length ? stringify_sparse_array(thing.length) : `Array(${thing.length})`
          );
          for (const i of populated_keys) {
            statements.push(`${name}[${i}]=${stringify4(thing[i])}`);
          }
          break;
        }
        case "Set": {
          values.push(`new Set`);
          const adds = Array.from(thing).map((v) => `.add(${stringify4(v)})`);
          if (adds.length > 0) statements.push(name + adds.join(""));
          break;
        }
        case "Map": {
          values.push(`new Map`);
          const sets = Array.from(thing).map(
            ([k, v]) => `.set(${stringify4(k)}, ${stringify4(v)})`
          );
          if (sets.length > 0) statements.push(name + sets.join(""));
          break;
        }
        case "Int8Array":
        case "Uint8Array":
        case "Uint8ClampedArray":
        case "Int16Array":
        case "Uint16Array":
        case "Float16Array":
        case "Int32Array":
        case "Uint32Array":
        case "Float32Array":
        case "Float64Array":
        case "BigInt64Array":
        case "BigUint64Array": {
          if (is_buffer(thing)) thing = new Uint8Array(thing);
          let str2 = `new ${type}`;
          if (!names.has(thing.buffer)) {
            str2 += `([${stringify_typed_array_elements(type, thing.buffer)}])`;
          } else {
            str2 += `(${stringify4(thing.buffer)})`;
          }
          if (thing.byteLength !== thing.buffer.byteLength) {
            const start = thing.byteOffset / thing.BYTES_PER_ELEMENT;
            const end = start + thing.length;
            str2 += `.subarray(${start},${end})`;
          }
          values.push(`{}`);
          reconstructions.push(`${name}=${str2}`);
          break;
        }
        case "DataView": {
          let str2 = `new DataView`;
          if (!names.has(thing.buffer)) {
            str2 += `(new Uint8Array([${new Uint8Array(thing.buffer)}]).buffer`;
          } else {
            str2 += `(${stringify4(thing.buffer)}`;
          }
          if (thing.byteLength !== thing.buffer.byteLength) {
            str2 += `,${thing.byteOffset},${thing.byteLength}`;
          }
          str2 += ")";
          values.push(`{}`);
          reconstructions.push(`${name}=${str2}`);
          break;
        }
        case "ArrayBuffer":
          values.push(`new Uint8Array([${new Uint8Array(thing)}]).buffer`);
          break;
        case "Temporal.Duration":
        case "Temporal.Instant":
        case "Temporal.PlainDate":
        case "Temporal.PlainTime":
        case "Temporal.PlainDateTime":
        case "Temporal.PlainMonthDay":
        case "Temporal.PlainYearMonth":
        case "Temporal.ZonedDateTime":
          values.push(`${type}.from(${stringify_string(thing.toString())})`);
          break;
        default:
          values.push(Object.getPrototypeOf(thing) === null ? "Object.create(null)" : "{}");
          Object.keys(thing).forEach((key2) => {
            statements.push(`${name}${safe_prop(key2)}=${stringify4(thing[key2])}`);
          });
      }
    });
    statements.push(`return ${str}`);
    const body = [...reconstructions, ...statements].join(";");
    if (params.length > 65534) {
      return `(function(){var[${params.join(",")}]=arguments[0];${body}}([${values.join(",")}]))`;
    }
    return `(function(${params.join(",")}){${body}}(${values.join(",")}))`;
  } else {
    return str;
  }
}
function stringify_sparse_array(length) {
  return `(function(a){a[${MAX_ARRAY_INDEX}]=0;delete a[${MAX_ARRAY_INDEX}];a.length=${length};return a}([]))`;
}
function stringify_typed_array_elements(type, buffer2) {
  const array2 = new /** @type {any} */
  globalThis[type](buffer2);
  if (type === "BigInt64Array" || type === "BigUint64Array") {
    return Array.from(array2, (element) => `${element}n`).join(",");
  }
  if (array2 instanceof Float32Array || array2 instanceof Float64Array || typeof Float16Array !== "undefined" && array2 instanceof Float16Array) {
    return Array.from(array2, (element) => Object.is(element, -0) ? "-0" : `${element}`).join(",");
  }
  return array2.toString();
}
function get_name(num) {
  let name = "";
  do {
    name = chars[num % chars.length] + name;
    num = ~~(num / chars.length) - 1;
  } while (num >= 0);
  return reserved.test(name) ? `${name}0` : name;
}
function escape_unsafe_char(c2) {
  return escaped[c2] || c2;
}
function escape_unsafe_chars(str) {
  return str.replace(unsafe_chars, escape_unsafe_char);
}
function safe_key(key2) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key2) ? key2 : escape_unsafe_chars(JSON.stringify(key2));
}
function safe_prop(key2) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key2) ? `.${key2}` : `[${escape_unsafe_chars(JSON.stringify(key2))}]`;
}
function stringify_primitive(thing) {
  const type = typeof thing;
  if (type === "string") return stringify_string(thing);
  if (thing === void 0) return "void 0";
  if (thing === 0 && 1 / thing < 0) return "-0";
  const str = String(thing);
  if (type === "number") return str.replace(/^(-)?0\./, "$1.");
  if (type === "bigint") return thing + "n";
  return str;
}
var chars, MIN_STRING_LENGTH, unsafe_chars, reserved;
var init_uneval = __esm({
  "../../node_modules/devalue/src/uneval.js"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_constants();
    init_utils2();
    chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$";
    MIN_STRING_LENGTH = 128;
    unsafe_chars = /[<\b\f\n\r\t\0\u2028\u2029]/g;
    reserved = /^(?:do|if|in|for|int|let|new|try|var|byte|case|char|else|enum|goto|long|this|void|with|await|break|catch|class|const|final|float|short|super|throw|while|yield|delete|double|export|import|native|return|switch|throws|typeof|boolean|default|extends|finally|package|private|abstract|continue|debugger|function|volatile|interface|protected|transient|implements|instanceof|synchronized)$/;
    __name(uneval, "uneval");
    __name(stringify_sparse_array, "stringify_sparse_array");
    __name(stringify_typed_array_elements, "stringify_typed_array_elements");
    __name(get_name, "get_name");
    __name(escape_unsafe_char, "escape_unsafe_char");
    __name(escape_unsafe_chars, "escape_unsafe_chars");
    __name(safe_key, "safe_key");
    __name(safe_prop, "safe_prop");
    __name(stringify_primitive, "stringify_primitive");
  }
});

// ../../node_modules/devalue/src/base64.js
function encode_native(array_buffer) {
  return new Uint8Array(array_buffer).toBase64();
}
function decode_native(base64) {
  return Uint8Array.fromBase64(base64).buffer;
}
function encode_buffer(array_buffer) {
  return Buffer.from(array_buffer).toString("base64");
}
function decode_buffer(base64) {
  return Uint8Array.from(Buffer.from(base64, "base64")).buffer;
}
function encode_legacy(array_buffer) {
  const array2 = new Uint8Array(array_buffer);
  let binary = "";
  const chunk_size = 32768;
  for (let i = 0; i < array2.length; i += chunk_size) {
    const chunk = array2.subarray(i, i + chunk_size);
    binary += String.fromCharCode.apply(null, chunk);
  }
  return btoa(binary);
}
function decode_legacy(base64) {
  const binary_string = atob(base64);
  const len = binary_string.length;
  const array2 = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    array2[i] = binary_string.charCodeAt(i);
  }
  return array2.buffer;
}
var native, buffer, encode64, decode64;
var init_base64 = __esm({
  "../../node_modules/devalue/src/base64.js"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    __name(encode_native, "encode_native");
    __name(decode_native, "decode_native");
    __name(encode_buffer, "encode_buffer");
    __name(decode_buffer, "decode_buffer");
    __name(encode_legacy, "encode_legacy");
    __name(decode_legacy, "decode_legacy");
    native = typeof Uint8Array.fromBase64 === "function";
    buffer = typeof process === "object" && process.versions?.node !== void 0;
    encode64 = native ? encode_native : buffer ? encode_buffer : encode_legacy;
    decode64 = native ? decode_native : buffer ? decode_buffer : decode_legacy;
  }
});

// ../../node_modules/devalue/src/operations.js
function merge_operations(defaults, overrides) {
  if (!overrides) return defaults;
  const merged = (
    /** @type {T} */
    {}
  );
  for (
    const key2 of
    /** @type {(keyof T)[]} */
    Object.keys(defaults)
  ) {
    merged[key2] = overrides[key2] ?? defaults[key2];
  }
  return merged;
}
var NOT_PLAIN, SYMBOL_KEYS, stringify_operations, default_stringify_operations, array_buffer_byte_length, shared_array_buffer_byte_length, parse_operations, default_parse_operations;
var init_operations = __esm({
  "../../node_modules/devalue/src/operations.js"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_constants();
    init_utils2();
    __name(merge_operations, "merge_operations");
    NOT_PLAIN = /* @__PURE__ */ Object.freeze({ kind: "not-plain" });
    SYMBOL_KEYS = /* @__PURE__ */ Object.freeze({ kind: "symbol-keys" });
    stringify_operations = {
      identify: /* @__PURE__ */ __name((value) => value, "identify"),
      typeOf: /* @__PURE__ */ __name((value) => value === null ? "null" : typeof value, "typeOf"),
      toPrimitive: /* @__PURE__ */ __name((value) => value, "toPrimitive"),
      tagOf: /* @__PURE__ */ __name((value) => get_type(value), "tagOf"),
      isThenable: /* @__PURE__ */ __name((value) => typeof value.then === "function", "isThenable"),
      toPromise: /* @__PURE__ */ __name((thenable) => Promise.resolve(thenable), "toPromise"),
      unbox: /* @__PURE__ */ __name((boxed) => boxed.valueOf(), "unbox"),
      toISOString: /* @__PURE__ */ __name((date) => isNaN(date.getDate()) ? "" : date.toISOString(), "toISOString"),
      toStringValue: /* @__PURE__ */ __name((value) => value.toString(), "toStringValue"),
      regExpInfo: /* @__PURE__ */ __name((regexp) => ({ source: regexp.source, flags: regexp.flags }), "regExpInfo"),
      valuesOf: /* @__PURE__ */ __name((set2) => set2, "valuesOf"),
      entriesOf: /* @__PURE__ */ __name((map) => map, "entriesOf"),
      viewInfo: /* @__PURE__ */ __name((view) => {
        if (is_buffer(view)) view = new Uint8Array(view);
        return {
          buffer: view.buffer,
          byteOffset: view.byteOffset,
          byteLength: view.byteLength,
          length: view.length,
          bufferByteLength: view.buffer.byteLength
        };
      }, "viewInfo"),
      toArrayBuffer: /* @__PURE__ */ __name((buffer2) => buffer2, "toArrayBuffer"),
      lengthOf: /* @__PURE__ */ __name((array2) => array2.length, "lengthOf"),
      hasOwn: /* @__PURE__ */ __name((value, key2) => Object.hasOwn(value, key2), "hasOwn"),
      indicesOf: /* @__PURE__ */ __name((array2) => valid_array_indices(array2), "indicesOf"),
      shapeOf: /* @__PURE__ */ __name((value) => {
        if (!is_plain_object(value)) return NOT_PLAIN;
        if (enumerable_symbols(value).length > 0) return SYMBOL_KEYS;
        return {
          kind: Object.getPrototypeOf(value) === null ? "null-proto" : "plain",
          keys: Object.keys(value)
        };
      }, "shapeOf"),
      get: /* @__PURE__ */ __name((value, key2) => value[key2], "get")
    };
    default_stringify_operations = /* @__PURE__ */ Object.freeze(stringify_operations);
    array_buffer_byte_length = Object.getOwnPropertyDescriptor(
      ArrayBuffer.prototype,
      "byteLength"
    ).get;
    shared_array_buffer_byte_length = typeof SharedArrayBuffer === "undefined" ? void 0 : Object.getOwnPropertyDescriptor(SharedArrayBuffer.prototype, "byteLength").get;
    parse_operations = {
      fromPrimitive: /* @__PURE__ */ __name((primitive) => primitive, "fromPrimitive"),
      fromISOString: /* @__PURE__ */ __name((iso) => new Date(iso), "fromISOString"),
      fromStringValue: /* @__PURE__ */ __name((tag, text2) => {
        if (tag === "URL") return new URL(text2);
        if (tag === "URLSearchParams") return new URLSearchParams(text2);
        return Temporal[tag.slice(9)].from(text2);
      }, "fromStringValue"),
      fromArrayBuffer: /* @__PURE__ */ __name((buffer2) => buffer2, "fromArrayBuffer"),
      fromRegExpInfo: /* @__PURE__ */ __name((source2, flags2) => new RegExp(source2, flags2), "fromRegExpInfo"),
      fromViewInfo: /* @__PURE__ */ __name((tag, buffer2, byteOffset, length) => {
        try {
          array_buffer_byte_length.call(buffer2);
        } catch (error5) {
          if (!shared_array_buffer_byte_length) throw error5;
          shared_array_buffer_byte_length.call(buffer2);
        }
        const Constructor = (
          /** @type {any} */
          globalThis[tag]
        );
        return byteOffset !== void 0 ? new Constructor(buffer2, byteOffset, length) : new Constructor(buffer2);
      }, "fromViewInfo"),
      box: /* @__PURE__ */ __name((value) => Object(value), "box"),
      createArray: /* @__PURE__ */ __name((length) => new Array(length), "createArray"),
      createSparseArray: /* @__PURE__ */ __name((length) => {
        const array2 = [];
        array2[MAX_ARRAY_INDEX] = void 0;
        delete array2[MAX_ARRAY_INDEX];
        array2.length = length;
        return array2;
      }, "createSparseArray"),
      createObject: /* @__PURE__ */ __name(() => ({}), "createObject"),
      createNullPrototypeObject: /* @__PURE__ */ __name(() => /* @__PURE__ */ Object.create(null), "createNullPrototypeObject"),
      createSet: /* @__PURE__ */ __name(() => /* @__PURE__ */ new Set(), "createSet"),
      createMap: /* @__PURE__ */ __name(() => /* @__PURE__ */ new Map(), "createMap"),
      set: /* @__PURE__ */ __name((target, key2, value) => {
        target[key2] = value;
      }, "set"),
      addValue: /* @__PURE__ */ __name((set2, value) => {
        set2.add(value);
      }, "addValue"),
      addEntry: /* @__PURE__ */ __name((map, key2, value) => {
        map.set(key2, value);
      }, "addEntry")
    };
    default_parse_operations = /* @__PURE__ */ Object.freeze(parse_operations);
  }
});

// ../../node_modules/devalue/src/parse.js
function parse(serialized, revivers, options2) {
  return unflatten(JSON.parse(serialized), revivers, options2);
}
function unflatten(parsed, revivers, options2) {
  const ops = merge_operations(default_parse_operations, options2?.operations);
  if (typeof parsed === "number") return hydrate2(parsed, true);
  if (!Array.isArray(parsed) || parsed.length === 0) {
    throw new Error("Invalid input");
  }
  const values = (
    /** @type {any[]} */
    parsed
  );
  const hydrated = Array(values.length);
  let hydrating2 = null;
  function hydrate2(index9, standalone = false) {
    if (index9 === UNDEFINED) return ops.fromPrimitive(void 0);
    if (index9 === NAN) return ops.fromPrimitive(NaN);
    if (index9 === POSITIVE_INFINITY) return ops.fromPrimitive(Infinity);
    if (index9 === NEGATIVE_INFINITY) return ops.fromPrimitive(-Infinity);
    if (index9 === NEGATIVE_ZERO) return ops.fromPrimitive(-0);
    if (standalone || typeof index9 !== "number") {
      throw new Error(`Invalid input`);
    }
    if (index9 in hydrated) return hydrated[index9];
    if (index9 >= values.length) {
      throw new Error(`Invalid input`);
    }
    const value = values[index9];
    if (!value || typeof value !== "object") {
      hydrated[index9] = ops.fromPrimitive(value);
    } else if (Array.isArray(value)) {
      if (typeof value[0] === "string") {
        const type = value[0];
        const reviver = revivers && Object.hasOwn(revivers, type) ? revivers[type] : void 0;
        if (reviver) {
          let i = value[1];
          if (typeof i !== "number") {
            i = values.push(value[1]) - 1;
          }
          if (Object.hasOwn(hydrated, i)) {
            return hydrated[index9] = reviver(hydrated[i]);
          }
          hydrating2 ??= /* @__PURE__ */ new Set();
          if (hydrating2.has(i)) {
            throw new Error("Invalid circular reference");
          }
          hydrating2.add(i);
          hydrated[index9] = reviver(hydrate2(i));
          hydrating2.delete(i);
          return hydrated[index9];
        }
        switch (type) {
          case "Date":
            hydrated[index9] = ops.fromISOString(value[1]);
            break;
          case "Set":
            const set2 = ops.createSet();
            hydrated[index9] = set2;
            for (let i = 1; i < value.length; i += 1) {
              ops.addValue(set2, hydrate2(value[i]));
            }
            break;
          case "Map":
            const map = ops.createMap();
            hydrated[index9] = map;
            for (let i = 1; i < value.length; i += 2) {
              ops.addEntry(map, hydrate2(value[i]), hydrate2(value[i + 1]));
            }
            break;
          case "RegExp":
            hydrated[index9] = ops.fromRegExpInfo(value[1], value[2]);
            break;
          case "Object": {
            const wrapped_index = value[1];
            if (typeof values[wrapped_index] === "object" && values[wrapped_index][0] !== "BigInt") {
              throw new Error("Invalid input");
            }
            hydrated[index9] = ops.box(hydrate2(wrapped_index));
            break;
          }
          case "BigInt":
            hydrated[index9] = ops.fromPrimitive(BigInt(value[1]));
            break;
          case "null":
            const obj = ops.createNullPrototypeObject();
            hydrated[index9] = obj;
            for (let i = 1; i < value.length; i += 2) {
              const key2 = value[i];
              if (typeof key2 !== "string") {
                throw new Error("Cannot parse an object with a non-string key");
              }
              if (key2 === "__proto__") {
                throw new Error("Cannot parse an object with a `__proto__` property");
              }
              ops.set(obj, key2, hydrate2(value[i + 1]));
            }
            break;
          case "Int8Array":
          case "Uint8Array":
          case "Uint8ClampedArray":
          case "Int16Array":
          case "Uint16Array":
          case "Float16Array":
          case "Int32Array":
          case "Uint32Array":
          case "Float32Array":
          case "Float64Array":
          case "BigInt64Array":
          case "BigUint64Array":
          case "DataView": {
            if (values[value[1]][0] !== "ArrayBuffer") {
              throw new Error("Invalid data");
            }
            const buffer2 = hydrate2(value[1]);
            hydrated[index9] = ops.fromViewInfo(type, buffer2, value[2], value[3]);
            break;
          }
          case "ArrayBuffer": {
            const base64 = value[1];
            if (typeof base64 !== "string") {
              throw new Error("Invalid ArrayBuffer encoding");
            }
            hydrated[index9] = ops.fromArrayBuffer(decode64(base64));
            break;
          }
          case "URL":
          case "URLSearchParams":
          case "Temporal.Duration":
          case "Temporal.Instant":
          case "Temporal.PlainDate":
          case "Temporal.PlainTime":
          case "Temporal.PlainDateTime":
          case "Temporal.PlainMonthDay":
          case "Temporal.PlainYearMonth":
          case "Temporal.ZonedDateTime": {
            hydrated[index9] = ops.fromStringValue(type, value[1]);
            break;
          }
          default:
            throw new Error(`Unknown type ${type}`);
        }
      } else if (value[0] === SPARSE) {
        const len = value[1];
        if (!is_valid_array_len(len)) {
          throw new Error("Invalid input");
        }
        const array2 = ops.createSparseArray(len);
        hydrated[index9] = array2;
        for (let i = 2; i < value.length; i += 2) {
          const idx = value[i];
          if (!is_valid_array_index(idx) || idx >= len) {
            throw new Error("Invalid input");
          }
          ops.set(array2, idx, hydrate2(value[i + 1]));
        }
      } else {
        const array2 = ops.createArray(value.length);
        hydrated[index9] = array2;
        for (let i = 0; i < value.length; i += 1) {
          const n2 = value[i];
          if (n2 === HOLE) continue;
          ops.set(array2, i, hydrate2(n2));
        }
      }
    } else {
      const object = ops.createObject();
      hydrated[index9] = object;
      for (const key2 of Object.keys(value)) {
        if (key2 === "__proto__") {
          throw new Error("Cannot parse an object with a `__proto__` property");
        }
        ops.set(object, key2, hydrate2(value[key2]));
      }
    }
    return hydrated[index9];
  }
  __name(hydrate2, "hydrate");
  return hydrate2(0);
}
var init_parse = __esm({
  "../../node_modules/devalue/src/parse.js"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_base64();
    init_constants();
    init_operations();
    init_utils2();
    __name(parse, "parse");
    __name(unflatten, "unflatten");
  }
});

// ../../node_modules/devalue/src/stringify.js
function stringify(value, reducers, options2) {
  const stringified = run(false, value, reducers, options2);
  return typeof stringified === "string" ? stringified : `[${stringified.join(",")}]`;
}
function run(async, value, reducers, options2) {
  const ops = merge_operations(default_stringify_operations, options2?.operations);
  const stringified = [];
  const indexes = /* @__PURE__ */ new Map();
  const custom = [];
  if (reducers) {
    for (const key2 of Object.getOwnPropertyNames(reducers)) {
      custom.push({ key: key2, fn: reducers[key2] });
    }
  }
  const keys = [];
  let p = 0;
  function flatten(thing, index10) {
    const type = ops.typeOf(thing);
    if (type === "undefined") return UNDEFINED;
    let number;
    if (type === "number") {
      number = /** @type {number} */
      ops.toPrimitive(thing);
      if (Number.isNaN(number)) return NAN;
      if (number === Infinity) return POSITIVE_INFINITY;
      if (number === -Infinity) return NEGATIVE_INFINITY;
      if (number === 0 && 1 / number < 0) return NEGATIVE_ZERO;
    }
    const id = ops.identify(thing);
    if (indexes.has(id)) return (
      /** @type {number} */
      indexes.get(id)
    );
    index10 ??= p++;
    indexes.set(id, index10);
    for (const { key: key2, fn } of custom) {
      const value2 = fn(thing);
      if (value2) {
        stringified[index10] = `["${key2}",${flatten(value2)}]`;
        return index10;
      }
    }
    if (type === "function") {
      throw new DevalueError(`Cannot stringify a function`, keys, thing, value);
    } else if (type === "symbol") {
      throw new DevalueError(`Cannot stringify a Symbol primitive`, keys, thing, value);
    }
    let str = "";
    if (type !== "object") {
      str = stringify_primitive2(type === "number" ? number : ops.toPrimitive(thing));
    } else if (ops.isThenable(thing)) {
      if (!async) {
        throw new DevalueError(
          `Cannot stringify a Promise or thenable \u2014 use stringifyAsync instead`,
          keys,
          thing,
          value
        );
      }
      str = ops.toPromise(thing).then((value2) => {
        const i = flatten(value2, index10);
        if (i < 0) stringified[index10] = i;
      });
      str.catch(() => {
      });
    } else {
      const tag = ops.tagOf(thing);
      switch (tag) {
        case "Number":
        case "String":
        case "Boolean":
        case "BigInt":
          str = `["Object",${flatten(ops.unbox(thing))}]`;
          break;
        case "Date":
          str = `["Date","${ops.toISOString(thing)}"]`;
          break;
        case "URL":
          str = `["URL",${stringify_string(ops.toStringValue(thing))}]`;
          break;
        case "URLSearchParams":
          str = `["URLSearchParams",${stringify_string(ops.toStringValue(thing))}]`;
          break;
        case "RegExp":
          const { source: source2, flags: flags2 } = ops.regExpInfo(thing);
          str = flags2 ? `["RegExp",${stringify_string(source2)},"${flags2}"]` : `["RegExp",${stringify_string(source2)}]`;
          break;
        case "Array": {
          let mostly_dense = false;
          const length = ops.lengthOf(thing);
          str = "[";
          for (let i = 0; i < length; i += 1) {
            if (i > 0) str += ",";
            if (ops.hasOwn(thing, i)) {
              keys.push(`[${i}]`);
              str += flatten(ops.get(thing, i));
              keys.pop();
            } else if (mostly_dense) {
              str += HOLE;
            } else {
              const populated_keys = ops.indicesOf(thing);
              const population = populated_keys.length;
              const d = String(length).length;
              const hole_cost = (length - population) * 3;
              const sparse_cost = 4 + d + population * (d + 1);
              if (hole_cost > sparse_cost) {
                str = "[" + SPARSE + "," + length;
                for (let j = 0; j < populated_keys.length; j++) {
                  const key2 = populated_keys[j];
                  keys.push(`[${key2}]`);
                  str += "," + key2 + "," + flatten(ops.get(thing, key2));
                  keys.pop();
                }
                break;
              } else {
                mostly_dense = true;
                str += HOLE;
              }
            }
          }
          str += "]";
          break;
        }
        case "Set":
          str = '["Set"';
          for (const value2 of ops.valuesOf(thing)) {
            str += `,${flatten(value2)}`;
          }
          str += "]";
          break;
        case "Map":
          str = '["Map"';
          for (const [key2, value2] of ops.entriesOf(thing)) {
            const key_type = ops.typeOf(key2);
            const key_is_primitive = key_type !== "object" && key_type !== "function" && key_type !== "symbol";
            keys.push(
              `.get(${key_is_primitive ? stringify_primitive2(ops.toPrimitive(key2)) : "..."})`
            );
            str += `,${flatten(key2)},${flatten(value2)}`;
            keys.pop();
          }
          str += "]";
          break;
        case "Int8Array":
        case "Uint8Array":
        case "Uint8ClampedArray":
        case "Int16Array":
        case "Uint16Array":
        case "Float16Array":
        case "Int32Array":
        case "Uint32Array":
        case "Float32Array":
        case "Float64Array":
        case "BigInt64Array":
        case "BigUint64Array": {
          const info3 = ops.viewInfo(thing);
          str = '["' + tag + '",' + flatten(info3.buffer);
          if (info3.byteLength !== info3.bufferByteLength) {
            str += `,${info3.byteOffset},${info3.length}`;
          }
          str += "]";
          break;
        }
        case "DataView": {
          const info3 = ops.viewInfo(thing);
          str = '["' + tag + '",' + flatten(info3.buffer);
          if (info3.byteLength !== info3.bufferByteLength) {
            str += `,${info3.byteOffset},${info3.byteLength}`;
          }
          str += "]";
          break;
        }
        case "ArrayBuffer": {
          const base64 = encode64(ops.toArrayBuffer(thing));
          str = `["ArrayBuffer","${base64}"]`;
          break;
        }
        case "Temporal.Duration":
        case "Temporal.Instant":
        case "Temporal.PlainDate":
        case "Temporal.PlainTime":
        case "Temporal.PlainDateTime":
        case "Temporal.PlainMonthDay":
        case "Temporal.PlainYearMonth":
        case "Temporal.ZonedDateTime":
          str = `["${tag}",${stringify_string(ops.toStringValue(thing))}]`;
          break;
        default: {
          const shape = ops.shapeOf(thing);
          if (shape.kind === "not-plain") {
            throw new DevalueError(`Cannot stringify arbitrary non-POJOs`, keys, thing, value);
          }
          if (shape.kind === "symbol-keys") {
            throw new DevalueError(`Cannot stringify POJOs with symbolic keys`, keys, thing, value);
          }
          if (shape.kind === "null-proto") {
            str = '["null"';
            for (const key2 of shape.keys) {
              if (key2 === "__proto__") {
                throw new DevalueError(
                  `Cannot stringify objects with __proto__ keys`,
                  keys,
                  thing,
                  value
                );
              }
              keys.push(stringify_key(key2));
              str += `,${stringify_string(key2)},${flatten(ops.get(thing, key2))}`;
              keys.pop();
            }
            str += "]";
          } else {
            str = "{";
            let started = false;
            for (const key2 of shape.keys) {
              if (key2 === "__proto__") {
                throw new DevalueError(
                  `Cannot stringify objects with __proto__ keys`,
                  keys,
                  thing,
                  value
                );
              }
              if (started) str += ",";
              started = true;
              keys.push(stringify_key(key2));
              str += `${stringify_string(key2)}:${flatten(ops.get(thing, key2))}`;
              keys.pop();
            }
            str += "}";
          }
        }
      }
    }
    stringified[index10] = str;
    return index10;
  }
  __name(flatten, "flatten");
  const index9 = flatten(value);
  if (index9 < 0) return `${index9}`;
  return stringified;
}
function stringify_primitive2(thing) {
  const type = typeof thing;
  if (type === "string") return stringify_string(thing);
  if (thing === void 0) return UNDEFINED.toString();
  if (thing === 0 && 1 / thing < 0) return NEGATIVE_ZERO.toString();
  if (type === "bigint") return `["BigInt","${thing}"]`;
  return String(thing);
}
var init_stringify = __esm({
  "../../node_modules/devalue/src/stringify.js"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_utils2();
    init_constants();
    init_base64();
    init_operations();
    __name(stringify, "stringify");
    __name(run, "run");
    __name(stringify_primitive2, "stringify_primitive");
  }
});

// ../../node_modules/devalue/index.js
var init_devalue = __esm({
  "../../node_modules/devalue/index.js"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_uneval();
    init_parse();
    init_stringify();
  }
});

// ../output/server/chunks/utils2.js
function get_relative_path(from, to) {
  const from_parts = from.split(/[/\\]/);
  const to_parts = to.split(/[/\\]/);
  from_parts.pop();
  while (from_parts[0] === to_parts[0]) {
    from_parts.shift();
    to_parts.shift();
  }
  let i = from_parts.length;
  while (i--) from_parts[i] = "..";
  return from_parts.concat(to_parts).join("/");
}
function base64_encode(bytes) {
  if (globalThis.Buffer) {
    return globalThis.Buffer.from(bytes).toString("base64");
  }
  let binary = "";
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}
function base64_decode(encoded) {
  if (globalThis.Buffer) {
    const buffer2 = globalThis.Buffer.from(encoded, "base64");
    return new Uint8Array(buffer2);
  }
  const binary = atob(encoded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}
var text_encoder;
var init_utils22 = __esm({
  "../output/server/chunks/utils2.js"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    text_encoder = new TextEncoder();
    __name(get_relative_path, "get_relative_path");
    __name(base64_encode, "base64_encode");
    __name(base64_decode, "base64_decode");
  }
});

// ../../node_modules/@sveltejs/kit/src/exports/internal/remote-functions.js
var init_remote_functions = __esm({
  "../../node_modules/@sveltejs/kit/src/exports/internal/remote-functions.js"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
  }
});

// ../../node_modules/@sveltejs/kit/src/exports/internal/index.js
var HttpError, Redirect, SvelteKitError, ActionFailure;
var init_internal = __esm({
  "../../node_modules/@sveltejs/kit/src/exports/internal/index.js"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_remote_functions();
    HttpError = class {
      static {
        __name(this, "HttpError");
      }
      /**
       * @param {number} status
       * @param {{message: string} extends App.Error ? (App.Error | string | undefined) : App.Error} body
       */
      constructor(status, body) {
        this.status = status;
        if (typeof body === "string") {
          this.body = { message: body };
        } else if (body) {
          this.body = body;
        } else {
          this.body = { message: `Error: ${status}` };
        }
      }
      toString() {
        return JSON.stringify(this.body);
      }
    };
    Redirect = class {
      static {
        __name(this, "Redirect");
      }
      /**
       * @param {300 | 301 | 302 | 303 | 304 | 305 | 306 | 307 | 308} status
       * @param {string} location
       */
      constructor(status, location) {
        try {
          new Headers({ location });
        } catch {
          throw new Error(
            `Invalid redirect location ${JSON.stringify(location)}: this string contains characters that cannot be used in HTTP headers`
          );
        }
        this.status = status;
        this.location = location;
      }
    };
    SvelteKitError = class extends Error {
      static {
        __name(this, "SvelteKitError");
      }
      /**
       * @param {number} status
       * @param {string} text
       * @param {string} message
       */
      constructor(status, text2, message) {
        super(message);
        this.status = status;
        this.text = text2;
      }
    };
    ActionFailure = class {
      static {
        __name(this, "ActionFailure");
      }
      /**
       * @param {number} status
       * @param {T} data
       */
      constructor(status, data) {
        this.status = status;
        this.data = data;
      }
    };
  }
});

// ../../node_modules/esm-env/true.js
var true_default;
var init_true = __esm({
  "../../node_modules/esm-env/true.js"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    true_default = true;
  }
});

// ../../node_modules/esm-env/dev-fallback.js
var node_env, dev_fallback_default;
var init_dev_fallback = __esm({
  "../../node_modules/esm-env/dev-fallback.js"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    node_env = "production";
    dev_fallback_default = node_env && !node_env.toLowerCase().startsWith("prod");
  }
});

// ../../node_modules/esm-env/false.js
var init_false = __esm({
  "../../node_modules/esm-env/false.js"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
  }
});

// ../../node_modules/esm-env/index.js
var init_esm_env = __esm({
  "../../node_modules/esm-env/index.js"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_true();
    init_dev_fallback();
    init_false();
  }
});

// ../../node_modules/@sveltejs/kit/src/runtime/pathname.js
var init_pathname = __esm({
  "../../node_modules/@sveltejs/kit/src/runtime/pathname.js"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
  }
});

// ../../node_modules/@sveltejs/kit/src/runtime/utils.js
var text_encoder2;
var init_utils3 = __esm({
  "../../node_modules/@sveltejs/kit/src/runtime/utils.js"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_esm_env();
    text_encoder2 = new TextEncoder();
  }
});

// ../../node_modules/@sveltejs/kit/src/version.js
var init_version = __esm({
  "../../node_modules/@sveltejs/kit/src/version.js"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
  }
});

// ../../node_modules/@sveltejs/kit/src/exports/index.js
function error3(status, body) {
  if ((!true_default || dev_fallback_default) && (isNaN(status) || status < 400 || status > 599)) {
    throw new Error(`HTTP error status codes must be between 400 and 599 \u2014 ${status} is invalid`);
  }
  throw new HttpError(status, body);
}
function redirect(status, location) {
  if ((!true_default || dev_fallback_default) && (isNaN(status) || status < 300 || status > 308)) {
    throw new Error("Invalid status code");
  }
  throw new Redirect(
    // @ts-ignore
    status,
    location.toString()
  );
}
function isRedirect(e3) {
  return e3 instanceof Redirect;
}
function json(data, init2) {
  const body = JSON.stringify(data);
  const headers2 = new Headers(init2?.headers);
  if (!headers2.has("content-length")) {
    headers2.set("content-length", text_encoder2.encode(body).byteLength.toString());
  }
  if (!headers2.has("content-type")) {
    headers2.set("content-type", "application/json");
  }
  return new Response(body, {
    ...init2,
    headers: headers2
  });
}
function text(body, init2) {
  const headers2 = new Headers(init2?.headers);
  if (!headers2.has("content-length")) {
    const encoded = text_encoder2.encode(body);
    headers2.set("content-length", encoded.byteLength.toString());
    return new Response(encoded, {
      ...init2,
      headers: headers2
    });
  }
  return new Response(body, {
    ...init2,
    headers: headers2
  });
}
function fail(status, data) {
  return new ActionFailure(status, data);
}
var init_exports = __esm({
  "../../node_modules/@sveltejs/kit/src/exports/index.js"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_internal();
    init_esm_env();
    init_pathname();
    init_utils3();
    init_version();
    __name(error3, "error");
    __name(redirect, "redirect");
    __name(isRedirect, "isRedirect");
    __name(json, "json");
    __name(text, "text");
    __name(fail, "fail");
  }
});

// ../../node_modules/@sveltejs/kit/src/runtime/server/constants.js
var IN_WEBCONTAINER;
var init_constants2 = __esm({
  "../../node_modules/@sveltejs/kit/src/runtime/server/constants.js"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    IN_WEBCONTAINER = !!globalThis.process?.versions?.webcontainer;
  }
});

// ../../node_modules/@sveltejs/kit/src/exports/internal/event.js
function with_request_store(store, fn) {
  try {
    sync_store = store;
    return als ? als.run(store, fn) : fn();
  } finally {
    if (!IN_WEBCONTAINER) {
      sync_store = null;
    }
  }
}
var sync_store, als;
var init_event = __esm({
  "../../node_modules/@sveltejs/kit/src/exports/internal/event.js"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_constants2();
    sync_store = null;
    import("node:async_hooks").then((hooks) => als = new hooks.AsyncLocalStorage()).catch(() => {
    });
    __name(with_request_store, "with_request_store");
  }
});

// ../../node_modules/@sveltejs/kit/src/exports/internal/server.js
function merge_tracing(event_like, current2) {
  return {
    ...event_like,
    tracing: {
      ...event_like.tracing,
      current: current2
    }
  };
}
var init_server = __esm({
  "../../node_modules/@sveltejs/kit/src/exports/internal/server.js"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_event();
    __name(merge_tracing, "merge_tracing");
  }
});

// ../../node_modules/clsx/dist/clsx.mjs
function r(e3) {
  var t2, f, n2 = "";
  if ("string" == typeof e3 || "number" == typeof e3) n2 += e3;
  else if ("object" == typeof e3) if (Array.isArray(e3)) {
    var o2 = e3.length;
    for (t2 = 0; t2 < o2; t2++) e3[t2] && (f = r(e3[t2])) && (n2 && (n2 += " "), n2 += f);
  } else for (f in e3) e3[f] && (n2 && (n2 += " "), n2 += f);
  return n2;
}
function clsx() {
  for (var e3, t2, f = 0, n2 = "", o2 = arguments.length; f < o2; f++) (e3 = arguments[f]) && (t2 = r(e3)) && (n2 && (n2 += " "), n2 += t2);
  return n2;
}
var init_clsx = __esm({
  "../../node_modules/clsx/dist/clsx.mjs"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    __name(r, "r");
    __name(clsx, "clsx");
  }
});

// ../output/server/chunks/index.js
function run_all(arr) {
  for (var i = 0; i < arr.length; i++) {
    arr[i]();
  }
}
function deferred() {
  var resolve2;
  var reject;
  var promise = new Promise((res, rej) => {
    resolve2 = res;
    reject = rej;
  });
  return { promise, resolve: resolve2, reject };
}
function lifecycle_outside_component(name) {
  {
    throw new Error(`https://svelte.dev/e/lifecycle_outside_component`);
  }
}
function set_context_after_init() {
  {
    throw new Error(`https://svelte.dev/e/set_context_after_init`);
  }
}
function get_parent_context(context22) {
  let parent = context22.p;
  while (parent !== null && parent.c === null) {
    parent = parent.p;
  }
  return parent?.c ?? null;
}
function get_or_init_context_map(context22, name) {
  if (context22 === null) {
    lifecycle_outside_component();
  }
  return context22.c ??= new Map(get_parent_context(context22) || void 0);
}
function is_boolean_attribute(name) {
  return DOM_BOOLEAN_ATTRIBUTES.includes(name);
}
function is_passive_event(name) {
  return PASSIVE_EVENTS.includes(name);
}
function escape_html2(value, is_attr) {
  const str = String(value ?? "");
  const pattern2 = is_attr ? ATTR_REGEX : CONTENT_REGEX;
  pattern2.lastIndex = 0;
  let escaped2 = "";
  let last = 0;
  while (pattern2.test(str)) {
    const i = pattern2.lastIndex - 1;
    const ch = str[i];
    escaped2 += str.substring(last, i) + (ch === "&" ? "&amp;" : ch === '"' ? "&quot;" : "&lt;");
    last = i + 1;
  }
  return escaped2 + str.substring(last);
}
function attr(name, value, is_boolean = false) {
  if (name === "hidden" && value !== "until-found") {
    is_boolean = true;
  }
  if (value == null || is_boolean && !value && value !== "") return "";
  const normalized = has_own_property.call(replacements, name) && replacements[name].get(value) || value;
  const assignment = is_boolean ? `=""` : `="${escape_html2(normalized, true)}"`;
  return ` ${name}${assignment}`;
}
function clsx2(value) {
  if (typeof value === "object") {
    return clsx(value);
  } else {
    return value ?? "";
  }
}
function to_class(value, hash2, directives) {
  var classname = value == null ? "" : "" + value;
  if (hash2) {
    classname = classname ? classname + " " + hash2 : hash2;
  }
  if (directives) {
    for (var key2 of Object.keys(directives)) {
      if (directives[key2]) {
        classname = classname ? classname + " " + key2 : key2;
      } else if (classname.length) {
        var len = key2.length;
        var a = 0;
        while ((a = classname.indexOf(key2, a)) >= 0) {
          var b = a + len;
          if ((a === 0 || whitespace.includes(classname[a - 1])) && (b === classname.length || whitespace.includes(classname[b]))) {
            classname = (a === 0 ? "" : classname.substring(0, a)) + classname.substring(b + 1);
          } else {
            a = b;
          }
        }
      }
    }
  }
  return classname === "" ? null : classname;
}
function append_styles(styles, important = false) {
  var separator = important ? " !important;" : ";";
  var css = "";
  for (var key2 of Object.keys(styles)) {
    var value = styles[key2];
    if (value != null && value !== "") {
      css += " " + key2 + ": " + value + separator;
    }
  }
  return css;
}
function to_css_name(name) {
  if (name[0] !== "-" || name[1] !== "-") {
    return name.toLowerCase();
  }
  return name;
}
function to_style(value, styles) {
  if (styles) {
    var new_style = "";
    var normal_styles;
    var important_styles;
    if (Array.isArray(styles)) {
      normal_styles = styles[0];
      important_styles = styles[1];
    } else {
      normal_styles = styles;
    }
    if (value) {
      value = String(value).replaceAll(/\/\*.*?\*\//g, "").trim();
      var in_str = false;
      var in_apo = 0;
      var in_comment = false;
      var reserved_names = [];
      if (normal_styles) {
        reserved_names.push(...Object.keys(normal_styles).map(to_css_name));
      }
      if (important_styles) {
        reserved_names.push(...Object.keys(important_styles).map(to_css_name));
      }
      var start_index = 0;
      var name_index = -1;
      const len = value.length;
      for (var i = 0; i < len; i++) {
        var c2 = value[i];
        if (in_comment) {
          if (c2 === "/" && value[i - 1] === "*") {
            in_comment = false;
          }
        } else if (in_str) {
          if (in_str === c2) {
            in_str = false;
          }
        } else if (c2 === "/" && value[i + 1] === "*") {
          in_comment = true;
        } else if (c2 === '"' || c2 === "'") {
          in_str = c2;
        } else if (c2 === "(") {
          in_apo++;
        } else if (c2 === ")") {
          in_apo--;
        }
        if (!in_comment && in_str === false && in_apo === 0) {
          if (c2 === ":" && name_index === -1) {
            name_index = i;
          } else if (c2 === ";" || i === len - 1) {
            if (name_index !== -1) {
              var name = to_css_name(value.substring(start_index, name_index).trim());
              if (!reserved_names.includes(name)) {
                if (c2 !== ";") {
                  i++;
                }
                var property = value.substring(start_index, i).trim();
                new_style += " " + property + ";";
              }
            }
            start_index = i + 1;
            name_index = -1;
          }
        }
      }
    }
    if (normal_styles) {
      new_style += append_styles(normal_styles);
    }
    if (important_styles) {
      new_style += append_styles(important_styles, true);
    }
    new_style = new_style.trim();
    return new_style === "" ? null : new_style;
  }
  return value == null ? null : String(value);
}
function async_local_storage_unavailable() {
  const error5 = new Error(`async_local_storage_unavailable
The node API \`AsyncLocalStorage\` is not available, but is required to use async server rendering.
https://svelte.dev/e/async_local_storage_unavailable`);
  error5.name = "Svelte error";
  throw error5;
}
function await_invalid() {
  const error5 = new Error(`await_invalid
Encountered asynchronous work while rendering synchronously.
https://svelte.dev/e/await_invalid`);
  error5.name = "Svelte error";
  throw error5;
}
function invalid_csp() {
  const error5 = new Error(`invalid_csp
\`csp.nonce\` was set while \`csp.hash\` was \`true\`. These options cannot be used simultaneously.
https://svelte.dev/e/invalid_csp`);
  error5.name = "Svelte error";
  throw error5;
}
function invalid_id_prefix() {
  const error5 = new Error(`invalid_id_prefix
The \`idPrefix\` option cannot include \`--\`.
https://svelte.dev/e/invalid_id_prefix`);
  error5.name = "Svelte error";
  throw error5;
}
function server_context_required() {
  const error5 = new Error(`server_context_required
Could not resolve \`render\` context.
https://svelte.dev/e/server_context_required`);
  error5.name = "Svelte error";
  throw error5;
}
function set_ssr_context(v) {
  ssr_context = v;
}
function getContext(key2) {
  const context_map = get_or_init_context_map(ssr_context);
  const result = (
    /** @type {T} */
    context_map.get(key2)
  );
  return result;
}
function setContext(key2, context22) {
  const context_map = get_or_init_context_map(ssr_context);
  if (
    /** @type {SSRContext} */
    ssr_context.i
  ) {
    set_context_after_init();
  }
  context_map.set(key2, context22);
  return context22;
}
function push(fn) {
  ssr_context = { p: ssr_context, c: null, r: null, i: false };
}
function pop() {
  ssr_context = /** @type {SSRContext} */
  ssr_context.p;
}
function unresolved_hydratable(key2, stack) {
  {
    console.warn(`https://svelte.dev/e/unresolved_hydratable`);
  }
}
function get_render_context() {
  const store = context2 ?? als2?.getStore();
  if (!store) {
    server_context_required();
  }
  return store;
}
async function with_render_context(fn) {
  context2 = {
    hydratable: {
      lookup: /* @__PURE__ */ new Map(),
      comparisons: [],
      unresolved_promises: /* @__PURE__ */ new Map()
    }
  };
  if (in_webcontainer()) {
    const { promise, resolve: resolve2 } = deferred();
    const previous_render = current_render;
    current_render = promise;
    await previous_render;
    return fn().finally(resolve2);
  }
  try {
    if (als2 === null) {
      async_local_storage_unavailable();
    }
    return als2.run(context2, fn);
  } finally {
    context2 = null;
  }
}
function init_render_context() {
  als_import ??= import("node:async_hooks").then((hooks) => {
    als2 = new hooks.AsyncLocalStorage();
  }).then(noop2, noop2);
  return als_import;
}
function in_webcontainer() {
  return !!globalThis.process?.versions?.webcontainer;
}
async function sha256(data) {
  text_encoder3 ??= new TextEncoder();
  crypto2 ??= globalThis.crypto?.subtle?.digest ? globalThis.crypto : (
    // @ts-ignore - we don't install node types in the prod build
    // don't use import('node:crypto') directly because static analysers will think we rely on node when we don't
    (await obfuscated_import("node:crypto")).webcrypto
  );
  const hash_buffer = await crypto2.subtle.digest("SHA-256", text_encoder3.encode(data));
  return base64_encode2(hash_buffer);
}
function base64_encode2(bytes) {
  if (globalThis.Buffer) {
    return globalThis.Buffer.from(bytes).toString("base64");
  }
  let binary = "";
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}
function render(component8, options2 = {}) {
  if (options2.csp?.hash && options2.csp.nonce) {
    invalid_csp();
  }
  return Renderer.render(
    /** @type {Component<Props>} */
    component8,
    options2
  );
}
function head(hash2, renderer, fn) {
  renderer.head((renderer2) => {
    renderer2.push(`<!--${hash2}-->`);
    renderer2.child(fn);
    renderer2.push(EMPTY_COMMENT);
  });
}
function attributes(attrs, css_hash, classes, styles, flags2 = 0) {
  if (styles) {
    attrs.style = to_style(attrs.style, styles);
  }
  if (attrs.class) {
    attrs.class = clsx2(attrs.class);
  }
  if (css_hash || classes) {
    attrs.class = to_class(attrs.class, css_hash, classes);
  }
  let attr_str = "";
  let name;
  const is_html = (flags2 & ELEMENT_IS_NAMESPACED) === 0;
  const lowercase = (flags2 & ELEMENT_PRESERVE_ATTRIBUTE_CASE) === 0;
  const is_input = (flags2 & ELEMENT_IS_INPUT) !== 0;
  const names = Object.keys(attrs);
  outer: for (let i = 0; i < names.length; i++) {
    name = names[i];
    if (typeof attrs[name] === "function") continue;
    if (name[0] === "$" && name[1] === "$") continue;
    if (name === "" || INVALID_ATTR_NAME_CHAR_REGEX.test(name)) continue;
    var value = attrs[name];
    var lower = name.toLowerCase();
    if (lowercase) name = lower;
    if (lower.length > 2 && lower.startsWith("on")) continue;
    if (is_input) {
      if (name === "defaultvalue" || name === "defaultchecked") {
        name = name === "defaultvalue" ? "value" : "checked";
        if (name in attrs) continue;
        for (let j = 0; j < names.length; j++) {
          if (names[j].toLowerCase() === name) continue outer;
        }
      }
    }
    attr_str += attr(name, value, is_html && is_boolean_attribute(name));
  }
  return attr_str;
}
function stringify3(value) {
  return typeof value === "string" ? value : value == null ? "" : value + "";
}
function attr_class(value, hash2, directives) {
  var result = to_class(value, hash2, directives);
  return result ? ` class="${escape_html2(result, true)}"` : "";
}
function ensure_array_like(array_like_or_iterator) {
  if (array_like_or_iterator) {
    return array_like_or_iterator.length !== void 0 ? array_like_or_iterator : Array.from(array_like_or_iterator);
  }
  return [];
}
function once3(get_value) {
  let value = (
    /** @type {V} */
    UNINITIALIZED
  );
  return () => {
    if (value === UNINITIALIZED) {
      value = get_value();
    }
    return value;
  };
}
function derived(fn) {
  const get_value = ssr_context === null ? fn : once3(fn);
  let updated_value;
  return function(new_value) {
    if (arguments.length === 0) {
      return updated_value ?? get_value();
    }
    updated_value = new_value;
    return updated_value;
  };
}
var DERIVED, EFFECT, RENDER_EFFECT, MANAGED_EFFECT, BLOCK_EFFECT, BRANCH_EFFECT, ROOT_EFFECT, BOUNDARY_EFFECT, PAUSED, CONNECTED, CLEAN, DIRTY, MAYBE_DIRTY, INERT, DESTROYED, REACTION_RAN, DESTROYING, EFFECT_TRANSPARENT, EAGER_EFFECT, HEAD_EFFECT, EFFECT_PRESERVED, USER_EFFECT, REACTION_IS_UPDATING, ASYNC, ERROR_VALUE, STATE_SYMBOL, COMPONENT_SYMBOL, LEGACY_PROPS, ATTRIBUTES_CACHE, CLASS_CACHE, STYLE_CACHE, TEXT_CACHE, STALE_REACTION, COMMENT_NODE, is_array, index_of, includes, array_from, define_property, get_descriptor, object_prototype, array_prototype, get_prototype_of, is_extensible, has_own_property, noop2, HYDRATION_START, HYDRATION_START_ELSE, HYDRATION_START_FAILED, HYDRATION_END, HYDRATION_ERROR, ELEMENT_IS_NAMESPACED, ELEMENT_PRESERVE_ATTRIBUTE_CASE, ELEMENT_IS_INPUT, UNINITIALIZED, DOM_BOOLEAN_ATTRIBUTES, PASSIVE_EVENTS, ATTR_REGEX, CONTENT_REGEX, replacements, whitespace, BLOCK_OPEN, BLOCK_CLOSE, EMPTY_COMMENT, ssr_context, current_render, context2, als2, als_import, text_encoder3, crypto2, obfuscated_import, RenderResult, Renderer, SSRState, INVALID_ATTR_NAME_CHAR_REGEX;
var init_chunks = __esm({
  "../output/server/chunks/index.js"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_clsx();
    init_devalue();
    DERIVED = 1 << 1;
    EFFECT = 1 << 2;
    RENDER_EFFECT = 1 << 3;
    MANAGED_EFFECT = 1 << 24;
    BLOCK_EFFECT = 1 << 4;
    BRANCH_EFFECT = 1 << 5;
    ROOT_EFFECT = 1 << 6;
    BOUNDARY_EFFECT = 1 << 7;
    PAUSED = 1 << 8;
    CONNECTED = 1 << 9;
    CLEAN = 1 << 10;
    DIRTY = 1 << 11;
    MAYBE_DIRTY = 1 << 12;
    INERT = 1 << 13;
    DESTROYED = 1 << 14;
    REACTION_RAN = 1 << 15;
    DESTROYING = 1 << 25;
    EFFECT_TRANSPARENT = 1 << 16;
    EAGER_EFFECT = 1 << 17;
    HEAD_EFFECT = 1 << 18;
    EFFECT_PRESERVED = 1 << 19;
    USER_EFFECT = 1 << 20;
    REACTION_IS_UPDATING = 1 << 21;
    ASYNC = 1 << 22;
    ERROR_VALUE = 1 << 23;
    STATE_SYMBOL = /* @__PURE__ */ Symbol("$state");
    COMPONENT_SYMBOL = /* @__PURE__ */ Symbol("component");
    LEGACY_PROPS = /* @__PURE__ */ Symbol("legacy props");
    ATTRIBUTES_CACHE = /* @__PURE__ */ Symbol("attributes");
    CLASS_CACHE = /* @__PURE__ */ Symbol("class");
    STYLE_CACHE = /* @__PURE__ */ Symbol("style");
    TEXT_CACHE = /* @__PURE__ */ Symbol("text");
    STALE_REACTION = new class StaleReactionError extends Error {
      static {
        __name(this, "StaleReactionError");
      }
      name = "StaleReactionError";
      message = "The reaction that called `getAbortSignal()` was re-run or destroyed";
    }();
    COMMENT_NODE = 8;
    is_array = Array.isArray;
    index_of = Array.prototype.indexOf;
    includes = Array.prototype.includes;
    array_from = Array.from;
    define_property = Object.defineProperty;
    get_descriptor = Object.getOwnPropertyDescriptor;
    object_prototype = Object.prototype;
    array_prototype = Array.prototype;
    get_prototype_of = Object.getPrototypeOf;
    is_extensible = Object.isExtensible;
    has_own_property = Object.prototype.hasOwnProperty;
    noop2 = /* @__PURE__ */ __name(() => {
    }, "noop");
    __name(run_all, "run_all");
    __name(deferred, "deferred");
    __name(lifecycle_outside_component, "lifecycle_outside_component");
    __name(set_context_after_init, "set_context_after_init");
    HYDRATION_START = "[";
    HYDRATION_START_ELSE = "[!";
    HYDRATION_START_FAILED = "[?";
    HYDRATION_END = "]";
    HYDRATION_ERROR = {};
    ELEMENT_IS_NAMESPACED = 1;
    ELEMENT_PRESERVE_ATTRIBUTE_CASE = 1 << 1;
    ELEMENT_IS_INPUT = 1 << 2;
    UNINITIALIZED = /* @__PURE__ */ Symbol("uninitialized");
    __name(get_parent_context, "get_parent_context");
    __name(get_or_init_context_map, "get_or_init_context_map");
    DOM_BOOLEAN_ATTRIBUTES = [
      "allowfullscreen",
      "async",
      "autofocus",
      "autoplay",
      "checked",
      "controls",
      "default",
      "disabled",
      "formnovalidate",
      "indeterminate",
      "inert",
      "ismap",
      "loop",
      "multiple",
      "muted",
      "nomodule",
      "novalidate",
      "open",
      "playsinline",
      "readonly",
      "required",
      "reversed",
      "seamless",
      "selected",
      "webkitdirectory",
      "defer",
      "disablepictureinpicture",
      "disableremoteplayback"
    ];
    __name(is_boolean_attribute, "is_boolean_attribute");
    PASSIVE_EVENTS = ["touchstart", "touchmove"];
    __name(is_passive_event, "is_passive_event");
    ATTR_REGEX = /[&"<]/g;
    CONTENT_REGEX = /[&<]/g;
    __name(escape_html2, "escape_html");
    replacements = {
      translate: /* @__PURE__ */ new Map([
        [true, "yes"],
        [false, "no"]
      ])
    };
    __name(attr, "attr");
    __name(clsx2, "clsx");
    whitespace = [..." 	\n\r\f\xA0\v\uFEFF"];
    __name(to_class, "to_class");
    __name(append_styles, "append_styles");
    __name(to_css_name, "to_css_name");
    __name(to_style, "to_style");
    BLOCK_OPEN = `<!--${HYDRATION_START}-->`;
    BLOCK_CLOSE = `<!--${HYDRATION_END}-->`;
    EMPTY_COMMENT = `<!---->`;
    __name(async_local_storage_unavailable, "async_local_storage_unavailable");
    __name(await_invalid, "await_invalid");
    __name(invalid_csp, "invalid_csp");
    __name(invalid_id_prefix, "invalid_id_prefix");
    __name(server_context_required, "server_context_required");
    ssr_context = null;
    __name(set_ssr_context, "set_ssr_context");
    __name(getContext, "getContext");
    __name(setContext, "setContext");
    __name(push, "push");
    __name(pop, "pop");
    __name(unresolved_hydratable, "unresolved_hydratable");
    current_render = null;
    context2 = null;
    __name(get_render_context, "get_render_context");
    __name(with_render_context, "with_render_context");
    als2 = null;
    als_import = null;
    __name(init_render_context, "init_render_context");
    __name(in_webcontainer, "in_webcontainer");
    obfuscated_import = /* @__PURE__ */ __name((module_name) => import(
      /* @vite-ignore */
      module_name
    ), "obfuscated_import");
    __name(sha256, "sha256");
    __name(base64_encode2, "base64_encode");
    RenderResult = class {
      static {
        __name(this, "RenderResult");
      }
      /** @type {() => AccumulatedContent} */
      #render;
      /** @type {() => Promise<AccumulatedContent & { hashes: { script: Sha256Source[] } }>} */
      #render_async;
      /** @type {AccumulatedContent | undefined} */
      #sync;
      /** @type {{ script: '' }} */
      #hashes = { script: "" };
      /** @type {Promise<AccumulatedContent & { hashes: { script: Sha256Source[] } }> | undefined} */
      #promise;
      /**
       * @param {() => AccumulatedContent} render
       * @param {() => Promise<AccumulatedContent & { hashes: { script: Sha256Source[] } }>} render_async
       */
      constructor(render2, render_async) {
        this.#render = render2;
        this.#render_async = render_async;
      }
      #get() {
        return this.#sync ??= this.#render();
      }
      get html() {
        return this.#get().body;
      }
      get head() {
        return this.#get().head;
      }
      get body() {
        return this.#get().body;
      }
      get hashes() {
        return this.#hashes;
      }
      /**
       * This is not type-safe, but honestly it's the best I can do right now, and it's a straightforward function.
       *
       * @template TResult1
       * @template [TResult2=never]
       * @param {(value: SyncRenderOutput) => TResult1} onfulfilled
       * @param {(reason: unknown) => TResult2} onrejected
       */
      then(onfulfilled, onrejected) {
        {
          const result = this.#get();
          const user_result = onfulfilled({
            head: result.head,
            body: result.body,
            html: result.body,
            hashes: { script: [] }
          });
          return Promise.resolve(user_result);
        }
      }
    };
    Renderer = class _Renderer {
      static {
        __name(this, "Renderer");
      }
      /**
       * The contents of the renderer.
       * @type {RendererItem[]}
       */
      #out = [];
      /**
       * Any `onDestroy` callbacks registered during execution of this renderer.
       * @type {(() => void)[] | undefined}
       */
      #on_destroy = void 0;
      /**
       * Whether this renderer is a component body.
       * @type {boolean}
       */
      #is_component_body = false;
      /**
       * If set, this renderer is an error boundary. When async collection
       * of the children fails, the failed snippet is rendered instead.
       * @type {{
       * 	failed: (renderer: Renderer, error: unknown, reset: () => void) => void;
       * 	transformError: (error: unknown) => unknown;
       * 	context: SSRContext | null;
       * } | null}
       */
      #boundary = null;
      /**
       * The type of string content that this renderer is accumulating.
       * @type {RendererType}
       */
      type;
      /** @type {Renderer | undefined} */
      #parent;
      /**
       * Asynchronous work associated with this renderer
       * @type {Promise<void> | undefined}
       */
      promise = void 0;
      /**
       * State which is associated with the content tree as a whole.
       * It will be re-exposed, uncopied, on all children.
       * @type {SSRState}
       * @readonly
       */
      global;
      /**
       * State that is local to the branch it is declared in.
       * It will be shallow-copied to all children.
       *
       * @type {{ select_value: any, multiple: boolean }}
       */
      local;
      /**
       * @param {SSRState} global
       * @param {Renderer | undefined} [parent]
       */
      constructor(global, parent) {
        this.#parent = parent;
        this.global = global;
        this.local = parent ? { ...parent.local } : { select_value: void 0, multiple: false };
        this.type = parent ? parent.type : "body";
      }
      /**
       * @param {(renderer: Renderer) => void} fn
       */
      head(fn) {
        const head2 = new _Renderer(this.global, this);
        head2.type = "head";
        this.#out.push(head2);
        head2.child(fn);
      }
      /**
       * @param {Array<Promise<void>>} blockers
       * @param {(renderer: Renderer) => void} fn
       */
      async_block(blockers, fn) {
        this.#out.push(BLOCK_OPEN);
        this.async(blockers, fn);
        this.#out.push(BLOCK_CLOSE);
      }
      /**
       * @param {Array<Promise<void>>} blockers
       * @param {(renderer: Renderer) => void} fn
       */
      async(blockers, fn) {
        let callback = fn;
        if (blockers.length > 0) {
          const context22 = ssr_context;
          callback = /* @__PURE__ */ __name((renderer) => {
            return Promise.all(blockers).then(() => {
              const previous_context = ssr_context;
              try {
                set_ssr_context(context22);
                return fn(renderer);
              } finally {
                set_ssr_context(previous_context);
              }
            });
          }, "callback");
        }
        this.child(callback);
      }
      /**
       * @param {Array<() => void>} thunks
       */
      run(thunks) {
        const context22 = ssr_context;
        let promise = Promise.resolve(thunks[0]());
        const promises = [promise];
        if (context22 !== null && thunks.length > 1) {
          context22.i = true;
        }
        for (const fn of thunks.slice(1)) {
          promise = promise.then(() => {
            const previous_context = ssr_context;
            set_ssr_context(context22);
            try {
              return fn();
            } finally {
              set_ssr_context(previous_context);
            }
          });
          promises.push(promise);
        }
        promise.catch(noop2);
        this.promise = this.global.track(promise);
        return promises;
      }
      /**
       * @param {(renderer: Renderer) => MaybePromise<void>} fn
       */
      child_block(fn) {
        this.#out.push(BLOCK_OPEN);
        this.child(fn);
        this.#out.push(BLOCK_CLOSE);
      }
      /**
       * Create a child renderer. The child renderer inherits the state from the parent,
       * but has its own content.
       * @param {(renderer: Renderer) => MaybePromise<void>} fn
       */
      child(fn) {
        const child = new _Renderer(this.global, this);
        this.#out.push(child);
        const parent = ssr_context;
        set_ssr_context({
          ...ssr_context,
          p: parent,
          c: null,
          r: child,
          i: ssr_context?.i ?? false
        });
        const result = fn(child);
        set_ssr_context(parent);
        if (result instanceof Promise) {
          result.catch(noop2);
          result.finally(() => set_ssr_context(null)).catch(noop2);
          if (child.global.mode === "sync") {
            await_invalid();
          }
          child.promise = child.global.track(result);
        }
        return child;
      }
      /**
       * Render children inside an error boundary. If the children throw and the API-level
       * `transformError` transform handles the error (doesn't re-throw), the `failed` snippet is
       * rendered instead. Otherwise the error propagates.
       *
       * @param {{ failed?: (renderer: Renderer, error: unknown, reset: () => void) => void }} props
       * @param {(renderer: Renderer) => MaybePromise<void>} children_fn
       */
      boundary(props, children_fn) {
        const child = new _Renderer(this.global, this);
        this.#out.push(child);
        const parent_context = ssr_context;
        if (props.failed) {
          child.#boundary = {
            failed: props.failed,
            transformError: this.global.transformError,
            context: parent_context
          };
        }
        set_ssr_context({
          ...ssr_context,
          p: parent_context,
          c: null,
          r: child,
          i: ssr_context?.i ?? false
        });
        try {
          const result = children_fn(child);
          set_ssr_context(parent_context);
          if (result instanceof Promise) {
            if (child.global.mode === "sync") {
              await_invalid();
            }
            result.catch(noop2);
            child.promise = child.global.track(result);
          }
        } catch (error5) {
          set_ssr_context(parent_context);
          const failed_snippet = props.failed;
          if (!failed_snippet) throw error5;
          const result = this.global.transformError(error5);
          child.#out.length = 0;
          child.#boundary = null;
          if (result instanceof Promise) {
            if (this.global.mode === "sync") {
              await_invalid();
            }
            child.promise = child.global.track(
              /** @type {Promise<unknown>} */
              result.then((transformed) => {
                set_ssr_context(parent_context);
                child.#out.push(_Renderer.#serialize_failed_boundary(transformed));
                failed_snippet(child, transformed, noop2);
                child.#out.push(BLOCK_CLOSE);
              })
            );
            child.promise.catch(noop2);
          } else {
            child.#out.push(_Renderer.#serialize_failed_boundary(result));
            failed_snippet(child, result, noop2);
            child.#out.push(BLOCK_CLOSE);
          }
        }
      }
      /**
       * Create a component renderer. The component renderer inherits the state from the parent,
       * but has its own content. It is treated as an ordering boundary for ondestroy callbacks.
       * @param {(renderer: Renderer) => MaybePromise<void>} fn
       * @param {Function} [component_fn]
       * @returns {void}
       */
      component(fn, component_fn) {
        push();
        this.child((renderer) => {
          renderer.#is_component_body = true;
          return fn(renderer);
        });
        pop();
      }
      /**
       * @param {Record<string, any>} attrs
       * @param {(renderer: Renderer) => void} fn
       * @param {string | undefined} [css_hash]
       * @param {Record<string, boolean> | undefined} [classes]
       * @param {Record<string, string> | undefined} [styles]
       * @param {number | undefined} [flags]
       * @param {boolean | undefined} [is_rich]
       * @returns {void}
       */
      select(attrs, fn, css_hash, classes, styles, flags2, is_rich) {
        const { value, defaultValue, ...select_attrs } = attrs;
        if (select_attrs.multiple === "") select_attrs.multiple = true;
        this.push(`<select${attributes(select_attrs, css_hash, classes, styles, flags2)}>`);
        this.child((renderer) => {
          renderer.local.select_value = value === void 0 ? defaultValue : value;
          renderer.local.multiple = !!select_attrs.multiple;
          fn(renderer);
        });
        this.push(`${is_rich ? "<!>" : ""}</select>`);
      }
      /**
       * @param {Record<string, any>} attrs
       * @param {string | number | boolean | ((renderer: Renderer) => void)} body
       * @param {string | undefined} [css_hash]
       * @param {Record<string, boolean> | undefined} [classes]
       * @param {Record<string, string> | undefined} [styles]
       * @param {number | undefined} [flags]
       * @param {boolean | undefined} [is_rich]
       */
      option(attrs, body, css_hash, classes, styles, flags2, is_rich) {
        this.#out.push(`<option${attributes(attrs, css_hash, classes, styles, flags2)}`);
        const close = /* @__PURE__ */ __name((renderer, value, { head: head2, body: body2 }) => {
          if (has_own_property.call(attrs, "value")) {
            value = attrs.value;
          }
          var select_value = this.local.select_value;
          if (
            // Super edge-case, but theoretically someone could use arrays with non-multiple selects,
            // so we gotta check for the multiple attribute presence, too.
            this.local.multiple && is_array(select_value) ? select_value.includes(value) : value === select_value
          ) {
            renderer.#out.push(' selected=""');
          }
          renderer.#out.push(`>${body2}${is_rich ? "<!>" : ""}</option>`);
          if (head2) {
            renderer.head((child) => child.push(head2));
          }
        }, "close");
        if (typeof body === "function") {
          this.child((renderer) => {
            const r3 = new _Renderer(this.global, this);
            body(r3);
            if (this.global.mode === "async") {
              return r3.#collect_content_async().then((content) => {
                close(renderer, content.body.replaceAll("<!---->", ""), content);
              });
            } else {
              const content = r3.#collect_content();
              close(renderer, content.body.replaceAll("<!---->", ""), content);
            }
          });
        } else {
          close(this, body, { body: escape_html2(body) });
        }
      }
      /**
       * @param {(renderer: Renderer) => void} fn
       */
      title(fn) {
        const path = this.get_path();
        const close = /* @__PURE__ */ __name((head2) => {
          this.global.set_title(head2, path);
        }, "close");
        this.child((renderer) => {
          const r3 = new _Renderer(renderer.global, renderer);
          fn(r3);
          if (renderer.global.mode === "async") {
            return r3.#collect_content_async().then((content) => {
              close(content.head);
            });
          } else {
            const content = r3.#collect_content();
            close(content.head);
          }
        });
      }
      /**
       * @param {string | (() => Promise<string>)} content
       */
      push(content) {
        if (typeof content === "function") {
          this.child(async (renderer) => renderer.push(await content()));
        } else {
          this.#out.push(content);
        }
      }
      /**
       * @param {() => void} fn
       */
      on_destroy(fn) {
        (this.#on_destroy ??= []).push(fn);
      }
      /**
       * @returns {number[]}
       */
      get_path() {
        return this.#parent ? [...this.#parent.get_path(), this.#parent.#out.indexOf(this)] : [];
      }
      /**
       * @deprecated this is needed for legacy component bindings
       */
      copy() {
        const copy = new _Renderer(this.global, this.#parent);
        copy.type = this.type;
        copy.#out = this.#out.map((item) => item instanceof _Renderer ? item.copy() : item);
        copy.promise = this.promise;
        return copy;
      }
      /**
       * @param {Renderer} other
       * @deprecated this is needed for legacy component bindings
       */
      subsume(other) {
        if (this.global.mode !== other.global.mode) {
          throw new Error(
            "invariant: A renderer cannot switch modes. If you're seeing this, there's a compiler bug. File an issue!"
          );
        }
        this.local = other.local;
        this.#out = other.#out.map((item, i) => {
          const current2 = this.#out[i];
          if (current2 instanceof _Renderer && item instanceof _Renderer) {
            current2.subsume(item);
            return current2;
          }
          return item;
        });
        this.promise = other.promise;
        this.type = other.type;
      }
      get length() {
        return this.#out.length;
      }
      /**
       * Creates the hydration comment that marks the start of a failed boundary.
       * The error is JSON-serialized and embedded inside an HTML comment for the client
       * to parse during hydration. The JSON is escaped to prevent `-->` or `<!--` sequences
       * from breaking out of the comment (XSS). Uses unicode escapes which `JSON.parse()`
       * handles transparently.
       * @param {unknown} error
       * @returns {string}
       */
      static #serialize_failed_boundary(error5) {
        var json2 = JSON.stringify(error5);
        var escaped2 = json2.replace(/>/g, "\\u003e").replace(/</g, "\\u003c");
        return `<!--${HYDRATION_START_FAILED}${escaped2}-->`;
      }
      /**
       * Only available on the server and when compiling with the `server` option.
       * Takes a component and returns an object with `body` and `head` properties on it, which you can use to populate the HTML when server-rendering your app.
       * @template {Record<string, any>} Props
       * @param {Component<Props>} component
       * @param {{ props?: Omit<Props, '$$slots' | '$$events'>; context?: Map<any, any>; idPrefix?: string; csp?: Csp }} [options]
       * @returns {RenderOutput}
       */
      static render(component8, options2 = {}) {
        return (
          /** @type {RenderOutput} */
          /** @type {unknown} */
          new RenderResult(
            () => _Renderer.#render(component8, options2),
            () => init_render_context().then(
              () => with_render_context(() => _Renderer.#render_async(component8, options2))
            )
          )
        );
      }
      /**
       * Collect all of the `onDestroy` callbacks registered during rendering. In an async context, this is only safe to call
       * after awaiting `collect_async`.
       *
       * Child renderers are "porous" and don't affect execution order, but component body renderers
       * create ordering boundaries. Within a renderer, callbacks run in order until hitting a component boundary.
       * @returns {Iterable<() => void>}
       */
      *#collect_on_destroy() {
        for (const component8 of this.#traverse_components()) {
          yield* component8.#collect_ondestroy();
        }
      }
      /**
       * Performs a depth-first search of renderers, yielding the deepest components first, then additional components as we backtrack up the tree.
       * @returns {Iterable<Renderer>}
       */
      *#traverse_components() {
        for (const child of this.#out) {
          if (typeof child !== "string") {
            yield* child.#traverse_components();
          }
        }
        if (this.#is_component_body) {
          yield this;
        }
      }
      /**
       * @returns {Iterable<() => void>}
       */
      *#collect_ondestroy() {
        if (this.#on_destroy) {
          for (const fn of this.#on_destroy) {
            yield fn;
          }
        }
        for (const child of this.#out) {
          if (child instanceof _Renderer && !child.#is_component_body) {
            yield* child.#collect_ondestroy();
          }
        }
      }
      /**
       * Runs every `onDestroy` callback in this renderer tree. On a failed render,
       * cleanup errors are suppressed so they do not mask the render error.
       * @param {boolean} suppress_errors
       */
      #run_on_destroy(suppress_errors) {
        let first_error;
        let has_error = false;
        for (const cleanup of this.#collect_on_destroy()) {
          try {
            cleanup();
          } catch (error5) {
            if (!suppress_errors && !has_error) {
              first_error = error5;
              has_error = true;
            }
          }
        }
        if (has_error) throw first_error;
      }
      /**
       * @param {'sync' | 'async'} mode
       * @param {{ idPrefix?: string; csp?: Csp; transformError?: (error: unknown) => unknown }} options
       * @returns {Renderer}
       */
      static #create(mode, options2) {
        if (options2.idPrefix?.includes("--")) {
          invalid_id_prefix();
        }
        return new _Renderer(
          new SSRState(
            mode,
            options2.idPrefix ? options2.idPrefix + "-" : "",
            options2.csp,
            options2.transformError
          )
        );
      }
      /**
       * Render a component. Throws if any of the children are performing asynchronous work.
       *
       * @template {Record<string, any>} Props
       * @param {Component<Props>} component
       * @param {{ props?: Omit<Props, '$$slots' | '$$events'>; context?: Map<any, any>; idPrefix?: string }} options
       * @returns {AccumulatedContent}
       */
      static #render(component8, options2) {
        var previous_context = ssr_context;
        const renderer = _Renderer.#create("sync", options2);
        let result;
        let render_error;
        let failed = false;
        try {
          try {
            _Renderer.#open_render(renderer, component8, options2);
            result = _Renderer.#close_render(renderer.#collect_content(), renderer);
          } catch (error5) {
            render_error = error5;
            failed = true;
          }
          renderer.#run_on_destroy(failed);
          if (failed) throw render_error;
          return (
            /** @type {AccumulatedContent} */
            result
          );
        } finally {
          renderer.global.abort();
          set_ssr_context(previous_context);
        }
      }
      /**
       * Render a component.
       *
       * @template {Record<string, any>} Props
       * @param {Component<Props>} component
       * @param {{ props?: Omit<Props, '$$slots' | '$$events'>; context?: Map<any, any>; idPrefix?: string; csp?: Csp }} options
       * @returns {Promise<AccumulatedContent & { hashes: { script: Sha256Source[] } }>}
       */
      static async #render_async(component8, options2) {
        const previous_context = ssr_context;
        const renderer = _Renderer.#create("async", options2);
        let result;
        let render_error;
        let failed = false;
        try {
          try {
            _Renderer.#open_render(renderer, component8, options2);
            const content = await renderer.#collect_content_async();
            const hydratables = await renderer.#collect_hydratables();
            if (hydratables !== null) {
              content.head = hydratables + content.head;
            }
            result = _Renderer.#close_render(content, renderer);
          } catch (error5) {
            render_error = error5;
            failed = true;
            renderer.global.abort();
            await renderer.global.settle();
          }
          renderer.#run_on_destroy(failed);
          if (failed) throw render_error;
          return (
            /** @type {AccumulatedContent & { hashes: { script: Sha256Source[] } }} */
            result
          );
        } finally {
          set_ssr_context(previous_context);
          renderer.global.abort();
        }
      }
      /**
       * Collect all of the code from the `out` array and return it as a string, or a promise resolving to a string.
       * @param {AccumulatedContent} content
       * @returns {AccumulatedContent}
       */
      #collect_content(content = { head: "", body: "" }) {
        for (const item of this.#out) {
          if (typeof item === "string") {
            content[this.type] += item;
          } else if (item instanceof _Renderer) {
            item.#collect_content(content);
          }
        }
        return content;
      }
      /**
       * Collect all of the code from the `out` array and return it as a string.
       * @param {AccumulatedContent} content
       * @returns {Promise<AccumulatedContent>}
       */
      async #collect_content_async(content = { head: "", body: "" }) {
        await this.promise;
        for (const item of this.#out) {
          if (typeof item === "string") {
            content[this.type] += item;
          } else if (item instanceof _Renderer) {
            if (item.#boundary) {
              const boundary_content = { head: "", body: "" };
              try {
                await item.#collect_content_async(boundary_content);
                content.head += boundary_content.head;
                content.body += boundary_content.body;
              } catch (error5) {
                const { context: context22, failed, transformError } = item.#boundary;
                set_ssr_context(context22);
                let promise = transformError(error5);
                set_ssr_context(null);
                let transformed = await promise;
                set_ssr_context(context22);
                const failed_renderer = new _Renderer(item.global, item);
                failed_renderer.type = item.type;
                failed_renderer.#out.push(_Renderer.#serialize_failed_boundary(transformed));
                failed(failed_renderer, transformed, noop2);
                failed_renderer.#out.push(BLOCK_CLOSE);
                await failed_renderer.#collect_content_async(content);
              }
            } else {
              await item.#collect_content_async(content);
            }
          }
        }
        return content;
      }
      async #collect_hydratables() {
        const ctx = get_render_context().hydratable;
        for (const [_, key2] of ctx.unresolved_promises) {
          unresolved_hydratable(key2, ctx.lookup.get(key2)?.stack ?? "<missing stack trace>");
        }
        for (const comparison of ctx.comparisons) {
          await comparison;
        }
        return await this.#hydratable_block(ctx);
      }
      /**
       * @template {Record<string, any>} Props
       * @param {Renderer} renderer
       * @param {import('svelte').Component<Props>} component
       * @param {{ props?: Omit<Props, '$$slots' | '$$events'>; context?: Map<any, any>; idPrefix?: string; csp?: Csp; transformError?: (error: unknown) => unknown }} options
       * @returns {void}
       */
      static #open_render(renderer, component8, options2) {
        var previous_context = ssr_context;
        try {
          const context22 = { p: null, c: options2.context ?? null, r: renderer, i: false };
          set_ssr_context(context22);
          renderer.push(BLOCK_OPEN);
          component8(renderer, options2.props ?? {});
          renderer.push(BLOCK_CLOSE);
        } finally {
          set_ssr_context(previous_context);
        }
      }
      /**
       * @param {AccumulatedContent} content
       * @param {Renderer} renderer
       * @returns {AccumulatedContent & { hashes: { script: Sha256Source[] } }}
       */
      static #close_render(content, renderer) {
        let head2 = content.head + renderer.global.get_title();
        let body = content.body;
        for (const { hash: hash2, code } of renderer.global.css) {
          head2 += `<style id="${hash2}">${code}</style>`;
        }
        return {
          head: head2,
          body,
          hashes: {
            script: renderer.global.csp.script_hashes
          }
        };
      }
      /**
       * @param {HydratableContext} ctx
       */
      async #hydratable_block(ctx) {
        if (ctx.lookup.size === 0) {
          return null;
        }
        let entries = [];
        let has_promises = false;
        for (const [k, v] of ctx.lookup) {
          if (v.promises) {
            has_promises = true;
            for (const p of v.promises) await p;
          }
          entries.push(`[${uneval(k)},${v.serialized}]`);
        }
        let prelude = `const h = (window.__svelte ??= {}).h ??= new Map();`;
        if (has_promises) {
          prelude = `const r = (v) => Promise.resolve(v);
				${prelude}`;
        }
        const body = `
			{
				${prelude}

				for (const [k, v] of [
					${entries.join(",\n					")}
				]) {
					h.set(k, v);
				}
			}
		`;
        let csp_attr = "";
        if (this.global.csp.nonce) {
          csp_attr = ` nonce="${this.global.csp.nonce}"`;
        } else if (this.global.csp.hash) {
          const hash2 = await sha256(body);
          this.global.csp.script_hashes.push(`sha256-${hash2}`);
        }
        return `
		<script${csp_attr}>${body}<\/script>`;
      }
    };
    SSRState = class {
      static {
        __name(this, "SSRState");
      }
      /** @readonly @type {Csp & { script_hashes: Sha256Source[] }} */
      csp;
      /** @readonly @type {'sync' | 'async'} */
      mode;
      /** @readonly @type {() => string} */
      uid;
      /** @readonly @type {Set<{ hash: string; code: string }>} */
      css = /* @__PURE__ */ new Set();
      /** @type {Set<Promise<unknown>>} */
      #pending = /* @__PURE__ */ new Set();
      /** @type {AbortController | null} */
      #controller = null;
      #aborted = false;
      /**
       * `transformError` passed to `render`. Called when an error boundary catches an error.
       * Throws by default if unset in `render`.
       * @type {(error: unknown) => unknown}
       */
      transformError;
      /** @type {{ path: number[], value: string }} */
      #title = { path: [], value: "" };
      /**
       * @param {'sync' | 'async'} mode
       * @param {string} id_prefix
       * @param {Csp} csp
       * @param {((error: unknown) => unknown) | undefined} [transformError]
       */
      constructor(mode, id_prefix = "", csp = { hash: false }, transformError) {
        this.mode = mode;
        this.csp = { ...csp, script_hashes: [] };
        this.transformError = transformError ?? ((error5) => {
          throw error5;
        });
        let uid2 = 1;
        this.uid = () => `${id_prefix}s${uid2++}`;
      }
      /**
       * @template T
       * @param {Promise<T>} promise
       * @returns {Promise<T>}
       */
      track(promise) {
        this.#pending.add(promise);
        promise.then(
          () => this.#pending.delete(promise),
          () => this.#pending.delete(promise)
        );
        return promise;
      }
      async settle() {
        while (this.#pending.size > 0) {
          await Promise.allSettled([...this.#pending]);
        }
      }
      abort() {
        if (this.#aborted) return;
        this.#aborted = true;
        this.#controller?.abort(STALE_REACTION);
      }
      get_abort_signal() {
        const controller = this.#controller ??= new AbortController();
        if (this.#aborted) controller.abort(STALE_REACTION);
        return controller.signal;
      }
      get_title() {
        return this.#title.value;
      }
      /**
       * Performs a depth-first (lexicographic) comparison using the path. Rejects sets
       * from earlier than or equal to the current value.
       * @param {string} value
       * @param {number[]} path
       */
      set_title(value, path) {
        const current2 = this.#title.path;
        let i = 0;
        let l = Math.min(path.length, current2.length);
        while (i < l && path[i] === current2[i]) i += 1;
        if (path[i] === void 0) return;
        if (current2[i] === void 0 || path[i] > current2[i]) {
          this.#title.path = path;
          this.#title.value = value;
        }
      }
    };
    INVALID_ATTR_NAME_CHAR_REGEX = /[\s'">/=\u{FDD0}-\u{FDEF}\u{FFFE}\u{FFFF}\u{1FFFE}\u{1FFFF}\u{2FFFE}\u{2FFFF}\u{3FFFE}\u{3FFFF}\u{4FFFE}\u{4FFFF}\u{5FFFE}\u{5FFFF}\u{6FFFE}\u{6FFFF}\u{7FFFE}\u{7FFFF}\u{8FFFE}\u{8FFFF}\u{9FFFE}\u{9FFFF}\u{AFFFE}\u{AFFFF}\u{BFFFE}\u{BFFFF}\u{CFFFE}\u{CFFFF}\u{DFFFE}\u{DFFFF}\u{EFFFE}\u{EFFFF}\u{FFFFE}\u{FFFFF}\u{10FFFE}\u{10FFFF}]/u;
    __name(render, "render");
    __name(head, "head");
    __name(attributes, "attributes");
    __name(stringify3, "stringify");
    __name(attr_class, "attr_class");
    __name(ensure_array_like, "ensure_array_like");
    __name(once3, "once");
    __name(derived, "derived");
  }
});

// ../output/server/chunks/root.js
function equals(value) {
  return value === this.v;
}
function safe_not_equal(a, b) {
  return a != a ? b == b : a !== b || a !== null && typeof a === "object" || typeof a === "function";
}
function safe_equals(value) {
  return !safe_not_equal(value, this.v);
}
function effect_update_depth_exceeded() {
  {
    throw new Error(`https://svelte.dev/e/effect_update_depth_exceeded`);
  }
}
function hydration_failed() {
  {
    throw new Error(`https://svelte.dev/e/hydration_failed`);
  }
}
function state_descriptors_fixed() {
  {
    throw new Error(`https://svelte.dev/e/state_descriptors_fixed`);
  }
}
function state_prototype_fixed() {
  {
    throw new Error(`https://svelte.dev/e/state_prototype_fixed`);
  }
}
function state_unsafe_mutation() {
  {
    throw new Error(`https://svelte.dev/e/state_unsafe_mutation`);
  }
}
function svelte_boundary_reset_onerror() {
  {
    throw new Error(`https://svelte.dev/e/svelte_boundary_reset_onerror`);
  }
}
function set_component_context(context4) {
  component_context = context4;
}
function push2(props, runes = false, fn) {
  component_context = {
    p: component_context,
    i: false,
    c: null,
    e: null,
    s: props,
    x: null,
    r: (
      /** @type {Effect} */
      active_effect
    ),
    l: null
  };
}
function pop2(component8) {
  var context4 = (
    /** @type {ComponentContext} */
    component_context
  );
  var effects = context4.e;
  if (effects !== null) {
    context4.e = null;
    for (var fn of effects) {
      create_user_effect(fn);
    }
  }
  context4.i = true;
  component_context = context4.p;
  return mark_as_component(component8);
}
function mark_as_component(component8 = {}) {
  define_property(component8, COMPONENT_SYMBOL, { value: true });
  return component8;
}
function is_runes() {
  return true;
}
function run_micro_tasks() {
  var tasks = micro_tasks;
  micro_tasks = [];
  run_all(tasks);
}
function queue_micro_task(fn) {
  if (micro_tasks.length === 0 && !is_flushing_sync) {
    var tasks = micro_tasks;
    queueMicrotask(() => {
      if (tasks === micro_tasks) run_micro_tasks();
    });
  }
  micro_tasks.push(fn);
}
function flush_tasks() {
  while (micro_tasks.length > 0) {
    run_micro_tasks();
  }
}
function derived_inert() {
  {
    console.warn(`https://svelte.dev/e/derived_inert`);
  }
}
function hydration_mismatch(location) {
  {
    console.warn(`https://svelte.dev/e/hydration_mismatch`);
  }
}
function svelte_boundary_reset_noop() {
  {
    console.warn(`https://svelte.dev/e/svelte_boundary_reset_noop`);
  }
}
function set_hydrating(value) {
  hydrating = value;
}
function set_hydrate_node(node) {
  if (node === null) {
    hydration_mismatch();
    throw HYDRATION_ERROR;
  }
  return hydrate_node = node;
}
function hydrate_next() {
  return set_hydrate_node(/* @__PURE__ */ get_next_sibling(hydrate_node));
}
function next(count3 = 1) {
  if (hydrating) {
    var i = count3;
    var node = hydrate_node;
    while (i--) {
      node = /** @type {TemplateNode} */
      /* @__PURE__ */ get_next_sibling(node);
    }
    hydrate_node = node;
  }
}
function skip_nodes(remove = true) {
  var depth = 0;
  var node = hydrate_node;
  while (true) {
    if (node.nodeType === COMMENT_NODE) {
      var data = (
        /** @type {Comment} */
        node.data
      );
      if (data === HYDRATION_END) {
        if (depth === 0) return node;
        depth -= 1;
      } else if (data === HYDRATION_START || data === HYDRATION_START_ELSE || // "[1", "[2", etc. for if blocks
      data[0] === "[" && !isNaN(Number(data.slice(1)))) {
        depth += 1;
      }
    }
    var next2 = (
      /** @type {TemplateNode} */
      /* @__PURE__ */ get_next_sibling(node)
    );
    if (remove) node.remove();
    node = next2;
  }
}
function proxy(value) {
  if (typeof value !== "object" || value === null || STATE_SYMBOL in value || COMPONENT_SYMBOL in value) {
    return value;
  }
  const prototype = get_prototype_of(value);
  if (prototype !== object_prototype && prototype !== array_prototype) {
    return value;
  }
  var sources = /* @__PURE__ */ new Map();
  var is_proxied_array = is_array(value);
  var version2 = /* @__PURE__ */ state(0);
  var parent_version = update_version;
  var with_parent = /* @__PURE__ */ __name((fn) => {
    if (update_version === parent_version) {
      return fn();
    }
    var reaction = active_reaction;
    var version22 = update_version;
    set_active_reaction(null);
    set_update_version(parent_version);
    var result = fn();
    set_active_reaction(reaction);
    set_update_version(version22);
    return result;
  }, "with_parent");
  if (is_proxied_array) {
    sources.set("length", /* @__PURE__ */ state(
      /** @type {any[]} */
      value.length
    ));
  }
  return new Proxy(
    /** @type {any} */
    value,
    {
      defineProperty(_, prop, descriptor) {
        if (!("value" in descriptor) || descriptor.configurable === false || descriptor.enumerable === false || descriptor.writable === false) {
          state_descriptors_fixed();
        }
        var s3 = sources.get(prop);
        if (s3 === void 0) {
          with_parent(() => {
            var s22 = /* @__PURE__ */ state(descriptor.value);
            sources.set(prop, s22);
            return s22;
          });
        } else {
          set(s3, descriptor.value, true);
        }
        return true;
      },
      deleteProperty(target, prop) {
        var s3 = sources.get(prop);
        if (s3 === void 0) {
          if (prop in target) {
            const s22 = with_parent(() => /* @__PURE__ */ state(UNINITIALIZED));
            sources.set(prop, s22);
            increment(version2);
          }
        } else {
          set(s3, UNINITIALIZED);
          increment(version2);
        }
        return true;
      },
      get(target, prop, receiver) {
        if (prop === STATE_SYMBOL) {
          return value;
        }
        var s3 = sources.get(prop);
        var exists = prop in target;
        if (s3 === void 0 && (!exists || get_descriptor(target, prop)?.writable)) {
          s3 = with_parent(() => {
            var p = proxy(exists ? target[prop] : UNINITIALIZED);
            var s22 = /* @__PURE__ */ state(p);
            return s22;
          });
          sources.set(prop, s3);
        }
        if (s3 !== void 0) {
          var v = get(s3);
          return v === UNINITIALIZED ? void 0 : v;
        }
        return Reflect.get(target, prop, receiver);
      },
      getOwnPropertyDescriptor(target, prop) {
        this.has?.(target, prop);
        var descriptor = Reflect.getOwnPropertyDescriptor(target, prop);
        var s3 = sources.get(prop);
        if (s3 !== void 0) {
          var value2 = get(s3);
          if (value2 === UNINITIALIZED) {
            return void 0;
          }
          if (descriptor && "value" in descriptor) {
            descriptor.value = value2;
          } else {
            return {
              enumerable: true,
              configurable: true,
              value: value2,
              writable: true
            };
          }
        }
        return descriptor;
      },
      has(target, prop) {
        if (prop === STATE_SYMBOL) {
          return true;
        }
        var s3 = sources.get(prop);
        var has = s3 !== void 0 && s3.v !== UNINITIALIZED || Reflect.has(target, prop);
        if (s3 !== void 0 || active_effect !== null && (!has || get_descriptor(target, prop)?.writable)) {
          if (s3 === void 0) {
            s3 = with_parent(() => {
              var p = has ? proxy(target[prop]) : UNINITIALIZED;
              var s22 = /* @__PURE__ */ state(p);
              return s22;
            });
            sources.set(prop, s3);
          }
          var value2 = get(s3);
          if (value2 === UNINITIALIZED) {
            return false;
          }
        }
        return has;
      },
      set(target, prop, value2, receiver) {
        var s3 = sources.get(prop);
        var has = prop in target;
        if (is_proxied_array && prop === "length") {
          for (var i = value2; i < /** @type {Source<number>} */
          s3.v; i += 1) {
            var other_s = sources.get(i + "");
            if (other_s !== void 0) {
              set(other_s, UNINITIALIZED);
            } else if (i in target) {
              other_s = with_parent(() => /* @__PURE__ */ state(UNINITIALIZED));
              sources.set(i + "", other_s);
            }
          }
        }
        if (s3 === void 0) {
          if (!has || get_descriptor(target, prop)?.writable) {
            s3 = with_parent(() => /* @__PURE__ */ state(void 0));
            set(s3, proxy(value2));
            sources.set(prop, s3);
          }
        } else {
          has = s3.v !== UNINITIALIZED;
          var p = with_parent(() => proxy(value2));
          set(s3, p);
        }
        var descriptor = Reflect.getOwnPropertyDescriptor(target, prop);
        if (descriptor?.set) {
          descriptor.set.call(receiver, value2);
        }
        if (!has) {
          if (is_proxied_array && typeof prop === "string") {
            var ls = (
              /** @type {Source<number>} */
              sources.get("length")
            );
            var n2 = Number(prop);
            if (Number.isInteger(n2) && n2 >= ls.v) {
              set(ls, n2 + 1);
            }
          }
          increment(version2);
        }
        return true;
      },
      ownKeys(target) {
        get(version2);
        var own_keys = Reflect.ownKeys(target).filter((key22) => {
          var source3 = sources.get(key22);
          return source3 === void 0 || source3.v !== UNINITIALIZED;
        });
        for (var [key2, source2] of sources) {
          if (source2.v !== UNINITIALIZED && !(key2 in target)) {
            own_keys.push(key2);
          }
        }
        return own_keys;
      },
      setPrototypeOf() {
        state_prototype_fixed();
      }
    }
  );
}
function init_operations2() {
  if ($window !== void 0) {
    return;
  }
  $window = window;
  var element_prototype = Element.prototype;
  var node_prototype = Node.prototype;
  var text_prototype = Text.prototype;
  first_child_getter = get_descriptor(node_prototype, "firstChild").get;
  next_sibling_getter = get_descriptor(node_prototype, "nextSibling").get;
  if (is_extensible(element_prototype)) {
    element_prototype[CLASS_CACHE] = void 0;
    element_prototype[ATTRIBUTES_CACHE] = null;
    element_prototype[STYLE_CACHE] = void 0;
    element_prototype.__e = void 0;
  }
  if (is_extensible(text_prototype)) {
    text_prototype[TEXT_CACHE] = void 0;
  }
}
function create_text(value = "") {
  return document.createTextNode(value);
}
// @__NO_SIDE_EFFECTS__
function get_first_child(node) {
  return (
    /** @type {TemplateNode | null} */
    first_child_getter.call(node)
  );
}
// @__NO_SIDE_EFFECTS__
function get_next_sibling(node) {
  return (
    /** @type {TemplateNode | null} */
    next_sibling_getter.call(node)
  );
}
function clear_text_content(node) {
  node.textContent = "";
}
function handle_error(error5) {
  var effect = active_effect;
  if (effect === null) {
    active_reaction.f |= ERROR_VALUE;
    return error5;
  }
  if ((effect.f & REACTION_RAN) === 0 && (effect.f & EFFECT) === 0) {
    throw error5;
  }
  invoke_error_boundary(error5, effect);
}
function invoke_error_boundary(error5, effect) {
  if (effect !== null && (effect.f & DESTROYED) !== 0) {
    return;
  }
  while (effect !== null) {
    if ((effect.f & BOUNDARY_EFFECT) !== 0 && (effect.f & (DESTROYED | DESTROYING)) === 0) {
      if ((effect.f & REACTION_RAN) === 0) {
        throw error5;
      }
      try {
        effect.b.error(error5);
        return;
      } catch (e3) {
        error5 = e3;
      }
    }
    effect = effect.parent;
  }
  throw error5;
}
function set_signal_status(signal, status) {
  signal.f = signal.f & STATUS_MASK | status;
}
function update_derived_status(derived2) {
  if ((derived2.f & CONNECTED) !== 0 || derived2.deps === null) {
    set_signal_status(derived2, CLEAN);
  } else {
    set_signal_status(derived2, MAYBE_DIRTY);
  }
}
function defer_effect(effect, dirty_effects, maybe_dirty_effects) {
  if ((effect.f & DIRTY) !== 0) {
    dirty_effects.add(effect);
  } else if ((effect.f & MAYBE_DIRTY) !== 0) {
    maybe_dirty_effects.add(effect);
  }
  set_signal_status(effect, CLEAN);
}
function without_reactive_context(fn) {
  var previous_reaction = active_reaction;
  var previous_effect = active_effect;
  set_active_reaction(null);
  set_active_effect(null);
  try {
    return fn();
  } finally {
    set_active_reaction(previous_reaction);
    set_active_effect(previous_effect);
  }
}
function destroy_derived_effects(derived2) {
  var effects = derived2.effects;
  if (effects !== null) {
    derived2.effects = null;
    for (var i = 0; i < effects.length; i += 1) {
      destroy_effect(
        /** @type {Effect} */
        effects[i]
      );
    }
  }
}
function execute_derived(derived2) {
  var value;
  var prev_active_effect = active_effect;
  var parent = derived2.parent;
  if (!is_destroying_effect && parent !== null && derived2.v !== UNINITIALIZED && // if it was never evaluated before, it's guaranteed to fail downstream, so we try to execute instead
  (parent.f & (DESTROYED | INERT)) !== 0) {
    derived_inert();
    return derived2.v;
  }
  set_active_effect(parent);
  {
    try {
      destroy_derived_effects(derived2);
      value = update_reaction(derived2);
    } finally {
      set_active_effect(prev_active_effect);
    }
  }
  return value;
}
function update_derived(derived2) {
  var value = execute_derived(derived2);
  if (!derived2.equals(value)) {
    derived2.wv = increment_write_version();
    if (!current_batch?.is_fork || derived2.deps === null) {
      if (current_batch !== null) {
        current_batch.capture(derived2, value, true);
        previous_batch?.capture(derived2, value, true);
      } else {
        derived2.v = value;
      }
      if (derived2.deps === null) {
        set_signal_status(derived2, CLEAN);
        return;
      }
    }
  }
  if (is_destroying_effect) {
    return;
  }
  if (batch_values !== null) {
    if (effect_tracking() || current_batch?.is_fork) {
      batch_values.set(derived2, value);
    }
  } else {
    update_derived_status(derived2);
  }
}
function freeze_derived_effects(derived2) {
  if (derived2.effects === null) return;
  for (const e3 of derived2.effects) {
    if (e3.teardown || e3.ac) {
      e3.teardown?.();
      if (e3.ac !== null) {
        without_reactive_context(() => {
          e3.ac.abort(STALE_REACTION);
          e3.ac = null;
        });
      }
      if (e3.fn !== null) e3.teardown = noop2;
      remove_reactions(e3, 0);
      destroy_effect_children(e3);
    }
  }
}
function unfreeze_derived_effects(derived2) {
  if (derived2.effects === null) return;
  for (const e3 of derived2.effects) {
    if (e3.teardown && e3.fn !== null) {
      update_effect(e3);
    }
  }
}
function flushSync(fn) {
  var was_flushing_sync = is_flushing_sync;
  is_flushing_sync = true;
  try {
    var result;
    if (fn) ;
    while (true) {
      flush_tasks();
      if (current_batch === null) {
        return (
          /** @type {T} */
          result
        );
      }
      current_batch.flush();
    }
  } finally {
    is_flushing_sync = was_flushing_sync;
  }
}
function infinite_loop_guard() {
  try {
    effect_update_depth_exceeded();
  } catch (error5) {
    invoke_error_boundary(error5, last_scheduled_effect);
  }
}
function flush_queued_effects(effects) {
  var length = effects.length;
  if (length === 0) return;
  var i = 0;
  while (i < length) {
    var effect = effects[i++];
    if ((effect.f & (DESTROYED | INERT)) === 0 && is_dirty(effect)) {
      eager_block_effects = /* @__PURE__ */ new Set();
      update_effect(effect);
      if (effect.deps === null && effect.first === null && effect.nodes === null && effect.teardown === null && effect.ac === null) {
        unlink_effect(effect);
      }
      if (eager_block_effects?.size > 0) {
        old_values.clear();
        for (const e3 of eager_block_effects) {
          if ((e3.f & (DESTROYED | INERT)) !== 0) continue;
          const ordered_effects = [e3];
          let ancestor = e3.parent;
          while (ancestor !== null) {
            if (eager_block_effects.has(ancestor)) {
              eager_block_effects.delete(ancestor);
              ordered_effects.push(ancestor);
            }
            ancestor = ancestor.parent;
          }
          for (let j = ordered_effects.length - 1; j >= 0; j--) {
            const e22 = ordered_effects[j];
            if ((e22.f & (DESTROYED | INERT)) !== 0) continue;
            update_effect(e22);
          }
        }
        eager_block_effects.clear();
      }
    }
  }
  eager_block_effects = null;
}
function mark_effects(value, sources, marked, checked) {
  if (marked.has(value)) return;
  marked.add(value);
  if (value.reactions !== null) {
    for (const reaction of value.reactions) {
      const flags2 = reaction.f;
      if ((flags2 & DERIVED) !== 0) {
        mark_effects(
          /** @type {Derived} */
          reaction,
          sources,
          marked,
          checked
        );
      } else if ((flags2 & (ASYNC | BLOCK_EFFECT)) !== 0 && (flags2 & DIRTY) === 0 && depends_on(reaction, sources, checked)) {
        set_signal_status(reaction, DIRTY);
        schedule_effect(
          /** @type {Effect} */
          reaction
        );
      }
    }
  }
}
function depends_on(reaction, sources, checked) {
  const depends = checked.get(reaction);
  if (depends !== void 0) return depends;
  if (reaction.deps !== null) {
    for (const dep of reaction.deps) {
      if (includes.call(sources, dep)) {
        return true;
      }
      if ((dep.f & DERIVED) !== 0 && depends_on(
        /** @type {Derived} */
        dep,
        sources,
        checked
      )) {
        checked.set(
          /** @type {Derived} */
          dep,
          true
        );
        return true;
      }
    }
  }
  checked.set(reaction, false);
  return false;
}
function schedule_effect(effect) {
  current_batch.schedule(effect);
}
function reset_branch(effect, tracked) {
  if ((effect.f & BRANCH_EFFECT) !== 0 && (effect.f & CLEAN) !== 0) {
    return;
  }
  if ((effect.f & DIRTY) !== 0) {
    tracked.d.push(effect);
  } else if ((effect.f & MAYBE_DIRTY) !== 0) {
    tracked.m.push(effect);
  }
  set_signal_status(effect, CLEAN);
  var e3 = effect.first;
  while (e3 !== null) {
    reset_branch(e3, tracked);
    e3 = e3.next;
  }
}
function reset_all(effect) {
  set_signal_status(effect, CLEAN);
  var e3 = effect.first;
  while (e3 !== null) {
    reset_all(e3);
    e3 = e3.next;
  }
}
function source(v, stack) {
  var signal = {
    f: 0,
    // TODO ideally we could skip this altogether, but it causes type errors
    v,
    reactions: null,
    equals,
    rv: 0,
    wv: 0
  };
  return signal;
}
// @__NO_SIDE_EFFECTS__
function state(v, stack) {
  const s3 = source(v);
  push_reaction_value(s3);
  return s3;
}
// @__NO_SIDE_EFFECTS__
function mutable_source(initial_value, immutable2 = false, trackable = true) {
  const s3 = source(initial_value);
  if (!immutable2) {
    s3.equals = safe_equals;
  }
  return s3;
}
function set(source2, value, should_proxy = false) {
  if (active_reaction !== null && // since we are untracking the function inside `$inspect.with` we need to add this check
  // to ensure we error if state is set inside an inspect effect
  (!untracking || (active_reaction.f & EAGER_EFFECT) !== 0) && is_runes() && (active_reaction.f & (DERIVED | BLOCK_EFFECT | ASYNC | EAGER_EFFECT)) !== 0 && (current_sources === null || !current_sources.has(source2))) {
    state_unsafe_mutation();
  }
  let new_value = should_proxy ? proxy(value) : value;
  return internal_set(source2, new_value, legacy_updates);
}
function internal_set(source2, value, updated_during_traversal = null) {
  if (!source2.equals(value)) {
    if (is_destroying_effect) {
      old_values.set(source2, value);
    } else if (!old_values.has(source2)) {
      old_values.set(source2, source2.v);
    }
    var batch = Batch.ensure();
    batch.capture(source2, value);
    if ((source2.f & DERIVED) !== 0) {
      const derived2 = (
        /** @type {Derived} */
        source2
      );
      if ((source2.f & DIRTY) !== 0) {
        execute_derived(derived2);
      }
      if (batch_values === null) {
        update_derived_status(derived2);
      }
    }
    source2.wv = increment_write_version();
    seen = null;
    count_deps = 0;
    mark_reactions(source2, DIRTY, updated_during_traversal);
    seen = null;
    if (active_effect !== null && (active_effect.f & CLEAN) !== 0 && (active_effect.f & (BRANCH_EFFECT | ROOT_EFFECT)) === 0) {
      if (untracked_writes === null) {
        set_untracked_writes([source2]);
      } else {
        untracked_writes.push(source2);
      }
    }
    if (!batch.is_fork && eager_effects.size > 0 && !eager_effects_deferred) {
      flush_eager_effects();
    }
  }
  return value;
}
function flush_eager_effects() {
  eager_effects_deferred = false;
  for (const effect of eager_effects) {
    if ((effect.f & CLEAN) !== 0) {
      set_signal_status(effect, MAYBE_DIRTY);
    }
    let dirty;
    try {
      dirty = is_dirty(effect);
    } catch {
      dirty = true;
    }
    if (dirty) {
      update_effect(effect);
    }
  }
  eager_effects.clear();
}
function increment(source2) {
  set(source2, source2.v + 1);
}
function mark_reactions(signal, status, updated_during_traversal) {
  var reactions = signal.reactions;
  if (reactions === null) return;
  var length = reactions.length;
  count_deps += length;
  if (count_deps > 1e5 && seen === null) seen = /* @__PURE__ */ new Set();
  if (seen !== null) {
    if (seen.has(signal)) return;
    seen.add(signal);
  }
  for (var i = 0; i < length; i++) {
    var reaction = reactions[i];
    var flags2 = reaction.f;
    var not_dirty = (flags2 & DIRTY) === 0;
    if (not_dirty) {
      set_signal_status(reaction, status);
    }
    if ((flags2 & EAGER_EFFECT) !== 0) {
      eager_effects.add(
        /** @type {Effect} */
        reaction
      );
    } else if ((flags2 & DERIVED) !== 0) {
      var derived2 = (
        /** @type {Derived} */
        reaction
      );
      batch_values?.delete(derived2);
      mark_reactions(derived2, MAYBE_DIRTY, updated_during_traversal);
    } else if (not_dirty) {
      var effect = (
        /** @type {Effect} */
        reaction
      );
      if ((flags2 & BLOCK_EFFECT) !== 0 && eager_block_effects !== null) {
        eager_block_effects.add(effect);
      }
      if (updated_during_traversal !== null) {
        updated_during_traversal.push(effect);
      } else {
        schedule_effect(effect);
      }
    }
  }
}
function set_is_destroying_effect(value) {
  is_destroying_effect = value;
}
function set_active_reaction(reaction) {
  active_reaction = reaction;
}
function set_active_effect(effect) {
  active_effect = effect;
}
function push_reaction_value(value) {
  if (active_reaction !== null && ((active_reaction.f & REACTION_IS_UPDATING) !== 0 || (active_reaction.f & DERIVED) !== 0)) {
    (current_sources ??= /* @__PURE__ */ new Set()).add(value);
  }
}
function set_untracked_writes(value) {
  untracked_writes = value;
}
function set_update_version(value) {
  update_version = value;
}
function increment_write_version() {
  return ++write_version;
}
function is_dirty(reaction) {
  var flags2 = reaction.f;
  if ((flags2 & DIRTY) !== 0) {
    return true;
  }
  if ((flags2 & MAYBE_DIRTY) !== 0) {
    var dependencies = (
      /** @type {Value[]} */
      reaction.deps
    );
    var length = dependencies.length;
    for (var i = 0; i < length; i++) {
      var dependency = dependencies[i];
      if (is_dirty(
        /** @type {Derived} */
        dependency
      )) {
        update_derived(
          /** @type {Derived} */
          dependency
        );
      }
      if (dependency.wv > reaction.wv) {
        return true;
      }
    }
    if ((flags2 & CONNECTED) !== 0 && // During time traveling we don't want to reset the status so that
    // traversal of the graph in the other batches still happens
    batch_values === null) {
      set_signal_status(reaction, CLEAN);
    }
  }
  return false;
}
function schedule_possible_effect_self_invalidation(signal, effect, root2 = true) {
  var reactions = signal.reactions;
  if (reactions === null) return;
  if (current_sources !== null && current_sources.has(signal)) {
    return;
  }
  for (var i = 0; i < reactions.length; i++) {
    var reaction = reactions[i];
    if ((reaction.f & DERIVED) !== 0) {
      schedule_possible_effect_self_invalidation(
        /** @type {Derived} */
        reaction,
        effect,
        false
      );
    } else if (effect === reaction) {
      if (root2) {
        set_signal_status(reaction, DIRTY);
      } else if ((reaction.f & CLEAN) !== 0) {
        set_signal_status(reaction, MAYBE_DIRTY);
      }
      schedule_effect(
        /** @type {Effect} */
        reaction
      );
    }
  }
}
function update_reaction(reaction) {
  var previous_deps = new_deps;
  var previous_skipped_deps = skipped_deps;
  var previous_untracked_writes = untracked_writes;
  var previous_reaction = active_reaction;
  var previous_sources = current_sources;
  var previous_component_context = component_context;
  var previous_untracking = untracking;
  var previous_update_version = update_version;
  var flags2 = reaction.f;
  new_deps = /** @type {null | Value[]} */
  null;
  skipped_deps = 0;
  untracked_writes = null;
  active_reaction = (flags2 & (BRANCH_EFFECT | ROOT_EFFECT)) === 0 ? reaction : null;
  current_sources = null;
  set_component_context(reaction.ctx);
  untracking = false;
  update_version = ++read_version;
  if (reaction.ac !== null) {
    without_reactive_context(() => {
      reaction.ac.abort(STALE_REACTION);
    });
    reaction.ac = null;
  }
  try {
    reaction.f |= REACTION_IS_UPDATING;
    var fn = (
      /** @type {Function} */
      reaction.fn
    );
    var result = fn();
    reaction.f |= REACTION_RAN;
    var deps = update_dependencies(reaction);
    if (is_runes() && untracked_writes !== null && !untracking && deps !== null && (reaction.f & (DERIVED | MAYBE_DIRTY | DIRTY)) === 0) {
      for (var i = 0; i < /** @type {Source[]} */
      untracked_writes.length; i++) {
        schedule_possible_effect_self_invalidation(
          untracked_writes[i],
          /** @type {Effect} */
          reaction
        );
      }
    }
    if (previous_reaction !== null && previous_reaction !== reaction) {
      read_version++;
      if (previous_reaction.deps !== null) {
        for (let i2 = 0; i2 < previous_skipped_deps; i2 += 1) {
          previous_reaction.deps[i2].rv = read_version;
        }
      }
      if (previous_deps !== null) {
        for (const dep of previous_deps) {
          dep.rv = read_version;
        }
      }
      if (untracked_writes !== null) {
        if (previous_untracked_writes === null) {
          previous_untracked_writes = untracked_writes;
        } else {
          previous_untracked_writes.push(.../** @type {Source[]} */
          untracked_writes);
        }
      }
    }
    if ((reaction.f & ERROR_VALUE) !== 0) {
      reaction.f ^= ERROR_VALUE;
    }
    return result;
  } catch (error5) {
    update_dependencies(reaction);
    return handle_error(error5);
  } finally {
    reaction.f ^= REACTION_IS_UPDATING;
    new_deps = previous_deps;
    skipped_deps = previous_skipped_deps;
    untracked_writes = previous_untracked_writes;
    active_reaction = previous_reaction;
    current_sources = previous_sources;
    set_component_context(previous_component_context);
    untracking = previous_untracking;
    update_version = previous_update_version;
  }
}
function update_dependencies(reaction) {
  var deps = reaction.deps;
  var is_fork = current_batch?.is_fork;
  if (new_deps !== null) {
    var i;
    if (!is_fork) {
      remove_reactions(reaction, skipped_deps);
    }
    if (deps !== null && skipped_deps > 0) {
      deps.length = skipped_deps + new_deps.length;
      for (i = 0; i < new_deps.length; i++) {
        deps[skipped_deps + i] = new_deps[i];
      }
    } else {
      reaction.deps = deps = new_deps;
    }
    if (effect_tracking() && (reaction.f & CONNECTED) !== 0) {
      for (i = skipped_deps; i < deps.length; i++) {
        (deps[i].reactions ??= []).push(reaction);
      }
    }
  } else if (!is_fork && deps !== null && skipped_deps < deps.length) {
    remove_reactions(reaction, skipped_deps);
    deps.length = skipped_deps;
  }
  return deps;
}
function remove_reaction(signal, dependency) {
  let reactions = dependency.reactions;
  if (reactions !== null) {
    var index9 = index_of.call(reactions, signal);
    if (index9 !== -1) {
      var new_length = reactions.length - 1;
      if (new_length === 0) {
        reactions = dependency.reactions = null;
      } else {
        reactions[index9] = reactions[new_length];
        reactions.pop();
      }
    }
  }
  if (reactions === null && (dependency.f & DERIVED) !== 0 && // Destroying a child effect while updating a parent effect can cause a dependency to appear
  // to be unused, when in fact it is used by the currently-updating parent. Checking `new_deps`
  // allows us to skip the expensive work of disconnecting and immediately reconnecting it
  (new_deps === null || !includes.call(new_deps, dependency))) {
    var derived2 = (
      /** @type {Derived} */
      dependency
    );
    if ((derived2.f & CONNECTED) !== 0) {
      derived2.f ^= CONNECTED;
    }
    if (derived2.v !== UNINITIALIZED) {
      update_derived_status(derived2);
    }
    if (derived2.ac !== null) {
      without_reactive_context(() => {
        derived2.ac.abort(STALE_REACTION);
        derived2.ac = null;
        set_signal_status(derived2, DIRTY);
      });
    }
    freeze_derived_effects(derived2);
    remove_reactions(derived2, 0);
  }
}
function remove_reactions(signal, start_index) {
  var dependencies = signal.deps;
  if (dependencies === null) return;
  for (var i = start_index; i < dependencies.length; i++) {
    remove_reaction(signal, dependencies[i]);
  }
}
function update_effect(effect) {
  var flags2 = effect.f;
  if ((flags2 & DESTROYED) !== 0) {
    return;
  }
  set_signal_status(effect, CLEAN);
  var previous_effect = active_effect;
  var was_updating_effect = is_updating_effect;
  active_effect = effect;
  is_updating_effect = (flags2 & (BRANCH_EFFECT | ROOT_EFFECT)) === 0;
  try {
    if ((flags2 & (BLOCK_EFFECT | MANAGED_EFFECT)) !== 0) {
      destroy_block_effect_children(effect);
    } else {
      destroy_effect_children(effect);
    }
    execute_effect_teardown(effect);
    var teardown = update_reaction(effect);
    effect.teardown = typeof teardown === "function" ? teardown : null;
    effect.wv = write_version;
    var dep;
    if (DEV && tracing_mode_flag && (effect.f & DIRTY) !== 0 && effect.deps !== null) ;
  } finally {
    is_updating_effect = was_updating_effect;
    active_effect = previous_effect;
  }
}
function get(signal) {
  var flags2 = signal.f;
  var is_derived = (flags2 & DERIVED) !== 0;
  if (active_reaction !== null && !untracking) {
    var destroyed = active_effect !== null && (active_effect.f & DESTROYED) !== 0;
    if (!destroyed && (current_sources === null || !current_sources.has(signal))) {
      var deps = active_reaction.deps;
      if ((active_reaction.f & REACTION_IS_UPDATING) !== 0) {
        if (signal.rv < read_version) {
          signal.rv = read_version;
          if (new_deps === null && deps !== null && deps[skipped_deps] === signal) {
            skipped_deps++;
          } else if (new_deps === null) {
            new_deps = [signal];
          } else {
            new_deps.push(signal);
          }
        }
      } else {
        active_reaction.deps ??= [];
        if (!includes.call(active_reaction.deps, signal)) {
          active_reaction.deps.push(signal);
        }
        var reactions = signal.reactions;
        if (reactions === null) {
          signal.reactions = [active_reaction];
        } else if (!includes.call(reactions, active_reaction)) {
          reactions.push(active_reaction);
        }
      }
    }
  }
  if (is_destroying_effect && old_values.has(signal)) {
    return old_values.get(signal);
  }
  if (is_derived) {
    var derived2 = (
      /** @type {Derived} */
      signal
    );
    if (is_destroying_effect) {
      var value = derived2.v;
      if ((derived2.f & CLEAN) === 0 && derived2.reactions !== null || depends_on_old_values(derived2)) {
        value = execute_derived(derived2);
      }
      old_values.set(derived2, value);
      return value;
    }
    var should_connect = (derived2.f & CONNECTED) === 0 && !untracking && active_reaction !== null && (is_updating_effect || (active_reaction.f & CONNECTED) !== 0);
    var is_new = (derived2.f & REACTION_RAN) === 0;
    if (is_dirty(derived2)) {
      if (should_connect) {
        derived2.f |= CONNECTED;
      }
      update_derived(derived2);
    }
    if (should_connect && !is_new) {
      unfreeze_derived_effects(derived2);
      reconnect(derived2);
    }
  }
  if (batch_values?.has(signal)) {
    return batch_values.get(signal);
  }
  if ((signal.f & ERROR_VALUE) !== 0) {
    throw signal.v;
  }
  return signal.v;
}
function reconnect(derived2) {
  derived2.f |= CONNECTED;
  if (derived2.deps === null) return;
  for (const dep of derived2.deps) {
    (dep.reactions ??= []).push(derived2);
    if ((dep.f & DERIVED) !== 0 && (dep.f & CONNECTED) === 0) {
      unfreeze_derived_effects(
        /** @type {Derived} */
        dep
      );
      reconnect(
        /** @type {Derived} */
        dep
      );
    }
  }
}
function depends_on_old_values(derived2) {
  if (derived2.v === UNINITIALIZED) return true;
  if (derived2.deps === null) return false;
  for (const dep of derived2.deps) {
    if (old_values.has(dep)) {
      return true;
    }
    if ((dep.f & DERIVED) !== 0 && depends_on_old_values(
      /** @type {Derived} */
      dep
    )) {
      return true;
    }
  }
  return false;
}
function untrack(fn) {
  var previous_untracking = untracking;
  try {
    untracking = true;
    return fn();
  } finally {
    untracking = previous_untracking;
  }
}
function push_effect(effect, parent_effect) {
  var parent_last = parent_effect.last;
  if (parent_last === null) {
    parent_effect.last = parent_effect.first = effect;
  } else {
    parent_last.next = effect;
    effect.prev = parent_last;
    parent_effect.last = effect;
  }
}
function create_effect(type, fn) {
  var parent = active_effect;
  if (parent !== null && (parent.f & INERT) !== 0) {
    type |= INERT;
  }
  var effect = {
    ctx: component_context,
    deps: null,
    nodes: null,
    f: type | DIRTY | CONNECTED,
    first: null,
    fn,
    last: null,
    next: null,
    parent,
    b: parent && parent.b,
    prev: null,
    teardown: null,
    wv: 0,
    ac: null
  };
  current_batch?.register_created_effect(effect);
  var e3 = effect;
  if ((type & EFFECT) !== 0) {
    if (collected_effects !== null) {
      collected_effects.push(effect);
    } else {
      Batch.ensure().schedule(effect);
    }
  } else if (fn !== null) {
    try {
      update_effect(effect);
    } catch (e22) {
      destroy_effect(effect);
      throw e22;
    }
    if (e3.deps === null && e3.teardown === null && e3.nodes === null && e3.first === e3.last && // either `null`, or a singular child
    (e3.f & EFFECT_PRESERVED) === 0) {
      e3 = e3.first;
      if ((type & BLOCK_EFFECT) !== 0 && (type & EFFECT_TRANSPARENT) !== 0 && e3 !== null) {
        e3.f |= EFFECT_TRANSPARENT;
      }
    }
  }
  if (e3 !== null) {
    e3.parent = parent;
    if (parent !== null) {
      push_effect(e3, parent);
    }
    if (active_reaction !== null && (active_reaction.f & DERIVED) !== 0 && (type & ROOT_EFFECT) === 0) {
      var derived2 = (
        /** @type {Derived} */
        active_reaction
      );
      (derived2.effects ??= []).push(e3);
    }
  }
  return effect;
}
function effect_tracking() {
  return active_reaction !== null && !untracking;
}
function create_user_effect(fn) {
  return create_effect(EFFECT | USER_EFFECT, fn);
}
function component_root(fn) {
  Batch.ensure();
  const effect = create_effect(ROOT_EFFECT | EFFECT_PRESERVED, fn);
  return (options2 = {}) => {
    return new Promise((fulfil) => {
      if (options2.outro) {
        pause_effect(effect, () => {
          destroy_effect(effect);
          fulfil(void 0);
        });
      } else {
        destroy_effect(effect);
        fulfil(void 0);
      }
    });
  };
}
function render_effect(fn, flags2 = 0) {
  return create_effect(RENDER_EFFECT | flags2, fn);
}
function block(fn, flags2 = 0) {
  var effect = create_effect(BLOCK_EFFECT | flags2, fn);
  return effect;
}
function branch(fn) {
  return create_effect(BRANCH_EFFECT | EFFECT_PRESERVED, fn);
}
function execute_effect_teardown(effect) {
  var teardown = effect.teardown;
  if (teardown !== null) {
    const previously_destroying_effect = is_destroying_effect;
    const previous_reaction = active_reaction;
    set_is_destroying_effect(true);
    set_active_reaction(null);
    try {
      teardown.call(null);
    } catch (error5) {
      invoke_error_boundary(error5, effect.parent);
    } finally {
      set_is_destroying_effect(previously_destroying_effect);
      set_active_reaction(previous_reaction);
    }
  }
}
function destroy_effect_children(signal, remove_dom = false) {
  var effect = signal.first;
  signal.first = signal.last = null;
  while (effect !== null) {
    const controller = effect.ac;
    if (controller !== null) {
      without_reactive_context(() => {
        controller.abort(STALE_REACTION);
      });
    }
    var next2 = effect.next;
    if ((effect.f & ROOT_EFFECT) !== 0) {
      effect.parent = null;
    } else {
      destroy_effect(effect, remove_dom);
    }
    effect = next2;
  }
}
function destroy_block_effect_children(signal) {
  var effect = signal.first;
  while (effect !== null) {
    var next2 = effect.next;
    if ((effect.f & BRANCH_EFFECT) === 0) {
      destroy_effect(effect);
    }
    effect = next2;
  }
}
function destroy_effect(effect, remove_dom = true) {
  var removed = false;
  if ((remove_dom || (effect.f & HEAD_EFFECT) !== 0) && effect.nodes !== null && effect.nodes.end !== null) {
    remove_effect_dom(
      effect.nodes.start,
      /** @type {TemplateNode} */
      effect.nodes.end
    );
    removed = true;
  }
  effect.f |= DESTROYING;
  destroy_effect_children(effect, remove_dom && !removed);
  remove_reactions(effect, 0);
  var transitions = effect.nodes && effect.nodes.t;
  if (transitions !== null) {
    for (const transition of transitions) {
      transition.stop();
    }
  }
  execute_effect_teardown(effect);
  effect.f ^= DESTROYING;
  effect.f |= DESTROYED;
  var parent = effect.parent;
  if (parent !== null && parent.first !== null) {
    unlink_effect(effect);
  }
  effect.next = effect.prev = effect.teardown = effect.ctx = effect.deps = effect.fn = effect.nodes = effect.ac = effect.b = null;
}
function remove_effect_dom(node, end) {
  while (node !== null) {
    var next2 = node === end ? null : /* @__PURE__ */ get_next_sibling(node);
    node.remove();
    node = next2;
  }
}
function unlink_effect(effect) {
  var parent = effect.parent;
  var prev = effect.prev;
  var next2 = effect.next;
  if (prev !== null) prev.next = next2;
  if (next2 !== null) next2.prev = prev;
  if (parent !== null) {
    if (parent.first === effect) parent.first = next2;
    if (parent.last === effect) parent.last = prev;
  }
}
function pause_effect(effect, callback, destroy = true) {
  var transitions = [];
  effect.f |= PAUSED;
  pause_children(effect, transitions, true);
  var fn = /* @__PURE__ */ __name(() => {
    if (destroy) destroy_effect(effect);
    if (callback) callback();
  }, "fn");
  var remaining = transitions.length;
  if (remaining > 0) {
    var check = /* @__PURE__ */ __name(() => --remaining || fn(), "check");
    for (var transition of transitions) {
      transition.out(check);
    }
  } else {
    fn();
  }
}
function pause_children(effect, transitions, local) {
  if ((effect.f & INERT) !== 0) return;
  effect.f ^= INERT;
  var t2 = effect.nodes && effect.nodes.t;
  if (t2 !== null) {
    for (const transition of t2) {
      if (transition.is_global || local) {
        transitions.push(transition);
      }
    }
  }
  var child = effect.first;
  while (child !== null) {
    var sibling = child.next;
    if ((child.f & ROOT_EFFECT) === 0) {
      var transparent = (child.f & EFFECT_TRANSPARENT) !== 0 || // If this is a branch effect without a block effect parent,
      // it means the parent block effect was pruned. In that case,
      // transparency information was transferred to the branch effect.
      (child.f & BRANCH_EFFECT) !== 0 && (effect.f & BLOCK_EFFECT) !== 0;
      pause_children(child, transitions, transparent ? local : false);
    }
    child = sibling;
  }
}
function move_effect(effect, fragment) {
  if (!effect.nodes) return;
  var node = effect.nodes.start;
  var end = effect.nodes.end;
  while (node !== null) {
    var next2 = node === end ? null : /* @__PURE__ */ get_next_sibling(node);
    fragment.append(node);
    node = next2;
  }
}
function handle_event_propagation(event) {
  var handler_element = this;
  var owner_document = (
    /** @type {Node} */
    handler_element.ownerDocument
  );
  var event_name = event.type;
  var path = event.composedPath?.() || [];
  var current_target = (
    /** @type {null | Element} */
    path[0] || event.target
  );
  last_propagated_event = event;
  if (!last_propagated_event_clear_scheduled) {
    last_propagated_event_clear_scheduled = true;
    setTimeout(() => {
      last_propagated_event_clear_scheduled = false;
      last_propagated_event = null;
    });
  }
  var path_idx = 0;
  var handled_at = last_propagated_event === event && event[event_symbol];
  if (handled_at) {
    var at_idx = path.indexOf(handled_at);
    if (at_idx !== -1 && (handler_element === document || handler_element === /** @type {any} */
    window)) {
      event[event_symbol] = handler_element;
      return;
    }
    var handler_idx = path.indexOf(handler_element);
    if (handler_idx === -1) {
      return;
    }
    if (at_idx <= handler_idx) {
      path_idx = at_idx;
    }
  }
  current_target = /** @type {Element} */
  path[path_idx] || event.target;
  if (current_target === handler_element) return;
  define_property(event, "currentTarget", {
    configurable: true,
    get() {
      return current_target || owner_document;
    }
  });
  var previous_reaction = active_reaction;
  var previous_effect = active_effect;
  set_active_reaction(null);
  set_active_effect(null);
  try {
    var throw_error;
    var other_errors = [];
    while (current_target !== null) {
      if (current_target === handler_element) break;
      try {
        var delegated = current_target[event_symbol]?.[event_name];
        if (delegated != null && (!/** @type {any} */
        current_target.disabled || // DOM could've been updated already by the time this is reached, so we check this as well
        // -> the target could not have been disabled because it emits the event in the first place
        event.target === current_target)) {
          delegated.call(current_target, event);
        }
      } catch (error5) {
        if (throw_error) {
          other_errors.push(error5);
        } else {
          throw_error = error5;
        }
      }
      if (event.cancelBubble) break;
      path_idx++;
      current_target = path_idx < path.length ? (
        /** @type {Element} */
        path[path_idx]
      ) : null;
    }
    if (throw_error) {
      for (let error5 of other_errors) {
        queueMicrotask(() => {
          throw error5;
        });
      }
      throw throw_error;
    }
  } finally {
    event[event_symbol] = handler_element;
    delete event.currentTarget;
    set_active_reaction(previous_reaction);
    set_active_effect(previous_effect);
  }
}
function assign_nodes(start, end) {
  var effect = (
    /** @type {Effect} */
    active_effect
  );
  if (effect.nodes === null) {
    effect.nodes = { start, end, a: null, t: null };
  }
}
function createSubscriber(start) {
  let subscribers = 0;
  let version2 = source(0);
  let stop;
  return () => {
    if (effect_tracking()) {
      get(version2);
      render_effect(() => {
        if (subscribers === 0) {
          stop = untrack(() => start(() => increment(version2)));
        }
        subscribers += 1;
        return () => {
          queue_micro_task(() => {
            subscribers -= 1;
            if (subscribers === 0) {
              stop?.();
              stop = void 0;
              increment(version2);
            }
          });
        };
      });
    }
  };
}
function boundary(node, props, children, transform_error) {
  new Boundary(node, props, children, transform_error);
}
function mount(component8, options2) {
  return _mount(component8, options2);
}
function hydrate(component8, options2) {
  init_operations2();
  options2.intro = options2.intro ?? false;
  const target = options2.target;
  const was_hydrating = hydrating;
  const previous_hydrate_node = hydrate_node;
  try {
    var anchor = /* @__PURE__ */ get_first_child(target);
    while (anchor && (anchor.nodeType !== COMMENT_NODE || /** @type {Comment} */
    anchor.data !== HYDRATION_START)) {
      anchor = /* @__PURE__ */ get_next_sibling(anchor);
    }
    if (!anchor) {
      throw HYDRATION_ERROR;
    }
    set_hydrating(true);
    set_hydrate_node(
      /** @type {Comment} */
      anchor
    );
    const instance = _mount(component8, { ...options2, anchor });
    set_hydrating(false);
    return (
      /**  @type {Exports} */
      instance
    );
  } catch (error5) {
    if (error5 instanceof Error && error5.message.split("\n").some((line) => line.startsWith("https://svelte.dev/e/"))) {
      throw error5;
    }
    if (error5 !== HYDRATION_ERROR) {
      console.warn("Failed to hydrate: ", error5);
    }
    if (options2.recover === false) {
      hydration_failed();
    }
    init_operations2();
    clear_text_content(target);
    set_hydrating(false);
    return mount(component8, options2);
  } finally {
    set_hydrating(was_hydrating);
    set_hydrate_node(previous_hydrate_node);
  }
}
function _mount(Component, { target, anchor, props = {}, events, context: context4, intro = true, transformError }) {
  init_operations2();
  var component8 = void 0;
  var unmount2 = component_root(() => {
    var anchor_node = anchor ?? target.appendChild(create_text());
    boundary(
      /** @type {TemplateNode} */
      anchor_node,
      {
        pending: /* @__PURE__ */ __name(() => {
        }, "pending")
      },
      (anchor_node2) => {
        push2({});
        var ctx = (
          /** @type {ComponentContext} */
          component_context
        );
        if (context4) ctx.c = context4;
        if (events) {
          props.$$events = events;
        }
        if (hydrating) {
          assign_nodes(
            /** @type {TemplateNode} */
            anchor_node2,
            null
          );
        }
        component8 = Component(anchor_node2, props) || mark_as_component();
        if (hydrating) {
          active_effect.nodes.end = hydrate_node;
          if (hydrate_node === null || hydrate_node.nodeType !== COMMENT_NODE || /** @type {Comment} */
          hydrate_node.data !== HYDRATION_END) {
            hydration_mismatch();
            throw HYDRATION_ERROR;
          }
        }
        pop2();
      },
      transformError
    );
    var registered_events = /* @__PURE__ */ new Set();
    var event_handle = /* @__PURE__ */ __name((events2) => {
      for (var i = 0; i < events2.length; i++) {
        var event_name = events2[i];
        if (registered_events.has(event_name)) continue;
        registered_events.add(event_name);
        var passive = is_passive_event(event_name);
        for (const node of [target, document]) {
          var counts = listeners2.get(node);
          if (counts === void 0) {
            counts = /* @__PURE__ */ new Map();
            listeners2.set(node, counts);
          }
          var count3 = counts.get(event_name);
          if (count3 === void 0) {
            node.addEventListener(event_name, handle_event_propagation, { passive });
            counts.set(event_name, 1);
          } else {
            counts.set(event_name, count3 + 1);
          }
        }
      }
    }, "event_handle");
    event_handle(array_from(all_registered_events));
    root_event_handles.add(event_handle);
    return () => {
      for (var event_name of registered_events) {
        for (const node of [target, document]) {
          var counts = (
            /** @type {Map<string, number>} */
            listeners2.get(node)
          );
          var count3 = (
            /** @type {number} */
            counts.get(event_name)
          );
          if (--count3 == 0) {
            node.removeEventListener(event_name, handle_event_propagation);
            counts.delete(event_name);
            if (counts.size === 0) {
              listeners2.delete(node);
            }
          } else {
            counts.set(event_name, count3);
          }
        }
      }
      root_event_handles.delete(event_handle);
      if (anchor_node !== anchor) {
        anchor_node.parentNode?.removeChild(anchor_node);
      }
    };
  });
  mounted_components.set(component8, unmount2);
  return component8;
}
function unmount(component8, options2) {
  const fn = mounted_components.get(component8);
  if (fn) {
    mounted_components.delete(component8);
    return fn(options2);
  }
  return Promise.resolve();
}
function asClassComponent$1(component8) {
  return class extends Svelte4Component {
    /** @param {any} options */
    constructor(options2) {
      super({
        component: component8,
        ...options2
      });
    }
  };
}
function asClassComponent(component8) {
  const component_constructor = asClassComponent$1(component8);
  const _render = /* @__PURE__ */ __name((props, { context: context4, csp, transformError } = {}) => {
    const result = render(component8, { props, context: context4, csp, transformError });
    const munged = Object.defineProperties(
      /** @type {LegacyRenderResult & PromiseLike<LegacyRenderResult>} */
      {},
      {
        css: {
          value: { code: "", map: null }
        },
        head: {
          get: /* @__PURE__ */ __name(() => result.head, "get")
        },
        html: {
          get: /* @__PURE__ */ __name(() => result.body, "get")
        },
        then: {
          /**
           * this is not type-safe, but honestly it's the best I can do right now, and it's a straightforward function.
           *
           * @template TResult1
           * @template [TResult2=never]
           * @param { (value: LegacyRenderResult) => TResult1 } onfulfilled
           * @param { (reason: unknown) => TResult2 } onrejected
           */
          value: /* @__PURE__ */ __name((onfulfilled, onrejected) => {
            {
              const user_result = onfulfilled({
                css: munged.css,
                head: munged.head,
                html: munged.html
              });
              return Promise.resolve(user_result);
            }
          }, "value")
        }
      }
    );
    return munged;
  }, "_render");
  component_constructor.render = _render;
  return component_constructor;
}
function Root($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      stores,
      page: page2,
      constructors,
      components = [],
      form,
      data_0 = null,
      data_1 = null
    } = $$props;
    {
      setContext("__svelte__", stores);
    }
    {
      stores.page.set(page2);
    }
    const Pyramid_1 = derived(() => constructors[1]);
    if (constructors[1]) {
      $$renderer2.push("<!--[0-->");
      const Pyramid_0 = constructors[0];
      if (Pyramid_0) {
        $$renderer2.push("<!--[-->");
        Pyramid_0($$renderer2, {
          data: data_0,
          form,
          params: page2.params,
          children: /* @__PURE__ */ __name(($$renderer3) => {
            if (Pyramid_1()) {
              $$renderer3.push("<!--[-->");
              Pyramid_1()($$renderer3, { data: data_1, form, params: page2.params });
              $$renderer3.push("<!--]-->");
            } else {
              $$renderer3.push("<!--[!-->");
              $$renderer3.push("<!--]-->");
            }
          }, "children"),
          $$slots: { default: true }
        });
        $$renderer2.push("<!--]-->");
      } else {
        $$renderer2.push("<!--[!-->");
        $$renderer2.push("<!--]-->");
      }
    } else {
      $$renderer2.push("<!--[-1-->");
      const Pyramid_0 = constructors[0];
      if (Pyramid_0) {
        $$renderer2.push("<!--[-->");
        Pyramid_0($$renderer2, { data: data_0, form, params: page2.params });
        $$renderer2.push("<!--]-->");
      } else {
        $$renderer2.push("<!--[!-->");
        $$renderer2.push("<!--]-->");
      }
    }
    $$renderer2.push(`<!--]--> `);
    {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]-->`);
  });
}
var DEV, tracing_mode_flag, component_context, micro_tasks, hydrating, hydrate_node, $window, first_child_getter, next_sibling_getter, STATUS_MASK, OBSOLETE, first_batch, last_batch, current_batch, previous_batch, batch_values, last_scheduled_effect, is_flushing_sync, is_processing, collected_effects, legacy_updates, flush_count, uid, Batch, eager_block_effects, eager_effects, old_values, eager_effects_deferred, seen, count_deps, is_updating_effect, is_destroying_effect, active_reaction, untracking, active_effect, current_sources, new_deps, skipped_deps, untracked_writes, write_version, read_version, update_version, event_symbol, all_registered_events, root_event_handles, last_propagated_event, last_propagated_event_clear_scheduled, flags, Boundary, listeners2, mounted_components, Svelte4Component, root;
var init_root = __esm({
  "../output/server/chunks/root.js"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_chunks();
    DEV = false;
    __name(equals, "equals");
    __name(safe_not_equal, "safe_not_equal");
    __name(safe_equals, "safe_equals");
    __name(effect_update_depth_exceeded, "effect_update_depth_exceeded");
    __name(hydration_failed, "hydration_failed");
    __name(state_descriptors_fixed, "state_descriptors_fixed");
    __name(state_prototype_fixed, "state_prototype_fixed");
    __name(state_unsafe_mutation, "state_unsafe_mutation");
    __name(svelte_boundary_reset_onerror, "svelte_boundary_reset_onerror");
    tracing_mode_flag = false;
    component_context = null;
    __name(set_component_context, "set_component_context");
    __name(push2, "push");
    __name(pop2, "pop");
    __name(mark_as_component, "mark_as_component");
    __name(is_runes, "is_runes");
    micro_tasks = [];
    __name(run_micro_tasks, "run_micro_tasks");
    __name(queue_micro_task, "queue_micro_task");
    __name(flush_tasks, "flush_tasks");
    __name(derived_inert, "derived_inert");
    __name(hydration_mismatch, "hydration_mismatch");
    __name(svelte_boundary_reset_noop, "svelte_boundary_reset_noop");
    hydrating = false;
    __name(set_hydrating, "set_hydrating");
    __name(set_hydrate_node, "set_hydrate_node");
    __name(hydrate_next, "hydrate_next");
    __name(next, "next");
    __name(skip_nodes, "skip_nodes");
    __name(proxy, "proxy");
    __name(init_operations2, "init_operations");
    __name(create_text, "create_text");
    __name(get_first_child, "get_first_child");
    __name(get_next_sibling, "get_next_sibling");
    __name(clear_text_content, "clear_text_content");
    __name(handle_error, "handle_error");
    __name(invoke_error_boundary, "invoke_error_boundary");
    STATUS_MASK = -7169;
    __name(set_signal_status, "set_signal_status");
    __name(update_derived_status, "update_derived_status");
    __name(defer_effect, "defer_effect");
    __name(without_reactive_context, "without_reactive_context");
    OBSOLETE = /* @__PURE__ */ Symbol("obsolete");
    __name(destroy_derived_effects, "destroy_derived_effects");
    __name(execute_derived, "execute_derived");
    __name(update_derived, "update_derived");
    __name(freeze_derived_effects, "freeze_derived_effects");
    __name(unfreeze_derived_effects, "unfreeze_derived_effects");
    first_batch = null;
    last_batch = null;
    current_batch = null;
    previous_batch = null;
    batch_values = null;
    last_scheduled_effect = null;
    is_flushing_sync = false;
    is_processing = false;
    collected_effects = null;
    legacy_updates = null;
    flush_count = 0;
    uid = 1;
    Batch = class _Batch {
      static {
        __name(this, "Batch");
      }
      id = uid++;
      /** True as soon as `#process` was called */
      #started = false;
      linked = true;
      /** @type {Batch | null} */
      #prev = null;
      /** @type {Batch | null} */
      #next = null;
      /** @type {Map<Effect, ReturnType<typeof deferred<any>>>} */
      async_deriveds = /* @__PURE__ */ new Map();
      /**
       * The current values of any signals that are updated in this batch.
       * Tuple format: [value, is_derived] (note: is_derived is false for deriveds, too, if they were overridden via assignment)
       * They keys of this map are identical to `this.#previous`
       * @type {Map<Value, [any, boolean]>}
       */
      current = /* @__PURE__ */ new Map();
      /**
       * The values of any signals (sources and deriveds) that are updated in this batch _before_ those updates took place.
       * They keys of this map are identical to `this.#current`
       * @type {Map<Value, any>}
       */
      previous = /* @__PURE__ */ new Map();
      /**
       * When the batch is committed (and the DOM is updated), we need to remove old branches
       * and append new ones by calling the functions added inside (if/each/key/etc) blocks
       * @type {Set<(batch: Batch) => void>}
       */
      #commit_callbacks = /* @__PURE__ */ new Set();
      /**
       * If a fork is discarded, we need to destroy any effects that are no longer needed
       * @type {Set<(batch: Batch) => void>}
       */
      #discard_callbacks = /* @__PURE__ */ new Set();
      /**
       * The number of async effects that are currently in flight
       */
      #pending = 0;
      /**
       * Async effects that are currently in flight, _not_ inside a pending boundary
       * @type {Map<Effect, number>}
       */
      #blocking_pending = /* @__PURE__ */ new Map();
      /**
       * A deferred that resolves when the batch is committed, used with `settled()`
       * TODO replace with Promise.withResolvers once supported widely enough
       * @type {{ promise: Promise<void>, resolve: (value?: any) => void, reject: (reason: unknown) => void } | null}
       */
      #deferred = null;
      /**
       * Effects that were scheduled in this batch but not yet 'resolved' into the
       * root effects that need to be flushed. Resolving — the upwards traversal that
       * marks the path to each effect on the shared effect tree (see #resolve) — is
       * deferred until the batch is processed, so that the markers are created and
       * consumed within a single traversal. Scheduling into other batches (which can
       * happen concurrently, e.g. while a batch is committed) can therefore never
       * observe (and be confused by) this batch's markers.
       * May contain duplicates — deduplication happens during resolving
       * @type {Effect[]}
       */
      #scheduled = [];
      /**
       * Effects created while this batch was active.
       * @type {Effect[]}
       */
      #new_effects = [];
      /**
       * Deferred effects (which run after async work has completed) that are DIRTY
       * @type {Set<Effect>}
       */
      #dirty_effects = /* @__PURE__ */ new Set();
      /**
       * Deferred effects that are MAYBE_DIRTY
       * @type {Set<Effect>}
       */
      #maybe_dirty_effects = /* @__PURE__ */ new Set();
      /**
       * A map of branches that still exist, but will be destroyed when this batch
       * is committed — we skip over these during `process`.
       * The value contains child effects that were dirty/maybe_dirty before being reset,
       * so they can be rescheduled if the branch survives.
       * @type {Map<Effect, { d: Effect[], m: Effect[] }>}
       */
      #skipped_branches = /* @__PURE__ */ new Map();
      /**
       * Inverse of #skipped_branches which we need to tell prior batches to unskip them when committing
       * @type {Set<Effect>}
       */
      #unskipped_branches = /* @__PURE__ */ new Set();
      is_fork = false;
      #decrement_queued = false;
      constructor() {
        if (last_batch === null) {
          first_batch = last_batch = this;
        } else {
          last_batch.#next = this;
          this.#prev = last_batch;
        }
        last_batch = this;
      }
      #is_deferred() {
        if (this.is_fork) return true;
        for (const effect of this.#blocking_pending.keys()) {
          var e3 = effect;
          var skipped = false;
          while (e3.parent !== null) {
            if (this.#skipped_branches.has(e3)) {
              skipped = true;
              break;
            }
            e3 = e3.parent;
          }
          if (!skipped) {
            return true;
          }
        }
        return false;
      }
      /**
       * Add an effect to the #skipped_branches map and reset its children
       * @param {Effect} effect
       */
      skip_effect(effect) {
        if (!this.#skipped_branches.has(effect)) {
          this.#skipped_branches.set(effect, { d: [], m: [] });
        }
        this.#unskipped_branches.delete(effect);
      }
      /**
       * Remove an effect from the #skipped_branches map and reschedule
       * any tracked dirty/maybe_dirty child effects
       * @param {Effect} effect
       * @param {(e: Effect) => void} callback
       */
      unskip_effect(effect, callback = (e3) => this.schedule(e3)) {
        var tracked = this.#skipped_branches.get(effect);
        if (tracked) {
          this.#skipped_branches.delete(effect);
          for (var e3 of tracked.d) {
            set_signal_status(e3, DIRTY);
            callback(e3);
          }
          for (e3 of tracked.m) {
            set_signal_status(e3, MAYBE_DIRTY);
            callback(e3);
          }
        }
        this.#unskipped_branches.add(effect);
      }
      /**
       * Convert the effects that were scheduled in this batch into the root effects
       * that need to be traversed, marking the path to each effect (by clearing the
       * `CLEAN` flag on ancestor branches) so that the traversal can find them.
       * This happens right before traversal rather than at scheduling time, so that
       * the markers left on the (shared) effect tree are created and consumed within
       * a single traversal — scheduling into other batches can never observe them
       * @returns {Effect[]}
       */
      #resolve() {
        var roots = [];
        for (const effect of this.#scheduled) {
          if ((effect.f & DESTROYED) !== 0 || (effect.f & (DIRTY | MAYBE_DIRTY)) === 0) continue;
          var e3 = effect;
          var covered = false;
          while (e3.parent !== null) {
            e3 = e3.parent;
            var flags2 = e3.f;
            if ((flags2 & (ROOT_EFFECT | BRANCH_EFFECT)) !== 0) {
              if ((flags2 & CLEAN) === 0) {
                covered = true;
                break;
              }
              e3.f ^= CLEAN;
            }
          }
          if (!covered) {
            roots.push(e3);
          }
        }
        this.#scheduled = [];
        return roots;
      }
      #process() {
        this.#started = true;
        for (const e3 of this.#dirty_effects) {
          this.#maybe_dirty_effects.delete(e3);
          set_signal_status(e3, DIRTY);
          this.schedule(e3);
        }
        for (const e3 of this.#maybe_dirty_effects) {
          set_signal_status(e3, MAYBE_DIRTY);
          this.schedule(e3);
        }
        this.apply();
        var effects = collected_effects = [];
        var render_effects = [];
        var updates = legacy_updates = [];
        while (this.#scheduled.length > 0) {
          if (flush_count++ > 1e3) {
            this.#unlink();
            infinite_loop_guard();
          }
          for (const root2 of this.#resolve()) {
            try {
              this.#traverse(root2, effects, render_effects);
            } catch (e3) {
              reset_all(root2);
              if (!this.#is_deferred()) this.discard();
              throw e3;
            }
          }
        }
        current_batch = null;
        if (updates.length > 0) {
          var batch = _Batch.ensure();
          for (const e3 of updates) {
            batch.schedule(e3);
          }
        }
        collected_effects = null;
        legacy_updates = null;
        if (this.#is_deferred()) {
          this.#defer_effects(render_effects);
          this.#defer_effects(effects);
          for (const [e3, t2] of this.#skipped_branches) {
            reset_branch(e3, t2);
          }
          if (updates.length > 0) {
            current_batch.#process();
          }
          return;
        }
        const earlier_batch = this.#find_earlier_batch();
        if (earlier_batch) {
          this.#defer_effects(render_effects);
          this.#defer_effects(effects);
          earlier_batch.#merge(this);
          return;
        }
        this.#dirty_effects.clear();
        this.#maybe_dirty_effects.clear();
        for (const fn of this.#commit_callbacks) fn(this);
        this.#commit_callbacks.clear();
        previous_batch = this;
        flush_queued_effects(render_effects);
        flush_queued_effects(effects);
        previous_batch = null;
        this.#deferred?.resolve();
        var next_batch = (
          /** @type {Batch | null} */
          /** @type {unknown} */
          current_batch
        );
        if (this.#pending === 0 && (this.#scheduled.length === 0 || next_batch !== null)) {
          this.#unlink();
        }
        if (this.#scheduled.length > 0) {
          if (next_batch !== null) {
            for (const e3 of this.#scheduled) {
              next_batch.#scheduled.push(e3);
            }
            this.#scheduled = [];
          } else {
            next_batch = this;
          }
        }
        if (next_batch !== null) {
          old_values.clear();
          next_batch.#process();
        }
      }
      /**
       * Traverse the effect tree, executing effects or stashing
       * them for later execution as appropriate
       * @param {Effect} root
       * @param {Effect[]} effects
       * @param {Effect[]} render_effects
       */
      #traverse(root2, effects, render_effects) {
        root2.f ^= CLEAN;
        var effect = root2.first;
        while (effect !== null) {
          var flags2 = effect.f;
          var is_branch = (flags2 & (BRANCH_EFFECT | ROOT_EFFECT)) !== 0;
          var is_skippable_branch = is_branch && (flags2 & CLEAN) !== 0;
          var skip = is_skippable_branch || (flags2 & INERT) !== 0 || this.#skipped_branches.has(effect);
          if (!skip && effect.fn !== null) {
            if (is_branch) {
              effect.f ^= CLEAN;
            } else if ((flags2 & EFFECT) !== 0) {
              effects.push(effect);
            } else if (is_dirty(effect)) {
              if ((flags2 & BLOCK_EFFECT) !== 0) this.#maybe_dirty_effects.add(effect);
              update_effect(effect);
            }
            var child = effect.first;
            if (child !== null) {
              effect = child;
              continue;
            }
          }
          while (effect !== null) {
            var next2 = effect.next;
            if (next2 !== null) {
              effect = next2;
              break;
            }
            effect = effect.parent;
          }
        }
      }
      #find_earlier_batch() {
        var batch = this.#prev;
        while (batch !== null) {
          if (!batch.is_fork) {
            for (const [value, [, is_derived]] of this.current) {
              if (batch.current.has(value) && !is_derived) {
                return batch;
              }
            }
          }
          batch = batch.#prev;
        }
        return null;
      }
      /**
       * @param {Batch} batch
       */
      #merge(batch) {
        for (const [source2, value] of batch.current) {
          if (!this.previous.has(source2) && batch.previous.has(source2)) {
            this.previous.set(source2, batch.previous.get(source2));
          }
          this.current.set(source2, value);
        }
        for (const [effect, deferred2] of batch.async_deriveds) {
          const d = this.async_deriveds.get(effect);
          if (d) deferred2.promise.then(d.resolve).catch(d.reject);
        }
        batch.async_deriveds.clear();
        this.transfer_effects(batch.#dirty_effects, batch.#maybe_dirty_effects);
        const mark = /* @__PURE__ */ __name((value) => {
          var reactions = value.reactions;
          if (reactions === null) return;
          if ((value.f & DERIVED) !== 0 && (value.f & (DIRTY | MAYBE_DIRTY)) === 0) {
            return;
          }
          for (const reaction of reactions) {
            var flags2 = reaction.f;
            if ((flags2 & DERIVED) !== 0) {
              mark(
                /** @type {Derived} */
                reaction
              );
            } else {
              var effect = (
                /** @type {Effect} */
                reaction
              );
              if (flags2 & (ASYNC | BLOCK_EFFECT) && !this.async_deriveds.has(effect)) {
                this.#maybe_dirty_effects.delete(effect);
                set_signal_status(effect, DIRTY);
                this.schedule(effect);
              }
            }
          }
        }, "mark");
        for (const source2 of this.current.keys()) {
          mark(source2);
        }
        this.oncommit(() => batch.discard());
        batch.#unlink();
        current_batch = this;
        this.#process();
      }
      /**
       * @param {Effect[]} effects
       */
      #defer_effects(effects) {
        for (var i = 0; i < effects.length; i += 1) {
          defer_effect(effects[i], this.#dirty_effects, this.#maybe_dirty_effects);
        }
      }
      /**
       * Associate a change to a given source with the current
       * batch, noting its previous and current values
       * @param {Value} source
       * @param {any} value
       * @param {boolean} [is_derived]
       */
      capture(source2, value, is_derived = false) {
        if (source2.v !== UNINITIALIZED && !this.previous.has(source2)) {
          this.previous.set(source2, source2.v);
        }
        if ((source2.f & ERROR_VALUE) === 0) {
          this.current.set(source2, [value, is_derived]);
          batch_values?.set(source2, value);
        }
        if (!this.is_fork) {
          source2.v = value;
        }
      }
      activate() {
        current_batch = this;
      }
      deactivate() {
        current_batch = null;
        batch_values = null;
      }
      flush() {
        try {
          if (DEV) ;
          is_processing = true;
          current_batch = this;
          this.#process();
        } finally {
          flush_count = 0;
          last_scheduled_effect = null;
          collected_effects = null;
          legacy_updates = null;
          is_processing = false;
          current_batch = null;
          batch_values = null;
          old_values.clear();
        }
      }
      discard() {
        for (const fn of this.#discard_callbacks) fn(this);
        this.#discard_callbacks.clear();
        for (const deferred2 of this.async_deriveds.values()) {
          deferred2.reject(OBSOLETE);
        }
        this.#unlink();
        this.#deferred?.resolve();
      }
      /**
       * @param {Effect} effect
       */
      register_created_effect(effect) {
        this.#new_effects.push(effect);
      }
      #commit() {
        for (let batch = first_batch; batch !== null; batch = batch.#next) {
          var is_earlier = batch.id < this.id;
          var sources = [];
          for (const [source3, [value, is_derived]] of this.current) {
            if (batch.current.has(source3)) {
              var batch_value = (
                /** @type {[any, boolean]} */
                batch.current.get(source3)[0]
              );
              if (is_earlier && value !== batch_value) {
                batch.current.set(source3, [value, is_derived]);
              } else {
                continue;
              }
            }
            sources.push(source3);
          }
          if (is_earlier) {
            for (const [effect, deferred2] of this.async_deriveds) {
              const d = batch.async_deriveds.get(effect);
              if (d) deferred2.promise.then(d.resolve).catch(d.reject);
            }
          }
          var current2 = [...batch.current.keys()].filter(
            (source3) => !/** @type {[any, boolean]} */
            batch.current.get(source3)[1]
          );
          if (!batch.#started || current2.length === 0) continue;
          var others = current2.filter((source3) => !this.current.has(source3));
          if (others.length === 0) {
            if (is_earlier) {
              batch.discard();
            }
          } else if (sources.length > 0) {
            if (is_earlier) {
              for (const unskipped of this.#unskipped_branches) {
                batch.unskip_effect(unskipped, (e3) => {
                  if ((e3.f & (BLOCK_EFFECT | ASYNC)) !== 0) {
                    batch.schedule(e3);
                  } else {
                    batch.#defer_effects([e3]);
                  }
                });
              }
            }
            batch.activate();
            var marked = /* @__PURE__ */ new Set();
            var checked = /* @__PURE__ */ new Map();
            for (var source2 of sources) {
              mark_effects(source2, others, marked, checked);
            }
            checked = /* @__PURE__ */ new Map();
            var current_unequal = [...batch.current].filter(([c2, v1]) => {
              const v2 = this.current.get(c2);
              if (!v2) return true;
              return v2[0] !== v1[0] || v2[1] !== v1[1];
            }).map(([c2]) => c2);
            if (current_unequal.length > 0) {
              for (const effect of this.#new_effects) {
                if ((effect.f & (DESTROYED | INERT | EAGER_EFFECT)) === 0 && depends_on(effect, current_unequal, checked)) {
                  if ((effect.f & (ASYNC | BLOCK_EFFECT)) !== 0) {
                    set_signal_status(effect, DIRTY);
                    batch.schedule(effect);
                  } else {
                    batch.#dirty_effects.add(effect);
                  }
                }
              }
            }
            if (batch.#scheduled.length > 0 && !batch.#decrement_queued) {
              batch.apply();
              for (var root2 of batch.#resolve()) {
                batch.#traverse(root2, [], []);
              }
            }
            batch.deactivate();
          }
        }
      }
      /**
       * @param {boolean} blocking
       * @param {Effect} effect
       */
      increment(blocking, effect) {
        this.#pending += 1;
        if (blocking) {
          let blocking_pending_count = this.#blocking_pending.get(effect) ?? 0;
          this.#blocking_pending.set(effect, blocking_pending_count + 1);
        }
      }
      /**
       * @param {boolean} blocking
       * @param {Effect} effect
       */
      decrement(blocking, effect) {
        this.#pending -= 1;
        if (blocking) {
          let blocking_pending_count = this.#blocking_pending.get(effect) ?? 0;
          if (blocking_pending_count === 1) {
            this.#blocking_pending.delete(effect);
          } else {
            this.#blocking_pending.set(effect, blocking_pending_count - 1);
          }
        }
        if (this.#decrement_queued) return;
        this.#decrement_queued = true;
        queue_micro_task(() => {
          this.#decrement_queued = false;
          if (this.linked) {
            this.flush();
          }
        });
      }
      /**
       * @param {Set<Effect>} dirty_effects
       * @param {Set<Effect>} maybe_dirty_effects
       */
      transfer_effects(dirty_effects, maybe_dirty_effects) {
        for (const e3 of dirty_effects) {
          this.#dirty_effects.add(e3);
        }
        for (const e3 of maybe_dirty_effects) {
          this.#maybe_dirty_effects.add(e3);
        }
        dirty_effects.clear();
        maybe_dirty_effects.clear();
      }
      /** @param {(batch: Batch) => void} fn */
      oncommit(fn) {
        this.#commit_callbacks.add(fn);
      }
      /** @param {(batch: Batch) => void} fn */
      ondiscard(fn) {
        this.#discard_callbacks.add(fn);
      }
      settled() {
        return (this.#deferred ??= deferred()).promise;
      }
      static ensure() {
        if (current_batch === null) {
          const batch = current_batch = new _Batch();
          if (!is_processing && !is_flushing_sync) {
            queue_micro_task(() => {
              if (!batch.#started) {
                batch.flush();
              }
            });
          }
        }
        return current_batch;
      }
      apply() {
        {
          batch_values = null;
          return;
        }
      }
      /**
       *
       * @param {Effect} effect
       */
      schedule(effect) {
        last_scheduled_effect = effect;
        if (effect.b?.is_pending && (effect.f & (EFFECT | RENDER_EFFECT | MANAGED_EFFECT)) !== 0 && (effect.f & REACTION_RAN) === 0) {
          effect.b.defer_effect(effect);
          return;
        }
        this.#scheduled.push(effect);
      }
      #unlink() {
        if (!this.linked) return;
        var prev = this.#prev;
        var next2 = this.#next;
        if (prev === null) {
          first_batch = next2;
        } else {
          prev.#next = next2;
        }
        if (next2 === null) {
          last_batch = prev;
        } else {
          next2.#prev = prev;
        }
        this.linked = false;
      }
    };
    __name(flushSync, "flushSync");
    __name(infinite_loop_guard, "infinite_loop_guard");
    eager_block_effects = null;
    __name(flush_queued_effects, "flush_queued_effects");
    __name(mark_effects, "mark_effects");
    __name(depends_on, "depends_on");
    __name(schedule_effect, "schedule_effect");
    __name(reset_branch, "reset_branch");
    __name(reset_all, "reset_all");
    eager_effects = /* @__PURE__ */ new Set();
    old_values = /* @__PURE__ */ new Map();
    eager_effects_deferred = false;
    __name(source, "source");
    __name(state, "state");
    __name(mutable_source, "mutable_source");
    __name(set, "set");
    seen = null;
    count_deps = 0;
    __name(internal_set, "internal_set");
    __name(flush_eager_effects, "flush_eager_effects");
    __name(increment, "increment");
    __name(mark_reactions, "mark_reactions");
    is_updating_effect = false;
    is_destroying_effect = false;
    __name(set_is_destroying_effect, "set_is_destroying_effect");
    active_reaction = null;
    untracking = false;
    __name(set_active_reaction, "set_active_reaction");
    active_effect = null;
    __name(set_active_effect, "set_active_effect");
    current_sources = null;
    __name(push_reaction_value, "push_reaction_value");
    new_deps = null;
    skipped_deps = 0;
    untracked_writes = null;
    __name(set_untracked_writes, "set_untracked_writes");
    write_version = 1;
    read_version = 0;
    update_version = read_version;
    __name(set_update_version, "set_update_version");
    __name(increment_write_version, "increment_write_version");
    __name(is_dirty, "is_dirty");
    __name(schedule_possible_effect_self_invalidation, "schedule_possible_effect_self_invalidation");
    __name(update_reaction, "update_reaction");
    __name(update_dependencies, "update_dependencies");
    __name(remove_reaction, "remove_reaction");
    __name(remove_reactions, "remove_reactions");
    __name(update_effect, "update_effect");
    __name(get, "get");
    __name(reconnect, "reconnect");
    __name(depends_on_old_values, "depends_on_old_values");
    __name(untrack, "untrack");
    __name(push_effect, "push_effect");
    __name(create_effect, "create_effect");
    __name(effect_tracking, "effect_tracking");
    __name(create_user_effect, "create_user_effect");
    __name(component_root, "component_root");
    __name(render_effect, "render_effect");
    __name(block, "block");
    __name(branch, "branch");
    __name(execute_effect_teardown, "execute_effect_teardown");
    __name(destroy_effect_children, "destroy_effect_children");
    __name(destroy_block_effect_children, "destroy_block_effect_children");
    __name(destroy_effect, "destroy_effect");
    __name(remove_effect_dom, "remove_effect_dom");
    __name(unlink_effect, "unlink_effect");
    __name(pause_effect, "pause_effect");
    __name(pause_children, "pause_children");
    __name(move_effect, "move_effect");
    event_symbol = /* @__PURE__ */ Symbol("events");
    all_registered_events = /* @__PURE__ */ new Set();
    root_event_handles = /* @__PURE__ */ new Set();
    last_propagated_event = null;
    last_propagated_event_clear_scheduled = false;
    __name(handle_event_propagation, "handle_event_propagation");
    __name(assign_nodes, "assign_nodes");
    __name(createSubscriber, "createSubscriber");
    flags = EFFECT_TRANSPARENT | EFFECT_PRESERVED;
    __name(boundary, "boundary");
    Boundary = class {
      static {
        __name(this, "Boundary");
      }
      /** @type {Boundary | null} */
      parent;
      is_pending = false;
      /**
       * API-level transformError transform function. Transforms errors before they reach the `failed` snippet.
       * Inherited from parent boundary, or defaults to identity.
       * @type {(error: unknown) => unknown}
       */
      transform_error;
      /** @type {TemplateNode} */
      #anchor;
      /** @type {TemplateNode | null} */
      #hydrate_open = hydrating ? hydrate_node : null;
      /** @type {BoundaryProps} */
      #props;
      /** @type {((anchor: Node) => void)} */
      #children;
      /** @type {Effect} */
      #effect;
      /** @type {Effect | null} */
      #main_effect = null;
      /** @type {Effect | null} */
      #pending_effect = null;
      /** @type {Effect | null} */
      #failed_effect = null;
      /** @type {DocumentFragment | null} */
      #offscreen_fragment = null;
      #local_pending_count = 0;
      #pending_count = 0;
      #pending_count_update_queued = false;
      /** @type {Set<Effect>} */
      #dirty_effects = /* @__PURE__ */ new Set();
      /** @type {Set<Effect>} */
      #maybe_dirty_effects = /* @__PURE__ */ new Set();
      /**
       * A source containing the number of pending async deriveds/expressions.
       * Only created if `$effect.pending()` is used inside the boundary,
       * otherwise updating the source results in needless `Batch.ensure()`
       * calls followed by no-op flushes
       * @type {Source<number> | null}
       */
      #effect_pending = null;
      #effect_pending_subscriber = createSubscriber(() => {
        this.#effect_pending = source(this.#local_pending_count);
        return () => {
          this.#effect_pending = null;
        };
      });
      /**
       * @param {TemplateNode} node
       * @param {BoundaryProps} props
       * @param {((anchor: Node) => void)} children
       * @param {((error: unknown) => unknown) | undefined} [transform_error]
       */
      constructor(node, props, children, transform_error) {
        this.#anchor = node;
        this.#props = props;
        this.#children = (anchor) => {
          var effect = (
            /** @type {Effect} */
            active_effect
          );
          effect.b = this;
          effect.f |= BOUNDARY_EFFECT;
          children(anchor);
        };
        this.parent = /** @type {Effect} */
        active_effect.b;
        this.transform_error = transform_error ?? this.parent?.transform_error ?? ((e3) => e3);
        this.#effect = block(() => {
          if (hydrating) {
            const comment = (
              /** @type {Comment} */
              this.#hydrate_open
            );
            hydrate_next();
            const server_rendered_pending = comment.data === HYDRATION_START_ELSE;
            const server_rendered_failed = comment.data.startsWith(HYDRATION_START_FAILED);
            if (server_rendered_failed) {
              const serialized_error = JSON.parse(comment.data.slice(HYDRATION_START_FAILED.length));
              this.#hydrate_failed_content(serialized_error);
            } else if (server_rendered_pending) {
              this.#hydrate_pending_content();
            } else {
              this.#hydrate_resolved_content();
            }
          } else {
            this.#render();
          }
        }, flags);
        if (hydrating) {
          this.#anchor = hydrate_node;
        }
      }
      #hydrate_resolved_content() {
        try {
          this.#main_effect = branch(() => this.#children(this.#anchor));
        } catch (error5) {
          this.error(error5);
        }
      }
      /**
       * @param {unknown} error The deserialized error from the server's hydration comment
       */
      #hydrate_failed_content(error5) {
        const failed = this.#props.failed;
        const { reset: reset2, invoke_onerror } = this.#create_reset(error5);
        queue_micro_task(invoke_onerror);
        if (!failed) return;
        this.#failed_effect = branch(() => {
          failed(
            this.#anchor,
            () => error5,
            () => reset2
          );
        });
      }
      /**
       * Creates the `reset` function for a failed boundary, along with a function
       * that invokes `onerror` with it (if provided)
       * @param {unknown} error
       * @returns {{ reset: () => void, invoke_onerror: () => void }}
       */
      #create_reset(error5) {
        var did_reset = false;
        var calling_on_error = false;
        const reset2 = /* @__PURE__ */ __name(() => {
          if (did_reset) {
            svelte_boundary_reset_noop();
            return;
          }
          did_reset = true;
          if (calling_on_error) {
            svelte_boundary_reset_onerror();
          }
          if (this.#failed_effect !== null) {
            pause_effect(this.#failed_effect, () => {
              this.#failed_effect = null;
            });
          }
          this.#run(() => {
            this.#render();
          });
        }, "reset");
        const invoke_onerror = /* @__PURE__ */ __name(() => {
          try {
            calling_on_error = true;
            this.#props.onerror?.(error5, reset2);
            calling_on_error = false;
          } catch (err) {
            invoke_error_boundary(err, this.#effect && this.#effect.parent);
          }
        }, "invoke_onerror");
        return { reset: reset2, invoke_onerror };
      }
      #hydrate_pending_content() {
        const pending = this.#props.pending;
        if (!pending) return;
        this.is_pending = true;
        this.#pending_effect = branch(() => pending(this.#anchor));
        queue_micro_task(() => {
          var fragment = this.#offscreen_fragment = document.createDocumentFragment();
          var anchor = create_text();
          var handled = false;
          fragment.append(anchor);
          this.#main_effect = this.#run(() => {
            try {
              return branch(() => this.#children(anchor));
            } catch (error5) {
              try {
                this.error(error5);
                handled = true;
              } catch (error22) {
                invoke_error_boundary(error22, this.#effect.parent);
              }
              return null;
            }
          });
          if (this.#main_effect === null) {
            this.#offscreen_fragment = null;
            if (handled) this.#resolve(
              /** @type {Batch} */
              current_batch
            );
            return;
          }
          if (this.#pending_count === 0) {
            this.#anchor.before(fragment);
            this.#offscreen_fragment = null;
            pause_effect(
              /** @type {Effect} */
              this.#pending_effect,
              () => {
                this.#pending_effect = null;
              }
            );
            this.#resolve(
              /** @type {Batch} */
              current_batch
            );
          }
        });
      }
      #render() {
        try {
          this.is_pending = this.has_pending_snippet();
          this.#pending_count = 0;
          this.#local_pending_count = 0;
          this.#main_effect = branch(() => {
            this.#children(this.#anchor);
          });
          if (this.#pending_count > 0) {
            var fragment = this.#offscreen_fragment = document.createDocumentFragment();
            move_effect(this.#main_effect, fragment);
            const pending = (
              /** @type {(anchor: Node) => void} */
              this.#props.pending
            );
            this.#pending_effect = branch(() => pending(this.#anchor));
          } else {
            this.#resolve(
              /** @type {Batch} */
              current_batch
            );
          }
        } catch (error5) {
          this.error(error5);
        }
      }
      /**
       * @param {Batch} batch
       */
      #resolve(batch) {
        this.is_pending = false;
        batch.transfer_effects(this.#dirty_effects, this.#maybe_dirty_effects);
      }
      /**
       * Defer an effect inside a pending boundary until the boundary resolves
       * @param {Effect} effect
       */
      defer_effect(effect) {
        defer_effect(effect, this.#dirty_effects, this.#maybe_dirty_effects);
      }
      /**
       * Returns `false` if the effect exists inside a boundary whose pending snippet is shown
       * @returns {boolean}
       */
      is_rendered() {
        return !this.is_pending && (!this.parent || this.parent.is_rendered());
      }
      has_pending_snippet() {
        return !!this.#props.pending;
      }
      /**
       * @template T
       * @param {() => T} fn
       */
      #run(fn) {
        var previous_effect = active_effect;
        var previous_reaction = active_reaction;
        var previous_ctx = component_context;
        set_active_effect(this.#effect);
        set_active_reaction(this.#effect);
        set_component_context(this.#effect.ctx);
        try {
          Batch.ensure();
          return fn();
        } finally {
          set_active_effect(previous_effect);
          set_active_reaction(previous_reaction);
          set_component_context(previous_ctx);
        }
      }
      /**
       * Updates the pending count associated with the currently visible pending snippet,
       * if any, such that we can replace the snippet with content once work is done
       * @param {1 | -1} d
       * @param {Batch} batch
       */
      #update_pending_count(d, batch) {
        if (!this.has_pending_snippet()) {
          if (this.parent) {
            this.parent.#update_pending_count(d, batch);
          }
          return;
        }
        this.#pending_count += d;
        if (this.#pending_count === 0) {
          this.#resolve(batch);
          if (this.#pending_effect) {
            pause_effect(this.#pending_effect, () => {
              this.#pending_effect = null;
            });
          }
          if (this.#offscreen_fragment) {
            this.#anchor.before(this.#offscreen_fragment);
            this.#offscreen_fragment = null;
          }
        }
      }
      /**
       * Update the source that powers `$effect.pending()` inside this boundary,
       * and controls when the current `pending` snippet (if any) is removed.
       * Do not call from inside the class
       * @param {1 | -1} d
       * @param {Batch} batch
       */
      update_pending_count(d, batch) {
        this.#update_pending_count(d, batch);
        this.#local_pending_count += d;
        if (!this.#effect_pending || this.#pending_count_update_queued) return;
        this.#pending_count_update_queued = true;
        queue_micro_task(() => {
          this.#pending_count_update_queued = false;
          if (this.#effect_pending) {
            internal_set(this.#effect_pending, this.#local_pending_count);
          }
        });
      }
      get_effect_pending() {
        this.#effect_pending_subscriber();
        return get(
          /** @type {Source<number>} */
          this.#effect_pending
        );
      }
      /** @param {unknown} error */
      error(error5) {
        if (!this.#props.onerror && !this.#props.failed) {
          throw error5;
        }
        if (current_batch?.is_fork) {
          if (this.#main_effect) current_batch.skip_effect(this.#main_effect);
          if (this.#pending_effect) current_batch.skip_effect(this.#pending_effect);
          if (this.#failed_effect) current_batch.skip_effect(this.#failed_effect);
          current_batch.oncommit(() => {
            this.#handle_error(error5);
          });
        } else {
          this.#handle_error(error5);
        }
      }
      /**
       * @param {unknown} error
       */
      #handle_error(error5) {
        if (this.#main_effect) {
          destroy_effect(this.#main_effect);
          this.#main_effect = null;
        }
        if (this.#pending_effect) {
          destroy_effect(this.#pending_effect);
          this.#pending_effect = null;
        }
        if (this.#failed_effect) {
          destroy_effect(this.#failed_effect);
          this.#failed_effect = null;
        }
        if (hydrating) {
          set_hydrate_node(
            /** @type {TemplateNode} */
            this.#hydrate_open
          );
          next();
          set_hydrate_node(skip_nodes());
        }
        let failed = this.#props.failed;
        const handle_error_result = /* @__PURE__ */ __name((transformed_error) => {
          const { reset: reset2, invoke_onerror } = this.#create_reset(transformed_error);
          invoke_onerror();
          if (failed) {
            this.#failed_effect = this.#run(() => {
              try {
                return branch(() => {
                  var effect = (
                    /** @type {Effect} */
                    active_effect
                  );
                  effect.b = this;
                  effect.f |= BOUNDARY_EFFECT;
                  failed(
                    this.#anchor,
                    () => transformed_error,
                    () => reset2
                  );
                });
              } catch (error22) {
                invoke_error_boundary(
                  error22,
                  /** @type {Effect} */
                  this.#effect.parent
                );
                return null;
              }
            });
          }
        }, "handle_error_result");
        queue_micro_task(() => {
          var result;
          try {
            result = this.transform_error(error5);
          } catch (e3) {
            invoke_error_boundary(e3, this.#effect && this.#effect.parent);
            return;
          }
          if (result !== null && typeof result === "object" && typeof /** @type {any} */
          result.then === "function") {
            result.then(
              handle_error_result,
              /** @param {unknown} e */
              (e3) => invoke_error_boundary(e3, this.#effect && this.#effect.parent)
            );
          } else {
            handle_error_result(result);
          }
        });
      }
    };
    __name(mount, "mount");
    __name(hydrate, "hydrate");
    listeners2 = /* @__PURE__ */ new Map();
    __name(_mount, "_mount");
    mounted_components = /* @__PURE__ */ new WeakMap();
    __name(unmount, "unmount");
    __name(asClassComponent$1, "asClassComponent$1");
    Svelte4Component = class {
      static {
        __name(this, "Svelte4Component");
      }
      /** @type {any} */
      #events;
      /** @type {Record<string, any>} */
      #instance;
      /**
       * @param {ComponentConstructorOptions & {
       *  component: any;
       * }} options
       */
      constructor(options2) {
        var sources = /* @__PURE__ */ new Map();
        var add_source = /* @__PURE__ */ __name((key2, value) => {
          var s3 = /* @__PURE__ */ mutable_source(value, false, false);
          sources.set(key2, s3);
          return s3;
        }, "add_source");
        const props = new Proxy(
          { ...options2.props || {}, $$events: {} },
          {
            get(target, prop) {
              return get(sources.get(prop) ?? add_source(prop, Reflect.get(target, prop)));
            },
            has(target, prop) {
              if (prop === LEGACY_PROPS) return true;
              get(sources.get(prop) ?? add_source(prop, Reflect.get(target, prop)));
              return Reflect.has(target, prop);
            },
            set(target, prop, value) {
              set(sources.get(prop) ?? add_source(prop, value), value);
              return Reflect.set(target, prop, value);
            }
          }
        );
        this.#instance = (options2.hydrate ? hydrate : mount)(options2.component, {
          target: options2.target,
          anchor: options2.anchor,
          props,
          context: options2.context,
          intro: options2.intro ?? false,
          recover: options2.recover,
          transformError: options2.transformError
        });
        if (!options2?.props?.$$host || options2.sync === false) {
          flushSync();
        }
        this.#events = props.$$events;
        for (const key2 of Object.keys(this.#instance)) {
          if (key2 === "$set" || key2 === "$destroy" || key2 === "$on") continue;
          define_property(this, key2, {
            get() {
              return this.#instance[key2];
            },
            /** @param {any} value */
            set(value) {
              this.#instance[key2] = value;
            },
            enumerable: true
          });
        }
        this.#instance.$set = /** @param {Record<string, any>} next */
        (next2) => {
          Object.assign(props, next2);
        };
        this.#instance.$destroy = () => {
          unmount(this.#instance);
        };
      }
      /** @param {Record<string, any>} props */
      $set(props) {
        this.#instance.$set(props);
      }
      /**
       * @param {string} event
       * @param {(...args: any[]) => any} callback
       * @returns {any}
       */
      $on(event, callback) {
        this.#events[event] = this.#events[event] || [];
        const cb = /* @__PURE__ */ __name((...args) => callback.call(this, ...args), "cb");
        this.#events[event].push(cb);
        return () => {
          this.#events[event] = this.#events[event].filter(
            /** @param {any} fn */
            (fn) => fn !== cb
          );
        };
      }
      $destroy() {
        this.#instance.$destroy();
      }
    };
    __name(asClassComponent, "asClassComponent");
    __name(Root, "Root");
    root = asClassComponent(Root);
  }
});

// ../output/server/chunks/exports.js
function resolve(base2, path) {
  if (path[0] === "/" && path[1] === "/") return path;
  let url = new URL(base2, internal);
  url = new URL(path, url);
  return url.protocol === internal.protocol ? url.pathname + url.search + url.hash : url.href;
}
function normalize_path(path, trailing_slash) {
  if (path === "/" || trailing_slash === "ignore") return path;
  if (trailing_slash === "never") {
    return path.endsWith("/") ? path.slice(0, -1) : path;
  } else if (trailing_slash === "always" && !path.endsWith("/")) {
    return path + "/";
  }
  return path;
}
function decode_pathname(pathname) {
  return pathname.split("%25").map(decodeURI).join("%25");
}
function decode_params(params) {
  for (const key2 in params) {
    params[key2] = decodeURIComponent(params[key2]);
  }
  return params;
}
function make_trackable(url, callback, search_params_callback, allow_hash = false) {
  const tracked = new URL(url);
  Object.defineProperty(tracked, "searchParams", {
    value: new Proxy(tracked.searchParams, {
      get(obj, key2) {
        if (key2 === "get" || key2 === "getAll" || key2 === "has") {
          return (param, ...rest) => {
            search_params_callback(param);
            return obj[key2](param, ...rest);
          };
        }
        callback();
        const value = Reflect.get(obj, key2);
        return typeof value === "function" ? value.bind(obj) : value;
      }
    }),
    enumerable: true,
    configurable: true
  });
  const tracked_url_properties = ["href", "pathname", "search", "toString", "toJSON"];
  if (allow_hash) tracked_url_properties.push("hash");
  for (const property of tracked_url_properties) {
    Object.defineProperty(tracked, property, {
      get() {
        callback();
        return url[property];
      },
      enumerable: true,
      configurable: true
    });
  }
  {
    tracked[/* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom")] = (_depth, opts, inspect) => {
      return inspect(url, opts);
    };
    tracked.searchParams[/* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom")] = (_depth, opts, inspect) => {
      return inspect(url.searchParams, opts);
    };
  }
  if (!allow_hash) {
    disable_hash(tracked);
  }
  return tracked;
}
function disable_hash(url) {
  allow_nodejs_console_log(url);
  Object.defineProperty(url, "hash", {
    get() {
      throw new Error(
        "Cannot access event.url.hash. Consider using `page.url.hash` inside a component instead"
      );
    }
  });
}
function disable_search(url) {
  allow_nodejs_console_log(url);
  for (const property of ["search", "searchParams"]) {
    Object.defineProperty(url, property, {
      get() {
        throw new Error(`Cannot access url.${property} on a page with prerendering enabled`);
      }
    });
  }
}
function allow_nodejs_console_log(url) {
  {
    url[/* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom")] = (_depth, opts, inspect) => {
      return inspect(new URL(url), opts);
    };
  }
}
function validator(expected) {
  function validate(module, file) {
    if (!module) return;
    for (const key2 in module) {
      if (key2[0] === "_" || expected.has(key2)) continue;
      const values = [...expected.values()];
      const hint = hint_for_supported_files(key2, file?.slice(file.lastIndexOf("."))) ?? `valid exports are ${values.join(", ")}, or anything with a '_' prefix`;
      throw new Error(`Invalid export '${key2}'${file ? ` in ${file}` : ""} (${hint})`);
    }
  }
  __name(validate, "validate");
  return validate;
}
function hint_for_supported_files(key2, ext = ".js") {
  const supported_files = [];
  if (valid_layout_exports.has(key2)) {
    supported_files.push(`+layout${ext}`);
  }
  if (valid_page_exports.has(key2)) {
    supported_files.push(`+page${ext}`);
  }
  if (valid_layout_server_exports.has(key2)) {
    supported_files.push(`+layout.server${ext}`);
  }
  if (valid_page_server_exports.has(key2)) {
    supported_files.push(`+page.server${ext}`);
  }
  if (valid_server_exports.has(key2)) {
    supported_files.push(`+server${ext}`);
  }
  if (supported_files.length > 0) {
    return `'${key2}' is a valid export in ${supported_files.slice(0, -1).join(", ")}${supported_files.length > 1 ? " or " : ""}${supported_files.at(-1)}`;
  }
}
var internal, valid_layout_exports, valid_page_exports, valid_layout_server_exports, valid_page_server_exports, valid_server_exports, validate_layout_exports, validate_page_exports, validate_layout_server_exports, validate_page_server_exports, validate_server_exports;
var init_exports2 = __esm({
  "../output/server/chunks/exports.js"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    internal = new URL("sveltekit-internal://");
    __name(resolve, "resolve");
    __name(normalize_path, "normalize_path");
    __name(decode_pathname, "decode_pathname");
    __name(decode_params, "decode_params");
    __name(make_trackable, "make_trackable");
    __name(disable_hash, "disable_hash");
    __name(disable_search, "disable_search");
    __name(allow_nodejs_console_log, "allow_nodejs_console_log");
    __name(validator, "validator");
    __name(hint_for_supported_files, "hint_for_supported_files");
    valid_layout_exports = /* @__PURE__ */ new Set([
      "load",
      "prerender",
      "csr",
      "ssr",
      "trailingSlash",
      "config"
    ]);
    valid_page_exports = /* @__PURE__ */ new Set([...valid_layout_exports, "entries"]);
    valid_layout_server_exports = /* @__PURE__ */ new Set([...valid_layout_exports]);
    valid_page_server_exports = /* @__PURE__ */ new Set([...valid_layout_server_exports, "actions", "entries"]);
    valid_server_exports = /* @__PURE__ */ new Set([
      "GET",
      "POST",
      "PATCH",
      "PUT",
      "DELETE",
      "OPTIONS",
      "HEAD",
      "fallback",
      "prerender",
      "trailingSlash",
      "config",
      "entries"
    ]);
    validate_layout_exports = validator(valid_layout_exports);
    validate_page_exports = validator(valid_page_exports);
    validate_layout_server_exports = validator(valid_layout_server_exports);
    validate_page_server_exports = validator(valid_page_server_exports);
    validate_server_exports = validator(valid_server_exports);
  }
});

// ../output/server/chunks/db.js
function encodeText(value) {
  return new TextEncoder().encode(value);
}
function timingSafeEqual(a, b) {
  const aBytes = encodeText(a);
  const bBytes = encodeText(b);
  const length = Math.max(aBytes.length, bBytes.length);
  let diff = aBytes.length ^ bBytes.length;
  for (let i = 0; i < length; i++) {
    diff |= (aBytes[i] ?? 0) ^ (bBytes[i] ?? 0);
  }
  return diff === 0;
}
function getSessionCookie(cookieHeader) {
  if (!cookieHeader) return void 0;
  for (const part of cookieHeader.split(";")) {
    const [name, ...rest] = part.trim().split("=");
    if (name === SESSION_COOKIE_NAME) {
      return decodeURIComponent(rest.join("="));
    }
  }
  return void 0;
}
function decodeBase64(value) {
  const binary = atob(value);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}
function encodeBase64FromBytes(bytes) {
  let binary = "";
  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }
  return btoa(binary);
}
async function derive(password, salt, iterations) {
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    "PBKDF2",
    false,
    ["deriveBits"]
  );
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", salt, iterations, hash: "SHA-256" },
    keyMaterial,
    KEY_LENGTH_BITS
  );
  return encodeBase64FromBytes(new Uint8Array(bits));
}
async function verifyPassword(password, storedHash) {
  if (!storedHash) return false;
  const parts = storedHash.split("$");
  if (parts.length !== 4 || parts[0] !== "pbkdf2") return false;
  const iterations = Number(parts[1]);
  if (!Number.isInteger(iterations) || iterations <= 0) return false;
  let salt;
  try {
    salt = decodeBase64(parts[2]);
  } catch {
    return false;
  }
  const derived2 = await derive(password, salt, iterations);
  return timingSafeEqual(derived2, parts[3]);
}
async function getOwner(db) {
  const result = await db.prepare("SELECT id, username, password_hash, created_at FROM users WHERE id = ?1").bind(OWNER_ID).first();
  return result ?? null;
}
async function verifyOwnerPassword(db, password) {
  const owner = await getOwner(db);
  if (!owner) return false;
  return verifyPassword(password, owner.password_hash);
}
async function createSession(db, ttlSeconds) {
  const id = crypto.randomUUID();
  const now = Math.floor(Date.now() / 1e3);
  const expiresAt = now + ttlSeconds;
  await db.prepare(
    "INSERT INTO sessions (id, user_id, created_at, expires_at) VALUES (?1, ?2, ?3, ?4)"
  ).bind(id, OWNER_ID, now, expiresAt).run();
  return id;
}
async function isSessionValid(db, sessionId) {
  const now = Math.floor(Date.now() / 1e3);
  const session = await db.prepare("SELECT id, user_id, created_at, expires_at FROM sessions WHERE id = ?1").bind(sessionId).first();
  if (!session) return false;
  if (session.expires_at <= now) {
    await db.prepare("DELETE FROM sessions WHERE id = ?1").bind(sessionId).run();
    return false;
  }
  return true;
}
async function deleteSession(db, sessionId) {
  await db.prepare("DELETE FROM sessions WHERE id = ?1").bind(sessionId).run();
}
async function listEvents(db) {
  const result = await db.prepare(
    "SELECT id, slug, name, event_date, location, description, details, link, artist_id, created_at FROM events ORDER BY (event_date IS NULL), event_date DESC, id DESC"
  ).all();
  return result.results;
}
async function getEvent(db, id) {
  const row = await db.prepare(
    "SELECT id, slug, name, event_date, location, description, details, link, artist_id, created_at FROM events WHERE id = ?1"
  ).bind(id).first();
  return row ?? null;
}
async function createEvent(db, input) {
  const result = await db.prepare(
    "INSERT INTO events (slug, name, event_date, location, description, details, link, artist_id) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8) RETURNING id, slug, name, event_date, location, description, details, link, artist_id, created_at"
  ).bind(
    input.slug,
    input.name,
    input.eventDate ?? null,
    input.location ?? null,
    input.description ?? null,
    input.details ?? null,
    input.link ?? null,
    input.artistId ?? null
  ).first();
  if (!result) throw new Error("Could not create event.");
  return result;
}
async function updateEvent(db, id, input) {
  const result = await db.prepare(
    "UPDATE events SET slug = ?1, name = ?2, event_date = ?3, location = ?4, description = ?5, details = ?6, link = ?7, artist_id = ?8 WHERE id = ?9 RETURNING id, slug, name, event_date, location, description, details, link, artist_id, created_at"
  ).bind(
    input.slug,
    input.name,
    input.eventDate ?? null,
    input.location ?? null,
    input.description ?? null,
    input.details ?? null,
    input.link ?? null,
    input.artistId ?? null,
    id
  ).first();
  return result ?? null;
}
async function listArtists(db) {
  const result = await db.prepare(
    "SELECT artists.id, artists.name, artists.years, artists.details, artists.created_at, (SELECT MAX(events.event_date) FROM events WHERE events.artist_id = artists.id) AS latest_event_date FROM artists ORDER BY (latest_event_date IS NULL), latest_event_date DESC, artists.id DESC"
  ).all();
  return result.results;
}
async function getArtist(db, id) {
  const row = await db.prepare("SELECT id, name, years, details, created_at FROM artists WHERE id = ?1").bind(id).first();
  return row ?? null;
}
async function updateArtist(db, id, input) {
  const result = await db.prepare(
    "UPDATE artists SET name = ?1, years = ?2 WHERE id = ?3 RETURNING id, name, years, details, created_at"
  ).bind(input.name, input.years ?? null, id).first();
  return result ?? null;
}
async function createArtist(db, input) {
  const result = await db.prepare(
    "INSERT INTO artists (name, years) VALUES (?1, ?2) RETURNING id, name, years, details, created_at"
  ).bind(input.name, input.years ?? null).first();
  if (!result) throw new Error("Could not create artist.");
  return result;
}
async function updateArtistDetails(db, id, details) {
  const result = await db.prepare(
    "UPDATE artists SET details = ?1 WHERE id = ?2 RETURNING id, name, years, details, created_at"
  ).bind(details, id).first();
  return result ?? null;
}
async function deleteArtist(db, id) {
  await db.prepare("DELETE FROM artists WHERE id = ?1").bind(id).run();
}
async function listArtistLinks(db, artistId) {
  const result = await db.prepare(
    "SELECT id, artist_id, label, url, sort_order, created_at FROM artist_links WHERE artist_id = ?1 ORDER BY sort_order, id"
  ).bind(artistId).all();
  return result.results;
}
async function getArtistLink(db, id) {
  const row = await db.prepare(
    "SELECT id, artist_id, label, url, sort_order, created_at FROM artist_links WHERE id = ?1"
  ).bind(id).first();
  return row ?? null;
}
async function addArtistLink(db, input) {
  const result = await db.prepare(
    "INSERT INTO artist_links (artist_id, label, url, sort_order) VALUES (?1, ?2, ?3, ?4) RETURNING id, artist_id, label, url, sort_order, created_at"
  ).bind(input.artistId, input.label, input.url, input.sortOrder ?? 0).first();
  if (!result) throw new Error("Could not add artist link.");
  return result;
}
async function removeArtistLink(db, id) {
  const row = await getArtistLink(db, id);
  if (!row) return null;
  await db.prepare("DELETE FROM artist_links WHERE id = ?1").bind(id).run();
  return row;
}
async function deleteEvent(db, id) {
  await db.prepare("DELETE FROM events WHERE id = ?1").bind(id).run();
}
async function addEventImage(db, input) {
  const result = await db.prepare(
    "INSERT INTO event_images (event_id, r2_key, caption, content_type, sort_order) VALUES (?1, ?2, ?3, ?4, ?5) RETURNING id, event_id, r2_key, caption, content_type, sort_order, created_at"
  ).bind(
    input.eventId,
    input.r2Key,
    input.caption ?? null,
    input.contentType,
    input.sortOrder ?? 0
  ).first();
  if (!result) throw new Error("Could not add image.");
  return result;
}
async function listEventImages(db, eventId) {
  const result = await db.prepare(
    "SELECT id, event_id, r2_key, caption, content_type, sort_order, created_at FROM event_images WHERE event_id = ?1 ORDER BY sort_order, id"
  ).bind(eventId).all();
  return result.results;
}
async function getEventImage(db, id) {
  const row = await db.prepare(
    "SELECT id, event_id, r2_key, caption, content_type, sort_order, created_at FROM event_images WHERE id = ?1"
  ).bind(id).first();
  return row ?? null;
}
async function removeEventImage(db, id) {
  const row = await getEventImage(db, id);
  if (!row) return null;
  await db.prepare("DELETE FROM event_images WHERE id = ?1").bind(id).run();
  return row;
}
async function getAbout(db) {
  const row = await db.prepare("SELECT id, about_me, what_i_can_do, updated_at FROM about WHERE id = ?1").bind(ABOUT_ID).first();
  return row ?? null;
}
async function updateAbout(db, input) {
  const columns = ["id"];
  const values = [ABOUT_ID];
  const updates = ["updated_at = unixepoch()"];
  if (input.aboutMe !== void 0) {
    columns.push("about_me");
    values.push(input.aboutMe);
    updates.push("about_me = excluded.about_me");
  }
  if (input.whatICanDo !== void 0) {
    columns.push("what_i_can_do");
    values.push(input.whatICanDo);
    updates.push("what_i_can_do = excluded.what_i_can_do");
  }
  const placeholders = columns.map((_, i) => `?${i + 1}`).join(", ");
  const result = await db.prepare(
    `INSERT INTO about (${columns.join(", ")}) VALUES (${placeholders}) ON CONFLICT (id) DO UPDATE SET ${updates.join(", ")} RETURNING id, about_me, what_i_can_do, updated_at`
  ).bind(...values).first();
  if (!result) throw new Error("Could not update about content.");
  return result;
}
async function listCompanies(db) {
  const result = await db.prepare("SELECT id, name, link, created_at FROM companies ORDER BY name COLLATE NOCASE, id").all();
  return result.results;
}
async function getCompany(db, id) {
  const row = await db.prepare("SELECT id, name, link, created_at FROM companies WHERE id = ?1").bind(id).first();
  return row ?? null;
}
async function createCompany(db, input) {
  const result = await db.prepare(
    "INSERT INTO companies (name, link) VALUES (?1, ?2) RETURNING id, name, link, created_at"
  ).bind(input.name, input.link ?? null).first();
  if (!result) throw new Error("Could not create company.");
  return result;
}
async function updateCompany(db, id, input) {
  const result = await db.prepare(
    "UPDATE companies SET name = ?1, link = ?2 WHERE id = ?3 RETURNING id, name, link, created_at"
  ).bind(input.name, input.link ?? null, id).first();
  return result ?? null;
}
async function deleteCompany(db, id) {
  await db.prepare("DELETE FROM companies WHERE id = ?1").bind(id).run();
}
var SESSION_COOKIE_NAME, SESSION_TTL_SECONDS, KEY_LENGTH_BITS, OWNER_ID, ABOUT_ID;
var init_db = __esm({
  "../output/server/chunks/db.js"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    SESSION_COOKIE_NAME = "tourgroup_session";
    SESSION_TTL_SECONDS = 60 * 60 * 24 * 7;
    __name(encodeText, "encodeText");
    __name(timingSafeEqual, "timingSafeEqual");
    __name(getSessionCookie, "getSessionCookie");
    KEY_LENGTH_BITS = 256;
    __name(decodeBase64, "decodeBase64");
    __name(encodeBase64FromBytes, "encodeBase64FromBytes");
    __name(derive, "derive");
    __name(verifyPassword, "verifyPassword");
    OWNER_ID = 1;
    ABOUT_ID = 1;
    __name(getOwner, "getOwner");
    __name(verifyOwnerPassword, "verifyOwnerPassword");
    __name(createSession, "createSession");
    __name(isSessionValid, "isSessionValid");
    __name(deleteSession, "deleteSession");
    __name(listEvents, "listEvents");
    __name(getEvent, "getEvent");
    __name(createEvent, "createEvent");
    __name(updateEvent, "updateEvent");
    __name(listArtists, "listArtists");
    __name(getArtist, "getArtist");
    __name(updateArtist, "updateArtist");
    __name(createArtist, "createArtist");
    __name(updateArtistDetails, "updateArtistDetails");
    __name(deleteArtist, "deleteArtist");
    __name(listArtistLinks, "listArtistLinks");
    __name(getArtistLink, "getArtistLink");
    __name(addArtistLink, "addArtistLink");
    __name(removeArtistLink, "removeArtistLink");
    __name(deleteEvent, "deleteEvent");
    __name(addEventImage, "addEventImage");
    __name(listEventImages, "listEventImages");
    __name(getEventImage, "getEventImage");
    __name(removeEventImage, "removeEventImage");
    __name(getAbout, "getAbout");
    __name(updateAbout, "updateAbout");
    __name(listCompanies, "listCompanies");
    __name(getCompany, "getCompany");
    __name(createCompany, "createCompany");
    __name(updateCompany, "updateCompany");
    __name(deleteCompany, "deleteCompany");
  }
});

// ../output/server/chunks/owner-path.js
function normalizeOwnerPath(raw) {
  if (raw == null) return null;
  let path = raw.trim();
  if (!path) return null;
  if (!path.startsWith("/")) path = "/" + path;
  if (path.length > 1) path = path.replace(/\/+$/, "");
  return path;
}
var init_owner_path = __esm({
  "../output/server/chunks/owner-path.js"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    __name(normalizeOwnerPath, "normalizeOwnerPath");
  }
});

// ../output/server/entries/hooks.server.js
var hooks_server_exports = {};
__export(hooks_server_exports, {
  handle: () => handle
});
var GUESSABLE_OWNER_PATHS, handle;
var init_hooks_server = __esm({
  "../output/server/entries/hooks.server.js"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_db();
    init_owner_path();
    GUESSABLE_OWNER_PATHS = /* @__PURE__ */ new Set(["/owner", "/admin", "/login"]);
    handle = /* @__PURE__ */ __name(async ({ event, resolve: resolve2 }) => {
      const db = event.platform?.env?.DB;
      const token = getSessionCookie(event.request.headers.get("cookie"));
      event.locals.owner = db && token ? await isSessionValid(db, token) : false;
      event.locals.ownerPath = normalizeOwnerPath(event.platform?.env?.OWNER_PATH);
      if (event.url.pathname.startsWith("//")) {
        const collapsed = event.url.pathname.replace(/^\/+/, "/");
        return new Response(null, {
          status: 308,
          headers: { location: collapsed + event.url.search }
        });
      }
      if (GUESSABLE_OWNER_PATHS.has(event.url.pathname.toLowerCase())) {
        return new Response("Not Found", { status: 404 });
      }
      return resolve2(event);
    }, "handle");
  }
});

// ../../node_modules/cookie/index.js
var require_cookie = __commonJS({
  "../../node_modules/cookie/index.js"(exports) {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    exports.parse = parse3;
    exports.serialize = serialize2;
    var __toString = Object.prototype.toString;
    var fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
    function parse3(str, options2) {
      if (typeof str !== "string") {
        throw new TypeError("argument str must be a string");
      }
      var obj = {};
      var opt = options2 || {};
      var dec = opt.decode || decode;
      var index9 = 0;
      while (index9 < str.length) {
        var eqIdx = str.indexOf("=", index9);
        if (eqIdx === -1) {
          break;
        }
        var endIdx = str.indexOf(";", index9);
        if (endIdx === -1) {
          endIdx = str.length;
        } else if (endIdx < eqIdx) {
          index9 = str.lastIndexOf(";", eqIdx - 1) + 1;
          continue;
        }
        var key2 = str.slice(index9, eqIdx).trim();
        if (void 0 === obj[key2]) {
          var val = str.slice(eqIdx + 1, endIdx).trim();
          if (val.charCodeAt(0) === 34) {
            val = val.slice(1, -1);
          }
          obj[key2] = tryDecode(val, dec);
        }
        index9 = endIdx + 1;
      }
      return obj;
    }
    __name(parse3, "parse");
    function serialize2(name, val, options2) {
      var opt = options2 || {};
      var enc = opt.encode || encode2;
      if (typeof enc !== "function") {
        throw new TypeError("option encode is invalid");
      }
      if (!fieldContentRegExp.test(name)) {
        throw new TypeError("argument name is invalid");
      }
      var value = enc(val);
      if (value && !fieldContentRegExp.test(value)) {
        throw new TypeError("argument val is invalid");
      }
      var str = name + "=" + value;
      if (null != opt.maxAge) {
        var maxAge = opt.maxAge - 0;
        if (isNaN(maxAge) || !isFinite(maxAge)) {
          throw new TypeError("option maxAge is invalid");
        }
        str += "; Max-Age=" + Math.floor(maxAge);
      }
      if (opt.domain) {
        if (!fieldContentRegExp.test(opt.domain)) {
          throw new TypeError("option domain is invalid");
        }
        str += "; Domain=" + opt.domain;
      }
      if (opt.path) {
        if (!fieldContentRegExp.test(opt.path)) {
          throw new TypeError("option path is invalid");
        }
        str += "; Path=" + opt.path;
      }
      if (opt.expires) {
        var expires = opt.expires;
        if (!isDate(expires) || isNaN(expires.valueOf())) {
          throw new TypeError("option expires is invalid");
        }
        str += "; Expires=" + expires.toUTCString();
      }
      if (opt.httpOnly) {
        str += "; HttpOnly";
      }
      if (opt.secure) {
        str += "; Secure";
      }
      if (opt.partitioned) {
        str += "; Partitioned";
      }
      if (opt.priority) {
        var priority = typeof opt.priority === "string" ? opt.priority.toLowerCase() : opt.priority;
        switch (priority) {
          case "low":
            str += "; Priority=Low";
            break;
          case "medium":
            str += "; Priority=Medium";
            break;
          case "high":
            str += "; Priority=High";
            break;
          default:
            throw new TypeError("option priority is invalid");
        }
      }
      if (opt.sameSite) {
        var sameSite = typeof opt.sameSite === "string" ? opt.sameSite.toLowerCase() : opt.sameSite;
        switch (sameSite) {
          case true:
            str += "; SameSite=Strict";
            break;
          case "lax":
            str += "; SameSite=Lax";
            break;
          case "strict":
            str += "; SameSite=Strict";
            break;
          case "none":
            str += "; SameSite=None";
            break;
          default:
            throw new TypeError("option sameSite is invalid");
        }
      }
      return str;
    }
    __name(serialize2, "serialize");
    function decode(str) {
      return str.indexOf("%") !== -1 ? decodeURIComponent(str) : str;
    }
    __name(decode, "decode");
    function encode2(val) {
      return encodeURIComponent(val);
    }
    __name(encode2, "encode");
    function isDate(val) {
      return __toString.call(val) === "[object Date]" || val instanceof Date;
    }
    __name(isDate, "isDate");
    function tryDecode(str, decode2) {
      try {
        return decode2(str);
      } catch (e3) {
        return str;
      }
    }
    __name(tryDecode, "tryDecode");
  }
});

// ../output/server/entries/pages/_layout.server.ts.js
var layout_server_ts_exports = {};
__export(layout_server_ts_exports, {
  load: () => load
});
var load;
var init_layout_server_ts = __esm({
  "../output/server/entries/pages/_layout.server.ts.js"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    load = /* @__PURE__ */ __name(({ locals }) => {
      return { owner: locals.owner };
    }, "load");
  }
});

// ../output/server/chunks/state.svelte.js
var is_legacy, placeholder_url;
var init_state_svelte = __esm({
  "../output/server/chunks/state.svelte.js"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_clsx();
    init_chunks();
    init_exports2();
    init_server();
    init_root();
    is_legacy = noop2.toString().includes("$$") || /function \w+\(\) \{\}/.test(noop2.toString());
    placeholder_url = "a:";
    if (is_legacy) {
      ({
        data: {},
        form: null,
        error: null,
        params: {},
        route: { id: null },
        state: {},
        status: -1,
        url: new URL(placeholder_url)
      });
    }
  }
});

// ../output/server/entries/pages/_layout.svelte.js
var layout_svelte_exports = {};
__export(layout_svelte_exports, {
  default: () => _layout
});
function CookieConsent($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]-->`);
  });
}
function _layout($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { children, data } = $$props;
    let menuOpen = false;
    $$renderer2.push(`<nav><a href="/">Tour Group</a> <button type="button" class="burger"${attr("aria-label", "Open menu")}${attr("aria-expanded", menuOpen)} aria-controls="primary-menu"><span class="burger-bar"></span> <span class="burger-bar"></span> <span class="burger-bar"></span></button> <ul id="primary-menu"${attr_class("", void 0, { "open": menuOpen })}><li><a href="/">Home</a></li> <li><a href="/events">Events</a></li> <li><a href="/om">About</a></li> <li><a href="/kontakt">Contact</a></li> `);
    if (data.owner) {
      $$renderer2.push(`<!--[0--><li><form method="POST" action="/logout"><button type="submit">Log out</button></form></li>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></ul></nav> <main>`);
    children($$renderer2);
    $$renderer2.push(`<!----></main> <footer><p>\xA9 ${escape_html2((/* @__PURE__ */ new Date()).getFullYear())} Tour Group</p></footer> `);
    CookieConsent($$renderer2);
    $$renderer2.push(`<!---->`);
  });
}
var init_layout_svelte = __esm({
  "../output/server/entries/pages/_layout.svelte.js"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_chunks();
    init_clsx();
    init_internal();
    init_exports2();
    init_utils22();
    init_server();
    init_root();
    init_state_svelte();
    __name(CookieConsent, "CookieConsent");
    __name(_layout, "_layout");
  }
});

// ../output/server/nodes/0.js
var __exports = {};
__export(__exports, {
  component: () => component,
  fonts: () => fonts,
  imports: () => imports,
  index: () => index,
  server: () => layout_server_ts_exports,
  server_id: () => server_id,
  stylesheets: () => stylesheets
});
var index, component_cache, component, server_id, imports, stylesheets, fonts;
var init__ = __esm({
  "../output/server/nodes/0.js"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_layout_server_ts();
    index = 0;
    component = /* @__PURE__ */ __name(async () => component_cache ??= (await Promise.resolve().then(() => (init_layout_svelte(), layout_svelte_exports))).default, "component");
    server_id = "src/routes/+layout.server.ts";
    imports = ["_app/immutable/nodes/0.NdqFgmzF.js", "_app/immutable/chunks/Bzak7iHL.js", "_app/immutable/chunks/2HPGJ4rY.js", "_app/immutable/chunks/BghoPdkm.js", "_app/immutable/chunks/wgRYQMwV.js", "_app/immutable/chunks/BAJeVE24.js", "_app/immutable/chunks/C36gyCFG.js", "_app/immutable/chunks/DA9A0cPI.js"];
    stylesheets = ["_app/immutable/assets/0.DRZLZMud.css"];
    fonts = [];
  }
});

// ../output/server/entries/fallbacks/error.svelte.js
var error_svelte_exports = {};
__export(error_svelte_exports, {
  default: () => Error$1
});
function context3() {
  return getContext("__request__");
}
function Error$1($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    $$renderer2.push(`<h1>${escape_html2(page.status)}</h1> <p>${escape_html2(page.error?.message)}</p>`);
  });
}
var page$1, page;
var init_error_svelte = __esm({
  "../output/server/entries/fallbacks/error.svelte.js"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_chunks();
    init_clsx();
    init_state_svelte();
    init_internal();
    init_exports2();
    init_utils22();
    init_server();
    init_root();
    __name(context3, "context");
    page$1 = {
      get error() {
        return context3().page.error;
      },
      get status() {
        return context3().page.status;
      }
    };
    page = page$1;
    __name(Error$1, "Error$1");
  }
});

// ../output/server/nodes/1.js
var __exports2 = {};
__export(__exports2, {
  component: () => component2,
  fonts: () => fonts2,
  imports: () => imports2,
  index: () => index2,
  stylesheets: () => stylesheets2
});
var index2, component_cache2, component2, imports2, stylesheets2, fonts2;
var init__2 = __esm({
  "../output/server/nodes/1.js"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    index2 = 1;
    component2 = /* @__PURE__ */ __name(async () => component_cache2 ??= (await Promise.resolve().then(() => (init_error_svelte(), error_svelte_exports))).default, "component");
    imports2 = ["_app/immutable/nodes/1.DWl2DsCi.js", "_app/immutable/chunks/Bzak7iHL.js", "_app/immutable/chunks/2HPGJ4rY.js", "_app/immutable/chunks/BghoPdkm.js", "_app/immutable/chunks/DA9A0cPI.js"];
    stylesheets2 = [];
    fonts2 = [];
  }
});

// ../output/server/chunks/storage.js
function slugify(input) {
  return input.toLowerCase().trim().replace(/[æ]/g, "ae").replace(/[ø]/g, "oe").replace(/[å]/g, "aa").normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}
function sniffImageType(bytes) {
  const b = bytes;
  if (b.length >= 3 && b[0] === 255 && b[1] === 216 && b[2] === 255) return "image/jpeg";
  if (b.length >= 8 && b[0] === 137 && b[1] === 80 && b[2] === 78 && b[3] === 71 && b[4] === 13 && b[5] === 10 && b[6] === 26 && b[7] === 10)
    return "image/png";
  if (b.length >= 12 && b[0] === 82 && b[1] === 73 && b[2] === 70 && b[3] === 70 && b[8] === 87 && b[9] === 69 && b[10] === 66 && b[11] === 80)
    return "image/webp";
  if (b.length >= 6 && b[0] === 71 && b[1] === 73 && b[2] === 70 && b[3] === 56)
    return "image/gif";
  if (b.length >= 12 && b[4] === 102 && b[5] === 116 && b[6] === 121 && b[7] === 112 && b[8] === 97 && b[9] === 118 && b[10] === 105 && (b[11] === 102 || b[11] === 115))
    return "image/avif";
  return null;
}
function imageExtension(contentType) {
  return ALLOWED_IMAGE_TYPES[contentType] ?? null;
}
function buildImageKey(slug, contentType, uuid) {
  const ext = imageExtension(contentType) ?? "bin";
  return `events/${slug}/${uuid}.${ext}`;
}
function publicImageUrl(r2Key, baseUrl) {
  if (baseUrl) return `${baseUrl.replace(/\/+$/, "")}/${r2Key}`;
  return `/images/${r2Key}`;
}
function validateImage(input) {
  if (input.size <= 0) return { ok: false, error: "The file is empty." };
  if (input.size > MAX_IMAGE_BYTES) return { ok: false, error: "The file is too large (max 8 MB)." };
  const declared = input.contentType.toLowerCase();
  if (!imageExtension(declared)) return { ok: false, error: "The file type is not supported." };
  const sniffed = sniffImageType(input.head);
  if (!sniffed) return { ok: false, error: "The file is not a valid image." };
  if (sniffed !== declared) return { ok: false, error: "The file's contents do not match the file type." };
  return { ok: true, contentType: sniffed };
}
var MAX_IMAGE_BYTES, ALLOWED_IMAGE_TYPES;
var init_storage = __esm({
  "../output/server/chunks/storage.js"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    __name(slugify, "slugify");
    MAX_IMAGE_BYTES = 8 * 1024 * 1024;
    ALLOWED_IMAGE_TYPES = {
      "image/jpeg": "jpg",
      "image/png": "png",
      "image/webp": "webp",
      "image/gif": "gif",
      "image/avif": "avif"
    };
    __name(sniffImageType, "sniffImageType");
    __name(imageExtension, "imageExtension");
    __name(buildImageKey, "buildImageKey");
    __name(publicImageUrl, "publicImageUrl");
    __name(validateImage, "validateImage");
  }
});

// ../output/server/entries/pages/_page.server.ts.js
var page_server_ts_exports = {};
__export(page_server_ts_exports, {
  actions: () => actions,
  load: () => load2
});
function validateLink(link) {
  if (!link) return null;
  if (link.length > 2048) return "The link is too long.";
  let url;
  try {
    url = new URL(link);
  } catch {
    return "The link must be a valid URL (starting with http:// or https://).";
  }
  if (url.protocol !== "http:" && url.protocol !== "https:") {
    return "The link must be a valid URL (starting with http:// or https://).";
  }
  return null;
}
var load2, actions;
var init_page_server_ts = __esm({
  "../output/server/entries/pages/_page.server.ts.js"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_exports();
    init_db();
    init_storage();
    __name(validateLink, "validateLink");
    load2 = /* @__PURE__ */ __name(async ({ platform: platform2 }) => {
      const db = platform2?.env?.DB;
      if (!db) return { artists: [], companies: [] };
      const baseUrl = platform2?.env?.R2_PUBLIC_URL;
      let events = [];
      try {
        events = await listEvents(db);
      } catch (err) {
        console.error("Kunne ikke hente events:", err);
      }
      const artistNameById = /* @__PURE__ */ new Map();
      const eventsWithImages = await Promise.all(
        events.map(async (event) => {
          let images = [];
          try {
            images = await listEventImages(db, event.id);
          } catch (err) {
            console.error(`Kunne ikke hente billeder for event ${event.id}:`, err);
          }
          return {
            ...event,
            artistName: null,
            images: images.map((img) => ({
              id: img.id,
              caption: img.caption,
              url: publicImageUrl(img.r2_key, baseUrl)
            }))
          };
        })
      );
      const latestEventIdByArtist = /* @__PURE__ */ new Map();
      const eventsByArtist = /* @__PURE__ */ new Map();
      for (const event of eventsWithImages) {
        if (event.artist_id === null) continue;
        if (!latestEventIdByArtist.has(event.artist_id)) {
          latestEventIdByArtist.set(event.artist_id, event.id);
        }
        const list = eventsByArtist.get(event.artist_id) ?? [];
        list.push(event);
        eventsByArtist.set(event.artist_id, list);
      }
      let artists = [];
      try {
        artists = await listArtists(db);
      } catch (err) {
        console.error("Kunne ikke hente artists:", err);
      }
      for (const artist of artists) {
        artistNameById.set(artist.id, artist.name);
      }
      const artistsWithLinks = await Promise.all(
        artists.map(async (artist) => {
          let links = [];
          try {
            links = await listArtistLinks(db, artist.id);
          } catch (err) {
            console.error(`Kunne ikke hente links for artist ${artist.id}:`, err);
          }
          const artistEvents = (eventsByArtist.get(artist.id) ?? []).map((event) => ({
            ...event,
            artistName: artistNameById.get(event.artist_id ?? -1) ?? null
          }));
          return {
            ...artist,
            latestEventId: latestEventIdByArtist.get(artist.id) ?? null,
            links: links.map((link) => ({ id: link.id, label: link.label, url: link.url })),
            events: artistEvents
          };
        })
      );
      let companies = [];
      try {
        companies = await listCompanies(db);
      } catch (err) {
        console.error("Kunne ikke hente companies:", err);
      }
      return { artists: artistsWithLinks, companies };
    }, "load");
    actions = {
      createArtist: /* @__PURE__ */ __name(async ({ request, platform: platform2, locals }) => {
        if (!locals.owner) return fail(403, { error: "Not authorized." });
        const db = platform2?.env?.DB;
        if (!db) return fail(500, { error: "The database is not configured." });
        const data = await request.formData();
        const name = String(data.get("name") ?? "").trim();
        const years = String(data.get("years") ?? "").trim();
        if (!name) return fail(400, { error: "Name is required." });
        if (name.length > 200) return fail(400, { error: "The name is too long." });
        if (years.length > 50) return fail(400, { error: "The year is too long." });
        try {
          await createArtist(db, { name, years: years || null });
        } catch (err) {
          console.error("Kunne ikke oprette artist:", err);
          return fail(500, { error: "Could not save. Please try again later." });
        }
        return { success: true };
      }, "createArtist"),
      updateArtist: /* @__PURE__ */ __name(async ({ request, platform: platform2, locals }) => {
        if (!locals.owner) return fail(403, { error: "Not authorized." });
        const db = platform2?.env?.DB;
        if (!db) return fail(500, { error: "The database is not configured." });
        const data = await request.formData();
        const id = Number(String(data.get("id") ?? "").trim());
        if (!Number.isInteger(id)) return fail(400, { error: "Invalid entry." });
        const name = String(data.get("name") ?? "").trim();
        const years = String(data.get("years") ?? "").trim();
        if (!name) return fail(400, { error: "Name is required." });
        if (name.length > 200) return fail(400, { error: "The name is too long." });
        if (years.length > 50) return fail(400, { error: "The year is too long." });
        const existing = await getArtist(db, id);
        if (!existing) return fail(404, { error: "The entry does not exist." });
        try {
          await updateArtist(db, id, { name, years: years || null });
        } catch (err) {
          console.error("Kunne ikke opdatere artist:", err);
          return fail(500, { error: "Could not save. Please try again later." });
        }
        return { success: true };
      }, "updateArtist"),
      updateArtistDetails: /* @__PURE__ */ __name(async ({ request, platform: platform2, locals }) => {
        if (!locals.owner) return fail(403, { error: "Not authorized." });
        const db = platform2?.env?.DB;
        if (!db) return fail(500, { error: "The database is not configured." });
        const data = await request.formData();
        const id = Number(String(data.get("id") ?? "").trim());
        if (!Number.isInteger(id)) return fail(400, { error: "Invalid entry." });
        const details = String(data.get("details") ?? "").trim();
        if (details.length > 5e3) return fail(400, { error: "The text is too long." });
        const existing = await getArtist(db, id);
        if (!existing) return fail(404, { error: "The entry does not exist." });
        try {
          await updateArtistDetails(db, id, details || null);
        } catch (err) {
          console.error("Kunne ikke opdatere artist-tekst:", err);
          return fail(500, { error: "Could not save. Please try again later." });
        }
        return { success: true };
      }, "updateArtistDetails"),
      addArtistLink: /* @__PURE__ */ __name(async ({ request, platform: platform2, locals }) => {
        if (!locals.owner) return fail(403, { error: "Not authorized." });
        const db = platform2?.env?.DB;
        if (!db) return fail(500, { error: "The database is not configured." });
        const data = await request.formData();
        const id = Number(String(data.get("id") ?? "").trim());
        if (!Number.isInteger(id)) return fail(400, { error: "Invalid entry." });
        const label = String(data.get("label") ?? "").trim();
        const url = String(data.get("url") ?? "").trim();
        if (!label) return fail(400, { error: "A link text is required." });
        if (label.length > 200) return fail(400, { error: "The link text is too long." });
        const linkError = validateLink(url);
        if (!url) return fail(400, { error: "A link is required." });
        if (linkError) return fail(400, { error: linkError });
        const existing = await getArtist(db, id);
        if (!existing) return fail(404, { error: "The entry does not exist." });
        try {
          await addArtistLink(db, { artistId: id, label, url });
        } catch (err) {
          console.error("Kunne ikke tilf\xF8je artist-link:", err);
          return fail(500, { error: "Could not save. Please try again later." });
        }
        return { success: true };
      }, "addArtistLink"),
      removeArtistLink: /* @__PURE__ */ __name(async ({ request, platform: platform2, locals }) => {
        if (!locals.owner) return fail(403, { error: "Not authorized." });
        const db = platform2?.env?.DB;
        if (!db) return fail(500, { error: "The database is not configured." });
        const data = await request.formData();
        const id = Number(String(data.get("id") ?? "").trim());
        if (!Number.isInteger(id)) return fail(400, { error: "Invalid link." });
        const existing = await getArtistLink(db, id);
        if (!existing) return fail(404, { error: "The link does not exist." });
        try {
          await removeArtistLink(db, id);
        } catch (err) {
          console.error("Kunne ikke slette artist-link:", err);
          return fail(500, { error: "Could not delete. Please try again later." });
        }
        return { success: true };
      }, "removeArtistLink"),
      deleteArtist: /* @__PURE__ */ __name(async ({ request, platform: platform2, locals }) => {
        if (!locals.owner) return fail(403, { error: "Not authorized." });
        const db = platform2?.env?.DB;
        if (!db) return fail(500, { error: "The database is not configured." });
        const data = await request.formData();
        const id = Number(String(data.get("id") ?? "").trim());
        if (!Number.isInteger(id)) return fail(400, { error: "Invalid entry." });
        try {
          await deleteArtist(db, id);
        } catch (err) {
          console.error("Kunne ikke slette artist:", err);
          return fail(500, { error: "Could not delete. Please try again later." });
        }
        return { success: true };
      }, "deleteArtist"),
      createCompany: /* @__PURE__ */ __name(async ({ request, platform: platform2, locals }) => {
        if (!locals.owner) return fail(403, { error: "Not authorized." });
        const db = platform2?.env?.DB;
        if (!db) return fail(500, { error: "The database is not configured." });
        const data = await request.formData();
        const name = String(data.get("name") ?? "").trim();
        const link = String(data.get("link") ?? "").trim();
        if (!name) return fail(400, { error: "Name is required." });
        if (name.length > 200) return fail(400, { error: "The name is too long." });
        const linkError = validateLink(link);
        if (linkError) return fail(400, { error: linkError });
        try {
          await createCompany(db, { name, link: link || null });
        } catch (err) {
          console.error("Kunne ikke oprette company:", err);
          return fail(500, { error: "Could not save. Please try again later." });
        }
        return { success: true };
      }, "createCompany"),
      updateCompany: /* @__PURE__ */ __name(async ({ request, platform: platform2, locals }) => {
        if (!locals.owner) return fail(403, { error: "Not authorized." });
        const db = platform2?.env?.DB;
        if (!db) return fail(500, { error: "The database is not configured." });
        const data = await request.formData();
        const id = Number(String(data.get("id") ?? "").trim());
        if (!Number.isInteger(id)) return fail(400, { error: "Invalid entry." });
        const name = String(data.get("name") ?? "").trim();
        const link = String(data.get("link") ?? "").trim();
        if (!name) return fail(400, { error: "Name is required." });
        if (name.length > 200) return fail(400, { error: "The name is too long." });
        const linkError = validateLink(link);
        if (linkError) return fail(400, { error: linkError });
        const existing = await getCompany(db, id);
        if (!existing) return fail(404, { error: "The entry does not exist." });
        try {
          await updateCompany(db, id, { name, link: link || null });
        } catch (err) {
          console.error("Kunne ikke opdatere company:", err);
          return fail(500, { error: "Could not save. Please try again later." });
        }
        return { success: true };
      }, "updateCompany"),
      deleteCompany: /* @__PURE__ */ __name(async ({ request, platform: platform2, locals }) => {
        if (!locals.owner) return fail(403, { error: "Not authorized." });
        const db = platform2?.env?.DB;
        if (!db) return fail(500, { error: "The database is not configured." });
        const data = await request.formData();
        const id = Number(String(data.get("id") ?? "").trim());
        if (!Number.isInteger(id)) return fail(400, { error: "Invalid entry." });
        try {
          await deleteCompany(db, id);
        } catch (err) {
          console.error("Kunne ikke slette company:", err);
          return fail(500, { error: "Could not delete. Please try again later." });
        }
        return { success: true };
      }, "deleteCompany")
    };
  }
});

// ../output/server/chunks/EventCard.svelte_svelte_type_style_lang.js
function EventForm($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      error: error5,
      action = "?/createEvent",
      fields = [
        "name",
        "description",
        "eventDate",
        "location",
        "link",
        "file"
      ],
      submitLabel = "Create event",
      pendingLabel = "Creating\u2026",
      artists = [],
      initial: initial2 = {},
      id = null,
      requireImage = true,
      onSuccess
    } = $$props;
    const show = /* @__PURE__ */ __name((field) => fields.includes(field), "show");
    let compressing = false;
    $$renderer2.push(`<form method="POST"${attr("action", action)} enctype="multipart/form-data" class="form svelte-8022he">`);
    if (id !== null) {
      $$renderer2.push(`<!--[0--><input type="hidden" name="id"${attr("value", id)} class="svelte-8022he"/>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (show("name")) {
      $$renderer2.push(`<!--[0--><label for="name" class="svelte-8022he">Name</label> <input id="name" name="name" type="text"${attr("value", initial2.name ?? "")} required="" maxlength="200" class="svelte-8022he"/>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (show("years")) {
      $$renderer2.push(`<!--[0--><label for="years" class="svelte-8022he">Year (e.g. 22-24)</label> <input id="years" name="years" type="text"${attr("value", initial2.years ?? "")} maxlength="50" placeholder="22-24" class="svelte-8022he"/>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (show("artist")) {
      $$renderer2.push(`<!--[0--><label for="artistId" class="svelte-8022he">Artist</label> <select id="artistId" name="artistId" class="svelte-8022he">`);
      $$renderer2.option({ value: "" }, ($$renderer3) => {
        $$renderer3.push(`None`);
      });
      $$renderer2.push(`<!--[-->`);
      const each_array = ensure_array_like(artists);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let option = each_array[$$index];
        $$renderer2.option({ value: option.id, selected: initial2.artistId === option.id }, ($$renderer3) => {
          $$renderer3.push(`${escape_html2(option.name)}`);
        });
      }
      $$renderer2.push(`<!--]--></select>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (show("description")) {
      $$renderer2.push(`<!--[0--><label for="description" class="svelte-8022he">Description</label> <textarea id="description" name="description" rows="3" class="svelte-8022he">`);
      const $$body = escape_html2(initial2.description ?? "");
      if ($$body) {
        $$renderer2.push(`${$$body}`);
      }
      $$renderer2.push(`</textarea>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (show("details")) {
      $$renderer2.push(`<!--[0--><label for="details" class="svelte-8022he">Details (shown inside the event modal)</label> <textarea id="details" name="details" rows="5" class="svelte-8022he">`);
      const $$body_1 = escape_html2(initial2.details ?? "");
      if ($$body_1) {
        $$renderer2.push(`${$$body_1}`);
      }
      $$renderer2.push(`</textarea>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (show("eventDate")) {
      $$renderer2.push(`<!--[0--><label for="eventDate" class="svelte-8022he">Date</label> <input id="eventDate" name="eventDate" type="date"${attr("value", initial2.eventDate ?? "")} class="svelte-8022he"/>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (show("location")) {
      $$renderer2.push(`<!--[0--><label for="location" class="svelte-8022he">Location</label> <input id="location" name="location" type="text"${attr("value", initial2.location ?? "")} maxlength="200" class="svelte-8022he"/>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (show("link")) {
      $$renderer2.push(`<!--[0--><label for="link" class="svelte-8022he">Link (optional)</label> <input id="link" name="link" type="url"${attr("value", initial2.link ?? "")} maxlength="2048" placeholder="https://\u2026" class="svelte-8022he"/>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (show("file")) {
      $$renderer2.push(`<!--[0--><label for="file" class="svelte-8022he">Image (JPEG, PNG, WebP, GIF or AVIF)</label> <input id="file" name="file" type="file" accept="image/*"${attr("required", requireImage, true)} class="svelte-8022he"/> `);
      {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]--> `);
      {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]-->`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (error5) {
      $$renderer2.push(`<!--[0--><p class="error svelte-8022he" role="alert">${escape_html2(error5)}</p>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> <button type="submit"${attr("disabled", compressing, true)} class="svelte-8022he">${escape_html2(submitLabel)}</button></form>`);
  });
}
var init_EventCard_svelte_svelte_type_style_lang = __esm({
  "../output/server/chunks/EventCard.svelte_svelte_type_style_lang.js"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_chunks();
    init_internal();
    init_exports2();
    init_utils22();
    init_server();
    init_root();
    init_state_svelte();
    __name(EventForm, "EventForm");
  }
});

// ../output/server/entries/pages/_page.svelte.js
var page_svelte_exports = {};
__export(page_svelte_exports, {
  default: () => _page
});
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { data, form } = $$props;
    let editingId = null;
    let editingCompanyId = null;
    head("1uha8ag", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Tour Group</title>`);
      });
      $$renderer3.push(`<meta name="description" content="Tour Group \u2014 lighting design and production for events."/>`);
    });
    $$renderer2.push(`<section class="hero"><div class="label">Lighting for events</div> <h1>Tour Group</h1> <p class="lead svelte-1uha8ag">Coming soon</p></section> <section><div class="label">01 \u2014 Artists</div> <ul class="work svelte-1uha8ag"><!--[-->`);
    const each_array = ensure_array_like(data.artists);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let work = each_array[$$index];
      $$renderer2.push(`<li class="work-row svelte-1uha8ag">`);
      if (work.latestEventId) {
        $$renderer2.push(`<!--[0--><a class="work-link svelte-1uha8ag"${attr("href", `/events#event-${stringify3(work.latestEventId)}`)}><span class="work-name svelte-1uha8ag">${escape_html2(work.name)}</span> `);
        if (work.years) {
          $$renderer2.push(`<!--[0--><span class="work-years svelte-1uha8ag">${escape_html2(work.years)}</span>`);
        } else {
          $$renderer2.push("<!--[-1-->");
        }
        $$renderer2.push(`<!--]--></a>`);
      } else {
        $$renderer2.push(`<!--[-1--><div class="work-link svelte-1uha8ag"><span class="work-name svelte-1uha8ag">${escape_html2(work.name)}</span> `);
        if (work.years) {
          $$renderer2.push(`<!--[0--><span class="work-years svelte-1uha8ag">${escape_html2(work.years)}</span>`);
        } else {
          $$renderer2.push("<!--[-1-->");
        }
        $$renderer2.push(`<!--]--></div>`);
      }
      $$renderer2.push(`<!--]--> `);
      if (data.owner) {
        $$renderer2.push(`<!--[0--><button type="button" class="icon-btn edit svelte-1uha8ag"${attr("aria-label", `Edit ${stringify3(work.name)}`)}${attr("aria-expanded", editingId === work.id)} title="Edit"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" class="svelte-1uha8ag"><path d="M4 20h4L19 9a2.12 2.12 0 0 0-3-3L5 17v3zM14 6l3 3" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"></path></svg></button> <form method="POST" action="?/deleteArtist"><input type="hidden" name="id"${attr("value", work.id)}/> <button type="submit" class="icon-btn delete svelte-1uha8ag"${attr("aria-label", `Delete ${stringify3(work.name)}`)} title="Delete"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" class="svelte-1uha8ag"><path d="M3 6h18M8 6V4h8v2m-9 0v14a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V6M10 11v6M14 11v6" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"></path></svg></button></form>`);
      } else {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]--></li> <li class="work-foot svelte-1uha8ag">`);
      if (work.latestEventId) {
        $$renderer2.push(`<!--[0--><a class="work-latest svelte-1uha8ag"${attr("href", `/events#event-${stringify3(work.latestEventId)}`)}>latest event <span class="work-arrow svelte-1uha8ag" aria-hidden="true">\u2192</span></a>`);
      } else {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]--> <button type="button" class="more svelte-1uha8ag" aria-haspopup="dialog"${attr("aria-label", `More about ${stringify3(work.name)}`)}>More <span class="more-arrow svelte-1uha8ag" aria-hidden="true">\u2192</span></button></li> `);
      if (data.owner && editingId === work.id) {
        $$renderer2.push(`<!--[0--><li class="edit-row svelte-1uha8ag"><form method="POST" action="?/updateArtist" class="edit-form svelte-1uha8ag"><input type="hidden" name="id"${attr("value", work.id)} class="svelte-1uha8ag"/> <label${attr("for", `edit-name-${stringify3(work.id)}`)} class="svelte-1uha8ag">Name</label> <input${attr("id", `edit-name-${stringify3(work.id)}`)} name="name" type="text"${attr("value", work.name)} required="" maxlength="200" class="svelte-1uha8ag"/> <label${attr("for", `edit-years-${stringify3(work.id)}`)} class="svelte-1uha8ag">Year (e.g. 22-24)</label> <input${attr("id", `edit-years-${stringify3(work.id)}`)} name="years" type="text"${attr("value", work.years ?? "")} maxlength="50" placeholder="22-24" class="svelte-1uha8ag"/> <div class="edit-actions svelte-1uha8ag"><button type="button" class="cancel svelte-1uha8ag">Cancel</button> <button type="submit" class="save svelte-1uha8ag">Save</button></div></form></li>`);
      } else {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]--></ul></section> `);
    if (data.owner) {
      $$renderer2.push(`<!--[0--><section><div class="label">Create artist</div> `);
      EventForm($$renderer2, {
        action: "?/createArtist",
        fields: ["name", "years"],
        submitLabel: "Add",
        pendingLabel: "Adding\u2026",
        error: form?.error
      });
      $$renderer2.push(`<!----></section>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> <section><div class="label">02 \u2014 Working with companies</div> <ul class="partners svelte-1uha8ag"><!--[-->`);
    const each_array_1 = ensure_array_like(data.companies);
    for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
      let company = each_array_1[$$index_1];
      $$renderer2.push(`<li class="partner-row svelte-1uha8ag">`);
      if (company.link) {
        $$renderer2.push(`<!--[0--><a class="partner-link svelte-1uha8ag"${attr("href", company.link)} target="_blank" rel="noopener noreferrer"><span class="partner-name svelte-1uha8ag">${escape_html2(company.name)}</span> <span class="partner-arrow svelte-1uha8ag" aria-hidden="true">\u2197</span></a>`);
      } else {
        $$renderer2.push(`<!--[-1--><div class="partner-link svelte-1uha8ag"><span class="partner-name svelte-1uha8ag">${escape_html2(company.name)}</span></div>`);
      }
      $$renderer2.push(`<!--]--> `);
      if (data.owner) {
        $$renderer2.push(`<!--[0--><button type="button" class="icon-btn edit svelte-1uha8ag"${attr("aria-label", `Edit ${stringify3(company.name)}`)}${attr("aria-expanded", editingCompanyId === company.id)} title="Edit"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" class="svelte-1uha8ag"><path d="M4 20h4L19 9a2.12 2.12 0 0 0-3-3L5 17v3zM14 6l3 3" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"></path></svg></button> <form method="POST" action="?/deleteCompany"><input type="hidden" name="id"${attr("value", company.id)}/> <button type="submit" class="icon-btn delete svelte-1uha8ag"${attr("aria-label", `Delete ${stringify3(company.name)}`)} title="Delete"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" class="svelte-1uha8ag"><path d="M3 6h18M8 6V4h8v2m-9 0v14a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V6M10 11v6M14 11v6" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"></path></svg></button></form>`);
      } else {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]--></li> `);
      if (data.owner && editingCompanyId === company.id) {
        $$renderer2.push(`<!--[0--><li class="edit-row svelte-1uha8ag"><form method="POST" action="?/updateCompany" class="edit-form svelte-1uha8ag"><input type="hidden" name="id"${attr("value", company.id)} class="svelte-1uha8ag"/> <label${attr("for", `edit-company-name-${stringify3(company.id)}`)} class="svelte-1uha8ag">Name</label> <input${attr("id", `edit-company-name-${stringify3(company.id)}`)} name="name" type="text"${attr("value", company.name)} required="" maxlength="200" class="svelte-1uha8ag"/> <label${attr("for", `edit-company-link-${stringify3(company.id)}`)} class="svelte-1uha8ag">Link (optional)</label> <input${attr("id", `edit-company-link-${stringify3(company.id)}`)} name="link" type="url"${attr("value", company.link ?? "")} maxlength="2048" placeholder="https://\u2026" class="svelte-1uha8ag"/> <div class="edit-actions svelte-1uha8ag"><button type="button" class="cancel svelte-1uha8ag">Cancel</button> <button type="submit" class="save svelte-1uha8ag">Save</button></div></form></li>`);
      } else {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]--></ul></section> `);
    if (data.owner) {
      $$renderer2.push(`<!--[0--><section><div class="label">Create company</div> <form method="POST" action="?/createCompany" class="edit-form svelte-1uha8ag"><label for="company-name" class="svelte-1uha8ag">Name</label> <input id="company-name" name="name" type="text" required="" maxlength="200" class="svelte-1uha8ag"/> <label for="company-link" class="svelte-1uha8ag">Link (optional)</label> <input id="company-link" name="link" type="url" maxlength="2048" placeholder="https://\u2026" class="svelte-1uha8ag"/> `);
      if (form?.error) {
        $$renderer2.push(`<!--[0--><p class="form-error svelte-1uha8ag" role="alert">${escape_html2(form.error)}</p>`);
      } else {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]--> <div class="edit-actions svelte-1uha8ag"><button type="submit" class="save svelte-1uha8ag">Add</button></div></form></section>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> `);
    {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]-->`);
  });
}
var init_page_svelte = __esm({
  "../output/server/entries/pages/_page.svelte.js"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_chunks();
    init_internal();
    init_exports2();
    init_utils22();
    init_server();
    init_root();
    init_state_svelte();
    init_EventCard_svelte_svelte_type_style_lang();
    __name(_page, "_page");
  }
});

// ../output/server/nodes/2.js
var __exports3 = {};
__export(__exports3, {
  component: () => component3,
  fonts: () => fonts3,
  imports: () => imports3,
  index: () => index3,
  server: () => page_server_ts_exports,
  server_id: () => server_id2,
  stylesheets: () => stylesheets3
});
var index3, component_cache3, component3, server_id2, imports3, stylesheets3, fonts3;
var init__3 = __esm({
  "../output/server/nodes/2.js"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_page_server_ts();
    index3 = 2;
    component3 = /* @__PURE__ */ __name(async () => component_cache3 ??= (await Promise.resolve().then(() => (init_page_svelte(), page_svelte_exports))).default, "component");
    server_id2 = "src/routes/+page.server.ts";
    imports3 = ["_app/immutable/nodes/2.BVqtnW06.js", "_app/immutable/chunks/Bzak7iHL.js", "_app/immutable/chunks/2HPGJ4rY.js", "_app/immutable/chunks/BghoPdkm.js", "_app/immutable/chunks/wgRYQMwV.js", "_app/immutable/chunks/Bc9eTX54.js", "_app/immutable/chunks/WEMBPxGx.js", "_app/immutable/chunks/DA9A0cPI.js", "_app/immutable/chunks/C36gyCFG.js", "_app/immutable/chunks/BAJeVE24.js", "_app/immutable/chunks/V53e5fvJ.js", "_app/immutable/chunks/D9QACNu6.js"];
    stylesheets3 = ["_app/immutable/assets/EventCard.CL_Y-Ym8.css", "_app/immutable/assets/2.COrnY8g2.css"];
    fonts3 = [];
  }
});

// ../output/server/entries/pages/events/_page.server.ts.js
var page_server_ts_exports2 = {};
__export(page_server_ts_exports2, {
  actions: () => actions2,
  load: () => load3
});
async function readImageHead(file, length = 16) {
  const buffer2 = await file.slice(0, length).arrayBuffer();
  return new Uint8Array(buffer2);
}
async function resolveArtistId(db, artistIdRaw) {
  if (!artistIdRaw) return { value: null };
  const parsed = Number(artistIdRaw);
  if (!Number.isInteger(parsed)) return { error: "Invalid artist." };
  const artist = await getArtist(db, parsed);
  if (!artist) return { error: "The selected artist does not exist." };
  return { value: parsed };
}
function validateLink2(link) {
  if (!link) return null;
  if (link.length > 2048) return "The link is too long.";
  let url;
  try {
    url = new URL(link);
  } catch {
    return "The link must be a valid URL (starting with http:// or https://).";
  }
  if (url.protocol !== "http:" && url.protocol !== "https:") {
    return "The link must be a valid URL (starting with http:// or https://).";
  }
  return null;
}
var load3, actions2;
var init_page_server_ts2 = __esm({
  "../output/server/entries/pages/events/_page.server.ts.js"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_exports();
    init_db();
    init_storage();
    load3 = /* @__PURE__ */ __name(async ({ platform: platform2 }) => {
      const db = platform2?.env?.DB;
      if (!db) return { events: [], artists: [], imageBaseUrl: void 0 };
      const baseUrl = platform2?.env?.R2_PUBLIC_URL;
      let artists = [];
      try {
        artists = await listArtists(db);
      } catch (err) {
        console.error("Kunne ikke hente artists:", err);
      }
      let events;
      try {
        events = await listEvents(db);
      } catch (err) {
        console.error("Kunne ikke hente events:", err);
        return { events: [], artists, imageBaseUrl: baseUrl };
      }
      const withImages = await Promise.all(
        events.map(async (event) => {
          let images = [];
          try {
            images = await listEventImages(db, event.id);
          } catch (err) {
            console.error(`Kunne ikke hente billeder for event ${event.id}:`, err);
          }
          const artist = artists.find((a) => a.id === event.artist_id) ?? null;
          return {
            ...event,
            artistName: artist?.name ?? null,
            images: images.map((img) => ({
              id: img.id,
              caption: img.caption,
              url: publicImageUrl(img.r2_key, baseUrl)
            }))
          };
        })
      );
      return {
        events: withImages,
        artists: artists.map((a) => ({ id: a.id, name: a.name })),
        imageBaseUrl: baseUrl
      };
    }, "load");
    __name(readImageHead, "readImageHead");
    __name(resolveArtistId, "resolveArtistId");
    __name(validateLink2, "validateLink");
    actions2 = {
      createEvent: /* @__PURE__ */ __name(async ({ request, platform: platform2, locals }) => {
        if (!locals.owner) return fail(403, { error: "Not authorized." });
        const db = platform2?.env?.DB;
        const bucket = platform2?.env?.Bucket;
        if (!db) return fail(500, { error: "The database is not configured." });
        const data = await request.formData();
        const name = String(data.get("name") ?? "").trim();
        const eventDate = String(data.get("eventDate") ?? "").trim();
        const location = String(data.get("location") ?? "").trim();
        const description = String(data.get("description") ?? "").trim();
        const link = String(data.get("link") ?? "").trim();
        const artistIdRaw = String(data.get("artistId") ?? "").trim();
        const file = data.get("file");
        if (!name) return fail(400, { error: "Name is required." });
        if (name.length > 200) return fail(400, { error: "The name is too long." });
        const linkError = validateLink2(link);
        if (linkError) return fail(400, { error: linkError });
        const artistResult = await resolveArtistId(db, artistIdRaw);
        if ("error" in artistResult) return fail(400, { error: artistResult.error });
        const slug = slugify(name) || `event-${Date.now()}`;
        if (eventDate && !/^\d{4}-\d{2}-\d{2}$/.test(eventDate)) {
          return fail(400, { error: "Date must be in the format YYYY-MM-DD." });
        }
        if (!(file instanceof File) || file.size === 0) {
          return fail(400, { error: "Choose an image." });
        }
        if (!bucket) return fail(500, { error: "Storage is not configured." });
        if (file.size > MAX_IMAGE_BYTES) {
          return fail(400, { error: "The file is too large (max 8 MB)." });
        }
        const head2 = await readImageHead(file);
        const validation = validateImage({
          contentType: file.type,
          size: file.size,
          head: head2
        });
        if (!validation.ok) return fail(400, { error: validation.error });
        let created;
        try {
          created = await createEvent(db, {
            slug,
            name,
            eventDate: eventDate || null,
            location: location || null,
            description: description || null,
            link: link || null,
            artistId: artistResult.value
          });
        } catch (err) {
          if (err instanceof Error && err.message.includes("UNIQUE")) {
            return fail(400, { error: "An event with the same name already exists." });
          }
          console.error("Kunne ikke oprette event:", err);
          return fail(500, { error: "Could not create the event. Please try again later." });
        }
        const key2 = buildImageKey(created.slug, validation.contentType, crypto.randomUUID());
        try {
          await bucket.put(key2, await file.arrayBuffer(), {
            httpMetadata: { contentType: validation.contentType }
          });
          await addEventImage(db, {
            eventId: created.id,
            r2Key: key2,
            caption: null,
            contentType: validation.contentType
          });
        } catch (err) {
          console.error("Kunne ikke uploade billede:", err);
          return fail(500, { error: "The event was created, but the image could not be uploaded." });
        }
        return { success: true };
      }, "createEvent"),
      updateEvent: /* @__PURE__ */ __name(async ({ request, platform: platform2, locals }) => {
        if (!locals.owner) return fail(403, { error: "Not authorized." });
        const db = platform2?.env?.DB;
        if (!db) return fail(500, { error: "The database is not configured." });
        const data = await request.formData();
        const id = Number(String(data.get("id") ?? "").trim());
        if (!Number.isInteger(id)) return fail(400, { error: "Invalid event." });
        const name = String(data.get("name") ?? "").trim();
        const eventDate = String(data.get("eventDate") ?? "").trim();
        const location = String(data.get("location") ?? "").trim();
        const description = String(data.get("description") ?? "").trim();
        const details = String(data.get("details") ?? "").trim();
        const link = String(data.get("link") ?? "").trim();
        const artistIdRaw = String(data.get("artistId") ?? "").trim();
        if (!name) return fail(400, { error: "Name is required." });
        if (name.length > 200) return fail(400, { error: "The name is too long." });
        const linkError = validateLink2(link);
        if (linkError) return fail(400, { error: linkError });
        if (eventDate && !/^\d{4}-\d{2}-\d{2}$/.test(eventDate)) {
          return fail(400, { error: "Date must be in the format YYYY-MM-DD." });
        }
        const artistResult = await resolveArtistId(db, artistIdRaw);
        if ("error" in artistResult) return fail(400, { error: artistResult.error });
        const existing = await getEvent(db, id);
        if (!existing) return fail(404, { error: "The event does not exist." });
        const slug = slugify(name) || existing.slug;
        try {
          await updateEvent(db, id, {
            slug,
            name,
            eventDate: eventDate || null,
            location: location || null,
            description: description || null,
            details: details || null,
            link: link || null,
            artistId: artistResult.value
          });
        } catch (err) {
          if (err instanceof Error && err.message.includes("UNIQUE")) {
            return fail(400, { error: "An event with the same name already exists." });
          }
          console.error("Kunne ikke opdatere event:", err);
          return fail(500, { error: "Could not save the event. Please try again later." });
        }
        return { success: true };
      }, "updateEvent"),
      addEventImage: /* @__PURE__ */ __name(async ({ request, platform: platform2, locals }) => {
        if (!locals.owner) return fail(403, { error: "Not authorized." });
        const db = platform2?.env?.DB;
        const bucket = platform2?.env?.Bucket;
        if (!db) return fail(500, { error: "The database is not configured." });
        if (!bucket) return fail(500, { error: "Storage is not configured." });
        const data = await request.formData();
        const id = Number(String(data.get("id") ?? "").trim());
        if (!Number.isInteger(id)) return fail(400, { error: "Invalid event." });
        const caption = String(data.get("caption") ?? "").trim();
        if (caption.length > 200) return fail(400, { error: "The caption is too long." });
        const file = data.get("file");
        if (!(file instanceof File) || file.size === 0) {
          return fail(400, { error: "Choose an image." });
        }
        if (file.size > MAX_IMAGE_BYTES) {
          return fail(400, { error: "The file is too large (max 8 MB)." });
        }
        const event = await getEvent(db, id);
        if (!event) return fail(404, { error: "The event does not exist." });
        const head2 = await readImageHead(file);
        const validation = validateImage({
          contentType: file.type,
          size: file.size,
          head: head2
        });
        if (!validation.ok) return fail(400, { error: validation.error });
        const key2 = buildImageKey(event.slug, validation.contentType, crypto.randomUUID());
        try {
          await bucket.put(key2, await file.arrayBuffer(), {
            httpMetadata: { contentType: validation.contentType }
          });
          await addEventImage(db, {
            eventId: id,
            r2Key: key2,
            caption: caption || null,
            contentType: validation.contentType
          });
        } catch (err) {
          console.error("Kunne ikke tilf\xF8je billede:", err);
          return fail(500, { error: "Could not add the image. Please try again later." });
        }
        return { success: true };
      }, "addEventImage"),
      removeEventImage: /* @__PURE__ */ __name(async ({ request, platform: platform2, locals }) => {
        if (!locals.owner) return fail(403, { error: "Not authorized." });
        const db = platform2?.env?.DB;
        if (!db) return fail(500, { error: "The database is not configured." });
        const data = await request.formData();
        const id = Number(String(data.get("id") ?? "").trim());
        if (!Number.isInteger(id)) return fail(400, { error: "Invalid image." });
        const image = await getEventImage(db, id);
        if (!image) return fail(404, { error: "The image does not exist." });
        const bucket = platform2?.env?.Bucket;
        if (bucket) {
          try {
            await bucket.delete(image.r2_key);
          } catch (err) {
            console.error(`Kunne ikke slette billede ${id} i R2:`, err);
          }
        }
        try {
          await removeEventImage(db, id);
        } catch (err) {
          console.error("Kunne ikke slette billede:", err);
          return fail(500, { error: "Could not delete the image. Please try again later." });
        }
        return { success: true };
      }, "removeEventImage"),
      deleteEvent: /* @__PURE__ */ __name(async ({ request, platform: platform2, locals }) => {
        if (!locals.owner) return fail(403, { error: "Not authorized." });
        const db = platform2?.env?.DB;
        if (!db) return fail(500, { error: "The database is not configured." });
        const data = await request.formData();
        const idRaw = String(data.get("id") ?? "").trim();
        const id = Number(idRaw);
        if (!Number.isInteger(id)) return fail(400, { error: "Invalid event." });
        const event = await getEvent(db, id);
        if (!event) return fail(404, { error: "The event does not exist." });
        const bucket = platform2?.env?.Bucket;
        if (bucket) {
          let images = [];
          try {
            images = await listEventImages(db, id);
          } catch (err) {
            console.error(`Kunne ikke hente billeder for event ${id}:`, err);
          }
          if (images.length > 0) {
            try {
              await bucket.delete(images.map((img) => img.r2_key));
            } catch (err) {
              console.error(`Kunne ikke slette billeder for event ${id}:`, err);
            }
          }
        }
        try {
          await deleteEvent(db, id);
        } catch (err) {
          console.error("Kunne ikke slette event:", err);
          return fail(500, { error: "Could not delete the event. Please try again later." });
        }
        return { success: true };
      }, "deleteEvent")
    };
  }
});

// ../output/server/entries/pages/events/_page.svelte.js
var page_svelte_exports2 = {};
__export(page_svelte_exports2, {
  default: () => _page2
});
function EventCard($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { event, owner = false } = $$props;
    let editing = false;
    let showModal = false;
    function formatDate(iso) {
      if (!iso) return "Date to be announced";
      const [y, m, d] = iso.split("-");
      return `${d}.${m}.${y}`;
    }
    __name(formatDate, "formatDate");
    $$renderer2.push(`<li class="event svelte-14fxf3u"${attr("id", `event-${stringify3(event.id)}`)}><div class="event-head svelte-14fxf3u"><div class="event-info svelte-14fxf3u"><time class="svelte-14fxf3u">${escape_html2(formatDate(event.event_date))}</time> <span class="name">${escape_html2(event.name)}</span> `);
    if (event.location) {
      $$renderer2.push(`<!--[0--><span class="location svelte-14fxf3u">${escape_html2(event.location)}</span>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></div> `);
    if (owner) {
      $$renderer2.push(`<!--[0--><div class="event-actions svelte-14fxf3u"><button type="button" class="edit svelte-14fxf3u"${attr("aria-label", `Edit ${stringify3(event.name)}`)}${attr("aria-expanded", editing)} title="Edit event"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" class="svelte-14fxf3u"><path d="M4 20h4L19 9a2.12 2.12 0 0 0-3-3L5 17v3zM14 6l3 3" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"></path></svg></button> <form method="POST" action="?/deleteEvent"><input type="hidden" name="id"${attr("value", event.id)}/> <button type="submit" class="delete svelte-14fxf3u"${attr("aria-label", `Delete ${stringify3(event.name)}`)} title="Delete event"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" class="svelte-14fxf3u"><path d="M3 6h18M8 6V4h8v2m-9 0v14a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V6M10 11v6M14 11v6" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"></path></svg></button></form></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></div> `);
    if (event.images.length > 0 || event.description || event.artistName) {
      $$renderer2.push(`<!--[0--><div class="event-body svelte-14fxf3u">`);
      if (event.images.length > 0) {
        $$renderer2.push(`<!--[0--><div class="images-column svelte-14fxf3u"><ul class="images svelte-14fxf3u"><!--[-->`);
        const each_array = ensure_array_like(event.images);
        for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
          let image = each_array[$$index];
          $$renderer2.push(`<li><img${attr("src", image.url)}${attr("alt", image.caption ?? event.name)} loading="lazy" class="svelte-14fxf3u"/></li>`);
        }
        $$renderer2.push(`<!--]--></ul> `);
        if (event.artistName) {
          $$renderer2.push(`<!--[0--><p class="artist-name svelte-14fxf3u">${escape_html2(event.artistName)}</p>`);
        } else {
          $$renderer2.push("<!--[-1-->");
        }
        $$renderer2.push(`<!--]--></div>`);
      } else if (event.artistName) {
        $$renderer2.push(`<!--[1--><p class="artist-name svelte-14fxf3u">${escape_html2(event.artistName)}</p>`);
      } else {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]--> `);
      if (event.description) {
        $$renderer2.push(`<!--[0--><p class="description svelte-14fxf3u">${escape_html2(event.description)}</p>`);
      } else {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]--></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> <div class="event-foot svelte-14fxf3u"><button type="button" class="more svelte-14fxf3u" aria-haspopup="dialog"${attr("aria-expanded", showModal)}${attr("aria-label", `More about ${stringify3(event.name)}`)}>More <span class="more-arrow svelte-14fxf3u" aria-hidden="true">\u2192</span></button></div> `);
    {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> `);
    {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></li>`);
  });
}
function _page2($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { data, form } = $$props;
    head("13hsgdq", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Events \u2013 Tour Group</title>`);
      });
      $$renderer3.push(`<meta name="description" content="Events that Tour Group has helped produce."/>`);
    });
    $$renderer2.push(`<section class="hero"><div class="label">Events</div> <h1>Events</h1> `);
    if (data.events.length === 0) {
      $$renderer2.push(`<!--[0--><p class="lead svelte-13hsgdq">No events right now \u2014 check back soon.</p>`);
    } else {
      $$renderer2.push(`<!--[-1--><p class="lead svelte-13hsgdq">A selection of events we have helped produce.</p>`);
    }
    $$renderer2.push(`<!--]--></section> <section><div class="label">01 \u2014 events</div> `);
    if (data.events.length === 0) {
      $$renderer2.push(`<!--[0--><p class="lead svelte-13hsgdq">No events right now \u2014 check back soon.</p>`);
    } else {
      $$renderer2.push(`<!--[-1--><ul class="events svelte-13hsgdq"><!--[-->`);
      const each_array = ensure_array_like(data.events);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let event = each_array[$$index];
        EventCard($$renderer2, { event, artists: data.artists, owner: data.owner });
      }
      $$renderer2.push(`<!--]--></ul>`);
    }
    $$renderer2.push(`<!--]--></section> `);
    if (data.owner) {
      $$renderer2.push(`<!--[0--><section><div class="label">02 \u2014 Create event</div> `);
      EventForm($$renderer2, {
        error: form?.error,
        artists: data.artists,
        fields: [
          "name",
          "description",
          "eventDate",
          "location",
          "artist",
          "link",
          "file"
        ]
      });
      $$renderer2.push(`<!----></section>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]-->`);
  });
}
var init_page_svelte2 = __esm({
  "../output/server/entries/pages/events/_page.svelte.js"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_chunks();
    init_internal();
    init_exports2();
    init_utils22();
    init_server();
    init_root();
    init_state_svelte();
    init_EventCard_svelte_svelte_type_style_lang();
    __name(EventCard, "EventCard");
    __name(_page2, "_page");
  }
});

// ../output/server/nodes/3.js
var __exports4 = {};
__export(__exports4, {
  component: () => component4,
  fonts: () => fonts4,
  imports: () => imports4,
  index: () => index4,
  server: () => page_server_ts_exports2,
  server_id: () => server_id3,
  stylesheets: () => stylesheets4
});
var index4, component_cache4, component4, server_id3, imports4, stylesheets4, fonts4;
var init__4 = __esm({
  "../output/server/nodes/3.js"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_page_server_ts2();
    index4 = 3;
    component4 = /* @__PURE__ */ __name(async () => component_cache4 ??= (await Promise.resolve().then(() => (init_page_svelte2(), page_svelte_exports2))).default, "component");
    server_id3 = "src/routes/events/+page.server.ts";
    imports4 = ["_app/immutable/nodes/3.DdaA_JNh.js", "_app/immutable/chunks/Bzak7iHL.js", "_app/immutable/chunks/2HPGJ4rY.js", "_app/immutable/chunks/wgRYQMwV.js", "_app/immutable/chunks/Bc9eTX54.js", "_app/immutable/chunks/BghoPdkm.js", "_app/immutable/chunks/WEMBPxGx.js", "_app/immutable/chunks/DA9A0cPI.js", "_app/immutable/chunks/C36gyCFG.js", "_app/immutable/chunks/BAJeVE24.js", "_app/immutable/chunks/V53e5fvJ.js", "_app/immutable/chunks/D9QACNu6.js"];
    stylesheets4 = ["_app/immutable/assets/EventCard.CL_Y-Ym8.css", "_app/immutable/assets/3.JmGAlhJ9.css"];
    fonts4 = [];
  }
});

// ../output/server/entries/pages/kontakt/_page.svelte.js
var page_svelte_exports3 = {};
__export(page_svelte_exports3, {
  default: () => _page3
});
function _page3($$renderer) {
  head("wkxllv", $$renderer, ($$renderer2) => {
    $$renderer2.title(($$renderer3) => {
      $$renderer3.push(`<title>Contact \u2013 Tour Group</title>`);
    });
    $$renderer2.push(`<meta name="description" content="Get in touch with Tour Group \u2014 production and lighting design for events."/>`);
  });
  $$renderer.push(`<section class="hero"><div class="label">Contact</div> <h1>Contact</h1> <p class="lead svelte-wkxllv">Let's create something great together.</p></section> <section><div class="label">01 \u2014 Get in touch</div> <h2>Let's have a chat</h2> <p class="lead svelte-wkxllv">For enquiries, bookings or a quick question \u2014 reach out by email.</p> <p><a href="mailto:lukas@tourgroup.dk" class="btn svelte-wkxllv">lukas@tourgroup.dk</a></p></section> <section><div class="label">02 \u2014 Follow us</div> <p class="lead svelte-wkxllv">Follow along behind the scenes on Instagram.</p> <p><a href="https://www.instagram.com/lukas_laukiss/" target="_blank" rel="noopener noreferrer" class="instagram svelte-wkxllv" aria-label="Follow @lukas_laukiss on Instagram" title="@lukas_laukiss on Instagram"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" class="svelte-wkxllv"><path fill="currentColor" d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16Zm0 1.94c-3.15 0-3.52.01-4.76.07-.9.04-1.39.19-1.71.32-.43.17-.74.37-1.06.69-.32.32-.52.63-.69 1.06-.13.32-.28.81-.32 1.71-.06 1.24-.07 1.61-.07 4.76s.01 3.52.07 4.76c.04.9.19 1.39.32 1.71.17.43.37.74.69 1.06.32.32.63.52 1.06.69.32.13.81.28 1.71.32 1.24.06 1.61.07 4.76.07s3.52-.01 4.76-.07c.9-.04 1.39-.19 1.71-.32.43-.17.74-.37 1.06-.69.32-.32.52-.63.69-1.06.13-.32.28-.81.32-1.71.06-1.24.07-1.61.07-4.76s-.01-3.52-.07-4.76c-.04-.9-.19-1.39-.32-1.71a2.85 2.85 0 0 0-.69-1.06 2.85 2.85 0 0 0-1.06-.69c-.32-.13-.81-.28-1.71-.32-1.24-.06-1.61-.07-4.76-.07Zm0 3.3a4.6 4.6 0 1 1 0 9.2 4.6 4.6 0 0 1 0-9.2Zm0 1.94a2.66 2.66 0 1 0 0 5.32 2.66 2.66 0 0 0 0-5.32Zm5.86-2.16a1.08 1.08 0 1 1-2.16 0 1.08 1.08 0 0 1 2.16 0Z"></path></svg> <span>@lukas_laukiss</span></a></p></section>`);
}
var init_page_svelte3 = __esm({
  "../output/server/entries/pages/kontakt/_page.svelte.js"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_chunks();
    __name(_page3, "_page");
  }
});

// ../output/server/nodes/4.js
var __exports5 = {};
__export(__exports5, {
  component: () => component5,
  fonts: () => fonts5,
  imports: () => imports5,
  index: () => index5,
  stylesheets: () => stylesheets5
});
var index5, component_cache5, component5, imports5, stylesheets5, fonts5;
var init__5 = __esm({
  "../output/server/nodes/4.js"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    index5 = 4;
    component5 = /* @__PURE__ */ __name(async () => component_cache5 ??= (await Promise.resolve().then(() => (init_page_svelte3(), page_svelte_exports3))).default, "component");
    imports5 = ["_app/immutable/nodes/4.Cy10uLFB.js", "_app/immutable/chunks/Bzak7iHL.js", "_app/immutable/chunks/2HPGJ4rY.js", "_app/immutable/chunks/D9QACNu6.js"];
    stylesheets5 = ["_app/immutable/assets/4.CSRiNaR7.css"];
    fonts5 = [];
  }
});

// ../output/server/entries/pages/logout/_page.server.ts.js
var page_server_ts_exports3 = {};
__export(page_server_ts_exports3, {
  actions: () => actions3
});
var actions3;
var init_page_server_ts3 = __esm({
  "../output/server/entries/pages/logout/_page.server.ts.js"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_exports();
    init_db();
    actions3 = {
      default: /* @__PURE__ */ __name(async ({ cookies, request, platform: platform2 }) => {
        const db = platform2?.env?.DB;
        const token = getSessionCookie(request.headers.get("cookie"));
        if (db && token) {
          try {
            await deleteSession(db, token);
          } catch (err) {
            console.error("Kunne ikke slette session:", err);
          }
        }
        cookies.delete(SESSION_COOKIE_NAME, { path: "/" });
        redirect(303, "/");
      }, "default")
    };
  }
});

// ../output/server/nodes/5.js
var __exports6 = {};
__export(__exports6, {
  fonts: () => fonts6,
  imports: () => imports6,
  index: () => index6,
  server: () => page_server_ts_exports3,
  server_id: () => server_id4,
  stylesheets: () => stylesheets6
});
var index6, server_id4, imports6, stylesheets6, fonts6;
var init__6 = __esm({
  "../output/server/nodes/5.js"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_page_server_ts3();
    index6 = 5;
    server_id4 = "src/routes/logout/+page.server.ts";
    imports6 = [];
    stylesheets6 = [];
    fonts6 = [];
  }
});

// ../output/server/entries/pages/om/_page.server.ts.js
var page_server_ts_exports4 = {};
__export(page_server_ts_exports4, {
  actions: () => actions4,
  load: () => load4
});
var MAX_LENGTH, load4, actions4;
var init_page_server_ts4 = __esm({
  "../output/server/entries/pages/om/_page.server.ts.js"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_exports();
    init_db();
    MAX_LENGTH = 5e3;
    load4 = /* @__PURE__ */ __name(async ({ platform: platform2 }) => {
      const db = platform2?.env?.DB;
      if (!db) return { about: { aboutMe: null, whatICanDo: null } };
      try {
        const row = await getAbout(db);
        return {
          about: {
            aboutMe: row?.about_me ?? null,
            whatICanDo: row?.what_i_can_do ?? null
          }
        };
      } catch (err) {
        console.error("Kunne ikke hente about-indhold:", err);
        return { about: { aboutMe: null, whatICanDo: null } };
      }
    }, "load");
    actions4 = {
      updateAbout: /* @__PURE__ */ __name(async ({ request, platform: platform2, locals }) => {
        if (!locals.owner) return fail(403, { error: "Not authorized." });
        const db = platform2?.env?.DB;
        if (!db) return fail(500, { error: "The database is not configured." });
        const data = await request.formData();
        const input = {};
        if (data.has("aboutMe")) {
          const aboutMe = String(data.get("aboutMe") ?? "").trim();
          if (aboutMe.length > MAX_LENGTH) {
            return fail(400, { error: "The \u201CAbout me\u201D text is too long." });
          }
          input.aboutMe = aboutMe || null;
        }
        if (data.has("whatICanDo")) {
          const whatICanDo = String(data.get("whatICanDo") ?? "").trim();
          if (whatICanDo.length > MAX_LENGTH) {
            return fail(400, { error: "The \u201CWhat I can do\u201D text is too long." });
          }
          input.whatICanDo = whatICanDo || null;
        }
        try {
          await updateAbout(db, input);
        } catch (err) {
          console.error("Kunne ikke opdatere about-indhold:", err);
          return fail(500, { error: "Could not save. Please try again later." });
        }
        return { success: true };
      }, "updateAbout")
    };
  }
});

// ../output/server/entries/pages/om/_page.svelte.js
var page_svelte_exports4 = {};
__export(page_svelte_exports4, {
  default: () => _page4
});
function _page4($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { data, form } = $$props;
    head("1ska19h", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>About \u2013 Tour Group</title>`);
      });
      $$renderer3.push(`<meta name="description" content="About Tour Group"/>`);
    });
    $$renderer2.push(`<section class="hero"><div class="label">About</div> <h1>About</h1> <p class="lead svelte-1ska19h">Lighting design and production for events.</p></section> <section><div class="label">01 \u2014 About me</div> `);
    if (data.about.aboutMe) {
      $$renderer2.push(`<!--[0--><p class="lead svelte-1ska19h">${escape_html2(data.about.aboutMe)}</p>`);
    } else {
      $$renderer2.push(`<!--[-1--><p class="lead svelte-1ska19h">Coming soon</p>`);
    }
    $$renderer2.push(`<!--]--> `);
    if (data.owner) {
      $$renderer2.push(`<!--[0--><div class="editor svelte-1ska19h">`);
      {
        $$renderer2.push(`<!--[-1--><button type="button" class="edit-toggle svelte-1ska19h">Edit</button>`);
      }
      $$renderer2.push(`<!--]--></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></section> <section><div class="label">02 \u2014 What I can do</div> `);
    if (data.about.whatICanDo) {
      $$renderer2.push(`<!--[0--><p class="lead svelte-1ska19h">${escape_html2(data.about.whatICanDo)}</p>`);
    } else {
      $$renderer2.push(`<!--[-1--><p class="lead svelte-1ska19h">Coming soon</p>`);
    }
    $$renderer2.push(`<!--]--> `);
    if (data.owner) {
      $$renderer2.push(`<!--[0--><div class="editor svelte-1ska19h">`);
      {
        $$renderer2.push(`<!--[-1--><button type="button" class="edit-toggle svelte-1ska19h">Edit</button>`);
      }
      $$renderer2.push(`<!--]--></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></section>`);
  });
}
var init_page_svelte4 = __esm({
  "../output/server/entries/pages/om/_page.svelte.js"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_chunks();
    init_internal();
    init_exports2();
    init_utils22();
    init_server();
    init_root();
    init_state_svelte();
    __name(_page4, "_page");
  }
});

// ../output/server/nodes/6.js
var __exports7 = {};
__export(__exports7, {
  component: () => component6,
  fonts: () => fonts7,
  imports: () => imports7,
  index: () => index7,
  server: () => page_server_ts_exports4,
  server_id: () => server_id5,
  stylesheets: () => stylesheets7
});
var index7, component_cache6, component6, server_id5, imports7, stylesheets7, fonts7;
var init__7 = __esm({
  "../output/server/nodes/6.js"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_page_server_ts4();
    index7 = 6;
    component6 = /* @__PURE__ */ __name(async () => component_cache6 ??= (await Promise.resolve().then(() => (init_page_svelte4(), page_svelte_exports4))).default, "component");
    server_id5 = "src/routes/om/+page.server.ts";
    imports7 = ["_app/immutable/nodes/6.4JGtSsLe.js", "_app/immutable/chunks/Bzak7iHL.js", "_app/immutable/chunks/2HPGJ4rY.js", "_app/immutable/chunks/BghoPdkm.js", "_app/immutable/chunks/wgRYQMwV.js", "_app/immutable/chunks/D9QACNu6.js", "_app/immutable/chunks/WEMBPxGx.js", "_app/immutable/chunks/DA9A0cPI.js", "_app/immutable/chunks/C36gyCFG.js", "_app/immutable/chunks/BAJeVE24.js"];
    stylesheets7 = ["_app/immutable/assets/6.Co4CxoSm.css"];
    fonts7 = [];
  }
});

// ../output/server/entries/pages/_secret_/_page.server.ts.js
var page_server_ts_exports5 = {};
__export(page_server_ts_exports5, {
  actions: () => actions5,
  load: () => load5
});
function matchesOwnerPath(secret, ownerPathEnv) {
  const ownerPath = normalizeOwnerPath(ownerPathEnv);
  if (!ownerPath) return false;
  return secret === ownerPath.replace(/^\//, "");
}
var load5, actions5;
var init_page_server_ts5 = __esm({
  "../output/server/entries/pages/_secret_/_page.server.ts.js"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_exports();
    init_db();
    init_owner_path();
    __name(matchesOwnerPath, "matchesOwnerPath");
    load5 = /* @__PURE__ */ __name(({ params, platform: platform2, locals }) => {
      const ownerPath = normalizeOwnerPath(platform2?.env?.OWNER_PATH);
      if (!matchesOwnerPath(params.secret, platform2?.env?.OWNER_PATH)) {
        console.warn(
          `[owner-login] 404 for segment "${params.secret}". OWNER_PATH ${ownerPath ? `configured (length ${ownerPath.length})` : "IS NOT SET"}.`
        );
        error3(404, "Not Found");
      }
      if (locals.owner) {
        redirect(303, "/");
      }
      return {};
    }, "load");
    actions5 = {
      default: /* @__PURE__ */ __name(async ({ request, cookies, platform: platform2, locals, params }) => {
        if (!matchesOwnerPath(params.secret, platform2?.env?.OWNER_PATH)) {
          return fail(404, { error: "Not found." });
        }
        const data = await request.formData();
        const password = String(data.get("password") ?? "");
        if (!password) {
          return fail(400, { error: "Please enter a password." });
        }
        const db = platform2?.env?.DB;
        if (!db) {
          return fail(500, { error: "Login is not configured correctly on the server." });
        }
        let ok;
        try {
          ok = await verifyOwnerPassword(db, password);
        } catch (err) {
          console.error("Login fejlede:", err);
          return fail(500, { error: "Login is not configured correctly on the server." });
        }
        if (!ok) {
          return fail(400, { error: "Incorrect password." });
        }
        let sessionId;
        try {
          sessionId = await createSession(db, SESSION_TTL_SECONDS);
        } catch (err) {
          console.error("Kunne ikke oprette session:", err);
          return fail(500, { error: "Could not log in. Please try again later." });
        }
        cookies.set(SESSION_COOKIE_NAME, sessionId, {
          path: "/",
          httpOnly: true,
          secure: true,
          sameSite: "lax",
          maxAge: SESSION_TTL_SECONDS
        });
        locals.owner = true;
        redirect(303, "/");
      }, "default")
    };
  }
});

// ../output/server/entries/pages/_secret_/_page.svelte.js
var page_svelte_exports5 = {};
__export(page_svelte_exports5, {
  default: () => _page5
});
function _page5($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { form } = $$props;
    let submitting = false;
    head("1mjgnv9", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Tour Group</title>`);
      });
      $$renderer3.push(`<meta name="robots" content="noindex, nofollow"/>`);
    });
    $$renderer2.push(`<section class="hero"><div class="label">Owner</div> <h1>Log in</h1> <p class="lead svelte-1mjgnv9">Log in to manage events.</p></section> <section><div class="label">01 \u2014 Password</div> <form method="POST" class="svelte-1mjgnv9"><label for="password" class="svelte-1mjgnv9">Password</label> <input id="password" name="password" type="password" autocomplete="current-password" required=""${attr("aria-invalid", form?.error ? "true" : void 0)} class="svelte-1mjgnv9"/> `);
    if (form?.error) {
      $$renderer2.push(`<!--[0--><p class="error svelte-1mjgnv9" role="alert">${escape_html2(form.error)}</p>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> <button type="submit"${attr("disabled", submitting, true)} class="svelte-1mjgnv9">${escape_html2("Log in")}</button></form></section>`);
  });
}
var init_page_svelte5 = __esm({
  "../output/server/entries/pages/_secret_/_page.svelte.js"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_chunks();
    init_internal();
    init_exports2();
    init_utils22();
    init_server();
    init_root();
    init_state_svelte();
    __name(_page5, "_page");
  }
});

// ../output/server/nodes/7.js
var __exports8 = {};
__export(__exports8, {
  component: () => component7,
  fonts: () => fonts8,
  imports: () => imports8,
  index: () => index8,
  server: () => page_server_ts_exports5,
  server_id: () => server_id6,
  stylesheets: () => stylesheets8
});
var index8, component_cache7, component7, server_id6, imports8, stylesheets8, fonts8;
var init__8 = __esm({
  "../output/server/nodes/7.js"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_page_server_ts5();
    index8 = 7;
    component7 = /* @__PURE__ */ __name(async () => component_cache7 ??= (await Promise.resolve().then(() => (init_page_svelte5(), page_svelte_exports5))).default, "component");
    server_id6 = "src/routes/[secret]/+page.server.ts";
    imports8 = ["_app/immutable/nodes/7.DqQfWyex.js", "_app/immutable/chunks/Bzak7iHL.js", "_app/immutable/chunks/2HPGJ4rY.js", "_app/immutable/chunks/BghoPdkm.js", "_app/immutable/chunks/wgRYQMwV.js", "_app/immutable/chunks/D9QACNu6.js", "_app/immutable/chunks/WEMBPxGx.js", "_app/immutable/chunks/DA9A0cPI.js", "_app/immutable/chunks/C36gyCFG.js", "_app/immutable/chunks/BAJeVE24.js"];
    stylesheets8 = ["_app/immutable/assets/7.B8Y1UCQA.css"];
    fonts8 = [];
  }
});

// ../output/server/entries/endpoints/images/_...key_/_server.ts.js
var server_ts_exports = {};
__export(server_ts_exports, {
  GET: () => GET
});
var GET;
var init_server_ts = __esm({
  "../output/server/entries/endpoints/images/_...key_/_server.ts.js"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_exports();
    GET = /* @__PURE__ */ __name(async ({ params, platform: platform2, request }) => {
      const bucket = platform2?.env?.Bucket;
      if (!bucket) error3(500, "Storage is not configured.");
      const key2 = params.key;
      if (!key2 || key2.includes("..")) error3(400, "Invalid key.");
      const object = await bucket.get(key2);
      if (!object) error3(404, "The image does not exist.");
      const headers2 = new Headers();
      if (object.httpMetadata?.contentType) {
        headers2.set("content-type", object.httpMetadata.contentType);
      }
      headers2.set("etag", object.etag);
      headers2.set("Cache-Control", "public, max-age=31536000, immutable");
      const ifNoneMatch = request.headers.get("if-none-match");
      if (ifNoneMatch && ifNoneMatch === object.etag) {
        return new Response(null, { status: 304, headers: headers2 });
      }
      return new Response(object.body, { headers: headers2 });
    }, "GET");
  }
});

// _worker.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// ../output/server/index.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// ../output/server/chunks/utils.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
init_devalue();
init_utils22();
init_exports();
init_internal();
init_server();

// ../../node_modules/set-cookie-parser/lib/set-cookie.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var defaultParseOptions = {
  decodeValues: true,
  map: false,
  silent: false,
  split: "auto"
  // auto = split strings but not arrays
};
function isForbiddenKey(key2) {
  return typeof key2 !== "string" || key2 in {};
}
__name(isForbiddenKey, "isForbiddenKey");
function createNullObj() {
  return /* @__PURE__ */ Object.create(null);
}
__name(createNullObj, "createNullObj");
function isNonEmptyString(str) {
  return typeof str === "string" && !!str.trim();
}
__name(isNonEmptyString, "isNonEmptyString");
function parseString(setCookieValue, options2) {
  var parts = setCookieValue.split(";").filter(isNonEmptyString);
  var nameValuePairStr = parts.shift();
  if (!nameValuePairStr) {
    return null;
  }
  var parsed = parseNameValuePair(nameValuePairStr);
  var name = parsed.name;
  var value = parsed.value;
  options2 = options2 ? Object.assign({}, defaultParseOptions, options2) : defaultParseOptions;
  if (isForbiddenKey(name)) {
    return null;
  }
  try {
    value = options2.decodeValues ? decodeURIComponent(value) : value;
  } catch (e3) {
    console.error(
      "set-cookie-parser: failed to decode cookie value. Set options.decodeValues=false to disable decoding.",
      e3
    );
  }
  var cookie = createNullObj();
  cookie.name = name;
  cookie.value = value;
  parts.forEach(function(part) {
    var sides = part.split("=");
    var key2 = sides.shift().trim().toLowerCase();
    if (isForbiddenKey(key2)) {
      return;
    }
    var value2 = sides.join("=").trim();
    if (key2 === "expires") {
      cookie.expires = new Date(value2);
    } else if (key2 === "max-age") {
      var n2 = parseInt(value2, 10);
      if (!Number.isNaN(n2)) cookie.maxAge = n2;
    } else if (key2 === "secure") {
      cookie.secure = true;
    } else if (key2 === "httponly") {
      cookie.httpOnly = true;
    } else if (key2 === "samesite") {
      cookie.sameSite = value2;
    } else if (key2 === "partitioned") {
      cookie.partitioned = true;
    } else if (key2) {
      cookie[key2] = value2;
    }
  });
  return cookie;
}
__name(parseString, "parseString");
function parseNameValuePair(nameValuePairStr) {
  var name = "";
  var value = "";
  var nameValueArr = nameValuePairStr.split("=");
  if (nameValueArr.length > 1) {
    name = nameValueArr.shift();
    value = nameValueArr.join("=");
  } else {
    value = nameValuePairStr;
  }
  return { name, value };
}
__name(parseNameValuePair, "parseNameValuePair");
function parseSetCookie(input, options2) {
  options2 = options2 ? Object.assign({}, defaultParseOptions, options2) : defaultParseOptions;
  if (!input) {
    if (!options2.map) {
      return [];
    } else {
      return createNullObj();
    }
  }
  if (input.headers) {
    if (typeof input.headers.getSetCookie === "function") {
      input = input.headers.getSetCookie();
    } else if (input.headers["set-cookie"]) {
      input = input.headers["set-cookie"];
    } else {
      var sch = input.headers[Object.keys(input.headers).find(function(key2) {
        return key2.toLowerCase() === "set-cookie";
      })];
      if (!sch && input.headers.cookie && !options2.silent) {
        console.warn(
          "Warning: set-cookie-parser appears to have been called on a request object. It is designed to parse Set-Cookie headers from responses, not Cookie headers from requests. Set the option {silent: true} to suppress this warning."
        );
      }
      input = sch;
    }
  }
  var split = options2.split;
  var isArray = Array.isArray(input);
  if (split === "auto") {
    split = !isArray;
  }
  if (!isArray) {
    input = [input];
  }
  input = input.filter(isNonEmptyString);
  if (split) {
    input = input.map(splitCookiesString).flat();
  }
  if (!options2.map) {
    return input.map(function(str) {
      return parseString(str, options2);
    }).filter(Boolean);
  } else {
    var cookies = createNullObj();
    return input.reduce(function(cookies2, str) {
      var cookie = parseString(str, options2);
      if (cookie && !isForbiddenKey(cookie.name)) {
        cookies2[cookie.name] = cookie;
      }
      return cookies2;
    }, cookies);
  }
}
__name(parseSetCookie, "parseSetCookie");
function splitCookiesString(cookiesString) {
  if (Array.isArray(cookiesString)) {
    return cookiesString;
  }
  if (typeof cookiesString !== "string") {
    return [];
  }
  var cookiesStrings = [];
  var pos = 0;
  var start;
  var ch;
  var lastComma;
  var nextStart;
  var cookiesSeparatorFound;
  function skipWhitespace() {
    while (pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))) {
      pos += 1;
    }
    return pos < cookiesString.length;
  }
  __name(skipWhitespace, "skipWhitespace");
  function notSpecialChar() {
    ch = cookiesString.charAt(pos);
    return ch !== "=" && ch !== ";" && ch !== ",";
  }
  __name(notSpecialChar, "notSpecialChar");
  while (pos < cookiesString.length) {
    start = pos;
    cookiesSeparatorFound = false;
    while (skipWhitespace()) {
      ch = cookiesString.charAt(pos);
      if (ch === ",") {
        lastComma = pos;
        pos += 1;
        skipWhitespace();
        nextStart = pos;
        while (pos < cookiesString.length && notSpecialChar()) {
          pos += 1;
        }
        if (pos < cookiesString.length && cookiesString.charAt(pos) === "=") {
          cookiesSeparatorFound = true;
          pos = nextStart;
          cookiesStrings.push(cookiesString.substring(start, lastComma));
          start = pos;
        } else {
          pos = lastComma + 1;
        }
      } else {
        pos += 1;
      }
    }
    if (!cookiesSeparatorFound || pos >= cookiesString.length) {
      cookiesStrings.push(cookiesString.substring(start, cookiesString.length));
    }
  }
  return cookiesStrings;
}
__name(splitCookiesString, "splitCookiesString");
parseSetCookie.parseSetCookie = parseSetCookie;
parseSetCookie.parse = parseSetCookie;
parseSetCookie.parseString = parseString;
parseSetCookie.splitCookiesString = splitCookiesString;

// ../output/server/chunks/utils.js
var SVELTE_KIT_ASSETS = "/_svelte_kit_assets";
var ENDPOINT_METHODS = ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS", "HEAD"];
var PAGE_METHODS = ["GET", "POST", "HEAD"];
function noop() {
}
__name(noop, "noop");
function once2(fn) {
  let done = false;
  let result;
  return () => {
    if (done) return result;
    done = true;
    return result = fn();
  };
}
__name(once2, "once");
var decoder = new TextDecoder();
function set_nested_value(object, path_string, value) {
  if (path_string.startsWith("n:")) {
    path_string = path_string.slice(2);
    value = value === "" ? void 0 : parseFloat(value);
  } else if (path_string.startsWith("b:")) {
    path_string = path_string.slice(2);
    value = value === "on";
  }
  deep_set(object, split_path(path_string), value);
}
__name(set_nested_value, "set_nested_value");
var DELETE_KEY = {};
function convert_formdata(data) {
  const result = {};
  for (let key2 of data.keys()) {
    const is_array2 = key2.endsWith("[]");
    let values = data.getAll(key2);
    if (is_array2) key2 = key2.slice(0, -2);
    values = values.filter(
      (entry) => typeof entry === "string" || entry.name !== "" || entry.size > 0
    );
    if (values.length === 0 && !is_array2) continue;
    if (key2.startsWith("n:")) {
      key2 = key2.slice(2);
      values = values.map((v) => v === "" ? void 0 : parseFloat(
        /** @type {string} */
        v
      ));
    } else if (key2.startsWith("b:")) {
      key2 = key2.slice(2);
      values = values.map((v) => v === "on");
    }
    if (values.length > 1 && !is_array2) {
      throw new Error(`Form cannot contain duplicated keys \u2014 "${key2}" has ${values.length} values`);
    }
    set_nested_value(result, key2, is_array2 ? values : values[0]);
  }
  return result;
}
__name(convert_formdata, "convert_formdata");
var BINARY_FORM_CONTENT_TYPE = "application/x-sveltekit-formdata";
var BINARY_FORM_VERSION = 0;
var HEADER_BYTES = 1 + 4 + 2;
async function deserialize_binary_form(request) {
  if (request.headers.get("content-type") !== BINARY_FORM_CONTENT_TYPE) {
    const form_data = await request.formData();
    return { data: convert_formdata(form_data), meta: {}, form_data };
  }
  if (!request.body) {
    throw deserialize_error("no body");
  }
  const reader = request.body.getReader();
  const chunks = [];
  function get_chunk(index9) {
    if (index9 in chunks) return chunks[index9];
    let i = chunks.length;
    while (i <= index9) {
      chunks[i] = reader.read().then((chunk) => chunk.value);
      i++;
    }
    return chunks[index9];
  }
  __name(get_chunk, "get_chunk");
  async function get_buffer(offset, length) {
    let start_chunk;
    let chunk_start = 0;
    let chunk_index;
    for (chunk_index = 0; ; chunk_index++) {
      const chunk = await get_chunk(chunk_index);
      if (!chunk) return null;
      const chunk_end = chunk_start + chunk.byteLength;
      if (offset >= chunk_start && offset < chunk_end) {
        start_chunk = chunk;
        break;
      }
      chunk_start = chunk_end;
    }
    if (offset + length <= chunk_start + start_chunk.byteLength) {
      return start_chunk.subarray(offset - chunk_start, offset + length - chunk_start);
    }
    const chunks2 = [start_chunk.subarray(offset - chunk_start)];
    let cursor = start_chunk.byteLength - offset + chunk_start;
    while (cursor < length) {
      chunk_index++;
      let chunk = await get_chunk(chunk_index);
      if (!chunk) return null;
      if (chunk.byteLength > length - cursor) {
        chunk = chunk.subarray(0, length - cursor);
      }
      chunks2.push(chunk);
      cursor += chunk.byteLength;
    }
    const buffer2 = new Uint8Array(length);
    cursor = 0;
    for (const chunk of chunks2) {
      buffer2.set(chunk, cursor);
      cursor += chunk.byteLength;
    }
    return buffer2;
  }
  __name(get_buffer, "get_buffer");
  const header = await get_buffer(0, HEADER_BYTES);
  if (!header) throw deserialize_error("too short");
  if (header[0] !== BINARY_FORM_VERSION) {
    throw deserialize_error(`got version ${header[0]}, expected version ${BINARY_FORM_VERSION}`);
  }
  const header_view = new DataView(header.buffer, header.byteOffset, header.byteLength);
  const data_length = header_view.getUint32(1, true);
  const file_offsets_length = header_view.getUint16(5, true);
  const data_buffer = await get_buffer(HEADER_BYTES, data_length);
  if (!data_buffer) throw deserialize_error("data too short");
  let file_offsets;
  let files_start_offset;
  if (file_offsets_length > 0) {
    const file_offsets_buffer = await get_buffer(HEADER_BYTES + data_length, file_offsets_length);
    if (!file_offsets_buffer) throw deserialize_error("file offset table too short");
    const parsed_offsets = JSON.parse(decoder.decode(file_offsets_buffer));
    if (!Array.isArray(parsed_offsets) || parsed_offsets.some((n2) => typeof n2 !== "number" || !Number.isInteger(n2) || n2 < 0)) {
      throw deserialize_error("invalid file offset table");
    }
    file_offsets = /** @type {Array<number>} */
    parsed_offsets;
    files_start_offset = HEADER_BYTES + data_length + file_offsets_length;
  }
  const file_spans = [];
  const [data, meta] = parse(decoder.decode(data_buffer), {
    File: /* @__PURE__ */ __name(([name, type, size, last_modified, index9]) => {
      if (typeof name !== "string" || typeof type !== "string" || typeof size !== "number" || typeof last_modified !== "number" || typeof index9 !== "number") {
        throw deserialize_error("invalid file metadata");
      }
      let offset = file_offsets[index9];
      if (offset === void 0) {
        throw deserialize_error("duplicate file offset table index");
      }
      file_offsets[index9] = void 0;
      offset += files_start_offset;
      file_spans.push({ offset, size });
      return new Proxy(new LazyFile(name, type, size, last_modified, get_chunk, offset), {
        getPrototypeOf() {
          return File.prototype;
        }
      });
    }, "File")
  });
  file_spans.sort((a, b) => a.offset - b.offset || a.size - b.size);
  for (let i = 1; i < file_spans.length; i++) {
    const previous = file_spans[i - 1];
    const current2 = file_spans[i];
    const previous_end = previous.offset + previous.size;
    if (previous_end < current2.offset) {
      throw deserialize_error("gaps in file data");
    }
    if (previous_end > current2.offset) {
      throw deserialize_error("overlapping file data");
    }
  }
  void (async () => {
    let has_more = true;
    while (has_more) {
      const chunk = await get_chunk(chunks.length);
      has_more = !!chunk;
    }
  })().catch(noop);
  return { data, meta, form_data: null };
}
__name(deserialize_binary_form, "deserialize_binary_form");
function deserialize_error(message) {
  return new SvelteKitError(400, "Bad Request", `Could not deserialize binary form: ${message}`);
}
__name(deserialize_error, "deserialize_error");
var LazyFile = class _LazyFile {
  static {
    __name(this, "LazyFile");
  }
  /** @type {(index: number) => Promise<Uint8Array<ArrayBuffer> | undefined>} */
  #get_chunk;
  /** @type {number} */
  #offset;
  /**
   * @param {string} name
   * @param {string} type
   * @param {number} size
   * @param {number} last_modified
   * @param {(index: number) => Promise<Uint8Array<ArrayBuffer> | undefined>} get_chunk
   * @param {number} offset
   */
  constructor(name, type, size, last_modified, get_chunk, offset) {
    this.name = name;
    this.type = type;
    this.size = size;
    this.lastModified = last_modified;
    this.webkitRelativePath = "";
    this.#get_chunk = get_chunk;
    this.#offset = offset;
    this.arrayBuffer = this.arrayBuffer.bind(this);
    this.bytes = this.bytes.bind(this);
    this.slice = this.slice.bind(this);
    this.stream = this.stream.bind(this);
    this.text = this.text.bind(this);
  }
  /** @type {ArrayBuffer | undefined} */
  #buffer;
  async arrayBuffer() {
    this.#buffer ??= await new Response(this.stream()).arrayBuffer();
    return this.#buffer;
  }
  async bytes() {
    return new Uint8Array(await this.arrayBuffer());
  }
  /**
   * @param {number=} start
   * @param {number=} end
   * @param {string=} contentType
   */
  slice(start = 0, end = this.size, contentType = this.type) {
    if (start < 0) {
      start = Math.max(this.size + start, 0);
    } else {
      start = Math.min(start, this.size);
    }
    if (end < 0) {
      end = Math.max(this.size + end, 0);
    } else {
      end = Math.min(end, this.size);
    }
    const size = Math.max(end - start, 0);
    const file = new _LazyFile(
      this.name,
      contentType,
      size,
      this.lastModified,
      this.#get_chunk,
      this.#offset + start
    );
    return file;
  }
  stream() {
    let cursor = 0;
    let chunk_index = 0;
    return new ReadableStream({
      start: /* @__PURE__ */ __name(async (controller) => {
        let chunk_start = 0;
        let start_chunk;
        for (chunk_index = 0; ; chunk_index++) {
          const chunk = await this.#get_chunk(chunk_index);
          if (!chunk) return null;
          const chunk_end = chunk_start + chunk.byteLength;
          if (this.#offset >= chunk_start && this.#offset < chunk_end) {
            start_chunk = chunk;
            break;
          }
          chunk_start = chunk_end;
        }
        if (this.#offset + this.size <= chunk_start + start_chunk.byteLength) {
          controller.enqueue(
            start_chunk.subarray(this.#offset - chunk_start, this.#offset + this.size - chunk_start)
          );
          controller.close();
        } else {
          controller.enqueue(start_chunk.subarray(this.#offset - chunk_start));
          cursor = start_chunk.byteLength - this.#offset + chunk_start;
        }
      }, "start"),
      pull: /* @__PURE__ */ __name(async (controller) => {
        chunk_index++;
        let chunk = await this.#get_chunk(chunk_index);
        if (!chunk) {
          controller.error("incomplete file data");
          controller.close();
          return;
        }
        if (chunk.byteLength > this.size - cursor) {
          chunk = chunk.subarray(0, this.size - cursor);
        }
        controller.enqueue(chunk);
        cursor += chunk.byteLength;
        if (cursor >= this.size) {
          controller.close();
        }
      }, "pull")
    });
  }
  async text() {
    return decoder.decode(await this.arrayBuffer());
  }
};
var path_regex = /^[a-zA-Z_$]\w*(\.[a-zA-Z_$]\w*|\[\d+\])*$/;
function split_path(path) {
  if (!path_regex.test(path)) {
    throw new Error(`Invalid path ${path}`);
  }
  return path.split(/\.|\[|\]/).filter(Boolean);
}
__name(split_path, "split_path");
function check_prototype_pollution(key2) {
  if (key2 === "__proto__" || key2 === "constructor" || key2 === "prototype") {
    throw new Error(
      `Invalid key "${key2}"`
    );
  }
}
__name(check_prototype_pollution, "check_prototype_pollution");
function deep_set(object, keys, value) {
  let current2 = object;
  for (let i = 0; i < keys.length - 1; i += 1) {
    const key2 = keys[i];
    check_prototype_pollution(key2);
    const is_array2 = /^\d+$/.test(keys[i + 1]);
    const inner = Object.hasOwn(current2, key2) ? current2[key2] : void 0;
    const exists = inner != null;
    if (exists && is_array2 !== Array.isArray(inner)) {
      throw new Error(`Invalid array key ${keys[i + 1]}`);
    }
    if (!exists) {
      if (value === DELETE_KEY) {
        return;
      }
      current2[key2] = is_array2 ? [] : {};
    }
    current2 = current2[key2];
  }
  const final_key = keys[keys.length - 1];
  check_prototype_pollution(final_key);
  if (value === DELETE_KEY) {
    delete current2[final_key];
  } else {
    current2[final_key] = value;
  }
}
__name(deep_set, "deep_set");
var INVALIDATED_PARAM = "x-sveltekit-invalidated";
var TRAILING_SLASH_PARAM = "x-sveltekit-trailing-slash";
function stringify2(data, transport) {
  const encoders = Object.fromEntries(Object.entries(transport).map(([k, v]) => [k, v.encode]));
  return stringify(data, encoders);
}
__name(stringify2, "stringify");
var remote_object = "__skrao";
var remote_map = "__skram";
var remote_set = "__skras";
var remote_file = "__skraf";
var remote_arg_marker = Symbol(remote_object);
function create_remote_arg_revivers(transport) {
  const remote_fns_revivers = {
    /** @type {(value: unknown) => unknown} */
    [remote_object]: (value) => value,
    /** @type {(value: unknown) => Map<unknown, unknown>} */
    [remote_map]: (value) => {
      if (!Array.isArray(value)) {
        throw new Error("Invalid data for Map reviver");
      }
      const map = /* @__PURE__ */ new Map();
      for (const item of value) {
        if (!Array.isArray(item) || item.length !== 2 || typeof item[0] !== "string" || typeof item[1] !== "string") {
          throw new Error("Invalid data for Map reviver");
        }
        const [key2, val] = item;
        map.set(parse3(key2), parse3(val));
      }
      return map;
    },
    /** @type {(value: unknown) => Set<unknown>} */
    [remote_set]: (value) => {
      if (!Array.isArray(value)) {
        throw new Error("Invalid data for Set reviver");
      }
      const set2 = /* @__PURE__ */ new Set();
      for (const item of value) {
        if (typeof item !== "string") {
          throw new Error("Invalid data for Set reviver");
        }
        set2.add(parse3(item));
      }
      return set2;
    },
    /** @type {(value: any) => File} */
    [remote_file]: (value) => {
      if (!value || typeof value !== "object" || typeof value.name !== "string" || typeof value.type !== "string" || typeof value.size !== "number" || typeof value.lastModified !== "number" || !(value.data instanceof ArrayBuffer)) {
        throw new Error("Invalid data for File reviver");
      }
      const { data, name, ...meta } = value;
      return new File([data], name, meta);
    }
  };
  const user_revivers = Object.fromEntries(
    Object.entries(transport).map(([k, v]) => [k, v.decode])
  );
  const all_revivers = { ...user_revivers, ...remote_fns_revivers };
  const parse3 = /* @__PURE__ */ __name((data) => parse(data, all_revivers), "parse");
  return all_revivers;
}
__name(create_remote_arg_revivers, "create_remote_arg_revivers");
function parse_remote_arg(string, transport) {
  if (!string) return void 0;
  const json_string = new TextDecoder().decode(
    // no need to add back `=` characters, atob can handle it
    base64_decode(string.replaceAll("-", "+").replaceAll("_", "/"))
  );
  return parse(json_string, create_remote_arg_revivers(transport));
}
__name(parse_remote_arg, "parse_remote_arg");
function create_remote_key(id, payload2) {
  return id + "/" + payload2;
}
__name(create_remote_key, "create_remote_key");
function split_remote_key(key2) {
  const i = key2.lastIndexOf("/");
  if (i === -1) {
    throw new Error(`Invalid remote key: ${key2}`);
  }
  return {
    id: key2.slice(0, i),
    payload: key2.slice(i + 1)
  };
}
__name(split_remote_key, "split_remote_key");
function coalesce_to_error(err) {
  return err instanceof Error || err && /** @type {any} */
  err.name && /** @type {any} */
  err.message ? (
    /** @type {Error} */
    err
  ) : new Error(JSON.stringify(err));
}
__name(coalesce_to_error, "coalesce_to_error");
function normalize_error(error5) {
  return (
    /** @type {import('../exports/internal/index.js').Redirect | HttpError | SvelteKitError | Error} */
    error5
  );
}
__name(normalize_error, "normalize_error");
function get_status(error5) {
  return error5 instanceof HttpError || error5 instanceof SvelteKitError ? error5.status : 500;
}
__name(get_status, "get_status");
function get_message(error5) {
  return error5 instanceof SvelteKitError ? error5.text : "Internal Error";
}
__name(get_message, "get_message");
function negotiate(accept, types) {
  const parts = [];
  accept.split(",").forEach((str, i) => {
    const match = /^[ \t]*([^/ \t]+)\/([^; \t]+)[ \t]*(?:;[ \t]*q=([0-9.]+))?/.exec(str);
    if (match) {
      const [, type, subtype, q = "1"] = match;
      parts.push({ type, subtype, q: +q, i });
    }
  });
  parts.sort((a, b) => {
    if (a.q !== b.q) {
      return b.q - a.q;
    }
    if (a.subtype === "*" !== (b.subtype === "*")) {
      return a.subtype === "*" ? 1 : -1;
    }
    if (a.type === "*" !== (b.type === "*")) {
      return a.type === "*" ? 1 : -1;
    }
    return a.i - b.i;
  });
  let accepted;
  let min_priority = Infinity;
  for (const mimetype of types) {
    const [type, subtype] = mimetype.split("/");
    const priority = parts.findIndex(
      (part) => (part.type === type || part.type === "*") && (part.subtype === subtype || part.subtype === "*")
    );
    if (priority !== -1 && priority < min_priority) {
      accepted = mimetype;
      min_priority = priority;
    }
  }
  return accepted;
}
__name(negotiate, "negotiate");
function get_set_cookies(headers2) {
  if (typeof headers2.getSetCookie === "function") {
    return headers2.getSetCookie();
  }
  const set_cookie = headers2.get("set-cookie");
  return set_cookie ? splitCookiesString(set_cookie) : [];
}
__name(get_set_cookies, "get_set_cookies");
function is_content_type(request, ...types) {
  const type = request.headers.get("content-type")?.split(";", 1)[0].trim() ?? "";
  return types.includes(type.toLowerCase());
}
__name(is_content_type, "is_content_type");
function is_form_content_type(request) {
  return is_content_type(
    request,
    "application/x-www-form-urlencoded",
    "multipart/form-data",
    "text/plain",
    BINARY_FORM_CONTENT_TYPE
  );
}
__name(is_form_content_type, "is_form_content_type");
var escape_html_attr_dict = {
  "&": "&amp;",
  '"': "&quot;"
  // Svelte also escapes < because the escape function could be called inside a `noscript` there
  // https://github.com/sveltejs/svelte/security/advisories/GHSA-8266-84wp-wv5c
  // However, that doesn't apply in SvelteKit
};
var escape_html_dict = {
  "&": "&amp;",
  "<": "&lt;"
};
var surrogates = (
  // high surrogate without paired low surrogate
  "[\\ud800-\\udbff](?![\\udc00-\\udfff])|[\\ud800-\\udbff][\\udc00-\\udfff]|[\\udc00-\\udfff]"
);
var escape_html_attr_regex = new RegExp(
  `[${Object.keys(escape_html_attr_dict).join("")}]|` + surrogates,
  "g"
);
var escape_html_regex = new RegExp(
  `[${Object.keys(escape_html_dict).join("")}]|` + surrogates,
  "g"
);
function escape_html(str, is_attr) {
  const dict = is_attr ? escape_html_attr_dict : escape_html_dict;
  const escaped_str = str.replace(is_attr ? escape_html_attr_regex : escape_html_regex, (match) => {
    if (match.length === 2) {
      return match;
    }
    return dict[match] ?? `&#${match.charCodeAt(0)};`;
  });
  return escaped_str;
}
__name(escape_html, "escape_html");
function method_not_allowed(mod, method) {
  return text(`${method} method not allowed`, {
    status: 405,
    headers: {
      // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/405
      // "The server must generate an Allow header field in a 405 status code response"
      allow: allowed_methods(mod).join(", ")
    }
  });
}
__name(method_not_allowed, "method_not_allowed");
function allowed_methods(mod) {
  const allowed = ENDPOINT_METHODS.filter((method) => method in mod);
  if ("GET" in mod && !("HEAD" in mod)) {
    allowed.push("HEAD");
  }
  return allowed;
}
__name(allowed_methods, "allowed_methods");
function get_global_name(options2) {
  return `__sveltekit_${options2.version_hash}`;
}
__name(get_global_name, "get_global_name");
function static_error_page(options2, status, message) {
  let page2 = options2.templates.error({ status, message: escape_html(message) });
  return text(page2, {
    headers: { "content-type": "text/html; charset=utf-8" },
    status
  });
}
__name(static_error_page, "static_error_page");
async function handle_fatal_error(event, state2, options2, error5) {
  error5 = error5 instanceof HttpError ? error5 : coalesce_to_error(error5);
  const status = get_status(error5);
  const body = await handle_error_and_jsonify(event, state2, options2, error5);
  const type = negotiate(event.request.headers.get("accept") || "text/html", [
    "application/json",
    "text/html"
  ]);
  if (event.isDataRequest || type === "application/json") {
    return json(body, {
      status
    });
  }
  return static_error_page(options2, status, body.message);
}
__name(handle_fatal_error, "handle_fatal_error");
async function handle_error_and_jsonify(event, state2, options2, error5) {
  if (error5 instanceof HttpError) {
    return { message: "Unknown Error", ...error5.body };
  }
  const status = get_status(error5);
  const message = get_message(error5);
  return await with_request_store(
    { event, state: state2 },
    () => options2.hooks.handleError({ error: error5, event, status, message })
  ) ?? { message };
}
__name(handle_error_and_jsonify, "handle_error_and_jsonify");
function redirect_response(status, location) {
  const response = new Response(void 0, {
    status,
    headers: { location }
  });
  return response;
}
__name(redirect_response, "redirect_response");
function clarify_devalue_error(event, error5) {
  if (error5.path) {
    return `Data returned from \`load\` while rendering ${event.route.id} is not serializable: ${error5.message} (${error5.path}). If you need to serialize/deserialize custom types, use transport hooks: https://svelte.dev/docs/kit/hooks#transport.`;
  }
  if (error5.path === "") {
    return `Data returned from \`load\` while rendering ${event.route.id} is not a plain object`;
  }
  return error5.message;
}
__name(clarify_devalue_error, "clarify_devalue_error");
function serialize_uses(node) {
  const uses = {};
  if (node.uses && node.uses.dependencies.size > 0) {
    uses.dependencies = Array.from(node.uses.dependencies);
  }
  if (node.uses && node.uses.search_params.size > 0) {
    uses.search_params = Array.from(node.uses.search_params);
  }
  if (node.uses && node.uses.params.size > 0) {
    uses.params = Array.from(node.uses.params);
  }
  if (node.uses?.parent) uses.parent = 1;
  if (node.uses?.route) uses.route = 1;
  if (node.uses?.url) uses.url = 1;
  return uses;
}
__name(serialize_uses, "serialize_uses");
function has_prerendered_path(manifest2, pathname) {
  return manifest2._.prerendered_routes.has(pathname) || pathname.at(-1) === "/" && manifest2._.prerendered_routes.has(pathname.slice(0, -1));
}
__name(has_prerendered_path, "has_prerendered_path");
function format_server_error(status, error5, event) {
  const formatted_text = `
\x1B[1;31m[${status}] ${event.request.method} ${event.url.pathname}\x1B[0m`;
  if (status === 404) {
    return formatted_text;
  }
  return `${formatted_text}
${error5.stack}`;
}
__name(format_server_error, "format_server_error");
function get_node_type(node_id) {
  const parts = node_id?.split("/");
  const filename = parts?.at(-1);
  if (!filename) return "unknown";
  const dot_parts = filename.split(".");
  return dot_parts.slice(0, -1).join(".");
}
__name(get_node_type, "get_node_type");
function create_replacer(transport) {
  const replacer = /* @__PURE__ */ __name((thing) => {
    for (const key2 in transport) {
      const encoded = transport[key2].encode(thing);
      if (encoded) {
        return `app.decode('${key2}', ${uneval(encoded, replacer)})`;
      }
    }
  }, "replacer");
  return replacer;
}
__name(create_replacer, "create_replacer");

// ../output/server/index.js
init_root();
init_exports();
init_internal();
init_server();

// ../output/server/chunks/server.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var base = "";
var assets = base;
var app_dir = "_app";
var relative = true;
var initial = { base, assets };
function override(paths) {
  base = paths.base;
  assets = paths.assets;
}
__name(override, "override");
function reset() {
  base = initial.base;
  assets = initial.assets;
}
__name(reset, "reset");

// ../output/server/index.js
init_devalue();
init_exports2();
init_utils22();
init_chunks();

// ../output/server/chunks/internal.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
init_root();
var read_implementation = null;
function set_read_implementation(fn) {
  read_implementation = fn;
}
__name(set_read_implementation, "set_read_implementation");
var public_env = {};
function set_private_env(environment) {
}
__name(set_private_env, "set_private_env");
function set_public_env(environment) {
  public_env = environment;
}
__name(set_public_env, "set_public_env");
var error4 = /* @__PURE__ */ __name(({ status, message }) => '<!doctype html>\n<html lang="en">\n	<head>\n		<meta charset="utf-8" />\n		<title>' + message + `</title>

		<style>
			body {
				--bg: white;
				--fg: #222;
				--divider: #ccc;
				background: var(--bg);
				color: var(--fg);
				font-family:
					system-ui,
					-apple-system,
					BlinkMacSystemFont,
					'Segoe UI',
					Roboto,
					Oxygen,
					Ubuntu,
					Cantarell,
					'Open Sans',
					'Helvetica Neue',
					sans-serif;
				display: flex;
				align-items: center;
				justify-content: center;
				height: 100vh;
				margin: 0;
			}

			.error {
				display: flex;
				align-items: center;
				max-width: 32rem;
				margin: 0 1rem;
			}

			.status {
				font-weight: 200;
				font-size: 3rem;
				line-height: 1;
				position: relative;
				top: -0.05rem;
			}

			.message {
				border-left: 1px solid var(--divider);
				padding: 0 0 0 1rem;
				margin: 0 0 0 1rem;
				min-height: 2.5rem;
				display: flex;
				align-items: center;
			}

			.message h1 {
				font-weight: 400;
				font-size: 1em;
				margin: 0;
			}

			@media (prefers-color-scheme: dark) {
				body {
					--bg: #222;
					--fg: #ddd;
					--divider: #666;
				}
			}
		</style>
	</head>
	<body>
		<div class="error">
			<span class="status">` + status + '</span>\n			<div class="message">\n				<h1>' + message + "</h1>\n			</div>\n		</div>\n	</body>\n</html>\n", "error");
var options = {
  app_template_contains_nonce: false,
  async: false,
  csp: { "mode": "auto", "directives": { "upgrade-insecure-requests": false, "block-all-mixed-content": false }, "reportOnly": { "upgrade-insecure-requests": false, "block-all-mixed-content": false } },
  csrf_check_origin: true,
  csrf_trusted_origins: [],
  embedded: false,
  env_public_prefix: "PUBLIC_",
  env_private_prefix: "",
  hash_routing: false,
  hooks: null,
  // added lazily, via `get_hooks`
  preload_strategy: "modulepreload",
  root,
  service_worker: false,
  service_worker_options: void 0,
  server_error_boundaries: false,
  templates: {
    app: /* @__PURE__ */ __name(({ head: head2, body, assets: assets2, nonce, env: env3 }) => '<!doctype html>\r\n<html lang="en">\r\n	<head>\r\n		<meta charset="utf-8" />\r\n		<link rel="icon" href="' + assets2 + '/favicon.png" />\r\n		<meta name="viewport" content="width=device-width, initial-scale=1" />\r\n		' + head2 + '\r\n	</head>\r\n	<body data-sveltekit-preload-data="hover">\r\n		<div style="display: contents">' + body + "</div>\r\n	</body>\r\n</html>\r\n", "app"),
    error: error4
  },
  version_hash: "17fr1g8"
};
async function get_hooks() {
  let handle2;
  let handleFetch;
  let handleError;
  let handleValidationError;
  let init2;
  ({ handle: handle2, handleFetch, handleError, handleValidationError, init: init2 } = await Promise.resolve().then(() => (init_hooks_server(), hooks_server_exports)));
  let reroute;
  let transport;
  return {
    handle: handle2,
    handleFetch,
    handleError,
    handleValidationError,
    init: init2,
    reroute,
    transport
  };
}
__name(get_hooks, "get_hooks");

// ../output/server/index.js
var import_cookie = __toESM(require_cookie(), 1);
var s = JSON.stringify;
var subscriber_queue = [];
function readable(value, start) {
  return {
    subscribe: writable(value, start).subscribe
  };
}
__name(readable, "readable");
function writable(value, start = noop2) {
  let stop = null;
  const subscribers = /* @__PURE__ */ new Set();
  function set2(new_value) {
    if (safe_not_equal(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue.length;
        for (const subscriber of subscribers) {
          subscriber[1]();
          subscriber_queue.push(subscriber, value);
        }
        if (run_queue) {
          for (let i = 0; i < subscriber_queue.length; i += 2) {
            subscriber_queue[i][0](subscriber_queue[i + 1]);
          }
          subscriber_queue.length = 0;
        }
      }
    }
  }
  __name(set2, "set");
  function update(fn) {
    set2(fn(
      /** @type {T} */
      value
    ));
  }
  __name(update, "update");
  function subscribe(run2, invalidate = noop2) {
    const subscriber = [run2, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start(set2, update) || noop2;
    }
    run2(
      /** @type {T} */
      value
    );
    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0 && stop) {
        stop();
        stop = null;
      }
    };
  }
  __name(subscribe, "subscribe");
  return { set: set2, update, subscribe };
}
__name(writable, "writable");
function exec(match, params, matchers) {
  const result = {};
  const values = match.slice(1);
  const values_needing_match = values.filter((value) => value !== void 0);
  let buffered = 0;
  for (let i = 0; i < params.length; i += 1) {
    const param = params[i];
    let value = values[i - buffered];
    if (param.chained && param.rest && buffered) {
      value = values.slice(i - buffered, i + 1).filter((s22) => s22).join("/");
      buffered = 0;
    }
    if (value === void 0) {
      if (param.rest) {
        value = "";
      } else {
        continue;
      }
    }
    if (!param.matcher || matchers[param.matcher](value)) {
      result[param.name] = value;
      const next_param = params[i + 1];
      const next_value = values[i + 1];
      if (next_param && !next_param.rest && next_param.optional && next_value && param.chained) {
        buffered = 0;
      }
      if (!next_param && !next_value && Object.keys(result).length === values_needing_match.length) {
        buffered = 0;
      }
      continue;
    }
    if (param.optional && param.chained) {
      buffered++;
      continue;
    }
    return;
  }
  if (buffered) return;
  return result;
}
__name(exec, "exec");
function find_route(path, routes, matchers) {
  for (const route of routes) {
    const match = route.pattern.exec(path);
    if (!match) continue;
    const matched = exec(match, route.params, matchers);
    if (matched) {
      return {
        route,
        params: decode_params(matched)
      };
    }
  }
  return null;
}
__name(find_route, "find_route");
var DATA_SUFFIX = "/__data.json";
var HTML_DATA_SUFFIX = ".html__data.json";
function has_data_suffix2(pathname) {
  return pathname.endsWith(DATA_SUFFIX) || pathname.endsWith(HTML_DATA_SUFFIX);
}
__name(has_data_suffix2, "has_data_suffix");
function add_data_suffix2(pathname) {
  if (pathname.endsWith(".html")) return pathname.replace(/\.html$/, HTML_DATA_SUFFIX);
  return pathname.replace(/\/$/, "") + DATA_SUFFIX;
}
__name(add_data_suffix2, "add_data_suffix");
function strip_data_suffix2(pathname) {
  if (pathname.endsWith(HTML_DATA_SUFFIX)) {
    return pathname.slice(0, -HTML_DATA_SUFFIX.length) + ".html";
  }
  return pathname.slice(0, -DATA_SUFFIX.length);
}
__name(strip_data_suffix2, "strip_data_suffix");
var ROUTE_SUFFIX = "/__route.js";
function has_resolution_suffix2(pathname) {
  return pathname.endsWith(ROUTE_SUFFIX);
}
__name(has_resolution_suffix2, "has_resolution_suffix");
function add_resolution_suffix2(pathname) {
  return pathname.replace(/\/$/, "") + ROUTE_SUFFIX;
}
__name(add_resolution_suffix2, "add_resolution_suffix");
function strip_resolution_suffix2(pathname) {
  return pathname.slice(0, -ROUTE_SUFFIX.length);
}
__name(strip_resolution_suffix2, "strip_resolution_suffix");
function hash(...values) {
  let hash2 = 5381;
  for (const value of values) {
    if (typeof value === "string") {
      let i = value.length;
      while (i) hash2 = hash2 * 33 ^ value.charCodeAt(--i);
    } else if (ArrayBuffer.isView(value)) {
      const buffer2 = new Uint8Array(value.buffer, value.byteOffset, value.byteLength);
      let i = buffer2.length;
      while (i) hash2 = hash2 * 33 ^ buffer2[--i];
    } else {
      throw new TypeError("value must be a string or TypedArray");
    }
  }
  return (hash2 >>> 0).toString(36);
}
__name(hash, "hash");
function compact(arr) {
  return arr.filter(
    /** @returns {val is NonNullable<T>} */
    (val) => val != null
  );
}
__name(compact, "compact");
var noop_span = {
  spanContext() {
    return noop_span_context;
  },
  setAttribute() {
    return this;
  },
  setAttributes() {
    return this;
  },
  addEvent() {
    return this;
  },
  setStatus() {
    return this;
  },
  updateName() {
    return this;
  },
  end() {
    return this;
  },
  isRecording() {
    return false;
  },
  recordException() {
    return this;
  },
  addLink() {
    return this;
  },
  addLinks() {
    return this;
  }
};
var noop_span_context = {
  traceId: "",
  spanId: "",
  traceFlags: 0
};
function with_resolvers() {
  let resolve2;
  let reject;
  const promise = new Promise((res, rej) => {
    resolve2 = res;
    reject = rej;
  });
  return { promise, resolve: resolve2, reject };
}
__name(with_resolvers, "with_resolvers");
var NULL_BODY_STATUS = [101, 103, 204, 205, 304];
var IN_WEBCONTAINER2 = !!globalThis.process?.versions?.webcontainer;
async function render_endpoint(event, event_state, mod, state2) {
  const method = (
    /** @type {import('types').HttpMethod} */
    event.request.method
  );
  let handler = mod[method] || mod.fallback;
  if (method === "HEAD" && !mod.HEAD && mod.GET) {
    handler = mod.GET;
  }
  if (!handler) {
    return method_not_allowed(mod, method);
  }
  const prerender = mod.prerender ?? state2.prerender_default;
  if (prerender && (mod.POST || mod.PATCH || mod.PUT || mod.DELETE)) {
    throw new Error("Cannot prerender endpoints that have mutative methods");
  }
  if (state2.prerendering && !state2.prerendering.inside_reroute && !prerender) {
    if (state2.depth > 0) {
      throw new Error(`${event.route.id} is not prerenderable`);
    } else {
      return new Response(void 0, { status: 204 });
    }
  }
  try {
    const response = await with_request_store(
      { event, state: event_state },
      () => handler(
        /** @type {import('@sveltejs/kit').RequestEvent<Record<string, any>>} */
        event
      )
    );
    if (!(response instanceof Response)) {
      throw new Error(
        `Invalid response from route ${event.url.pathname}: handler should return a Response object`
      );
    }
    if (state2.prerendering && (!state2.prerendering.inside_reroute || prerender)) {
      const cloned = new Response(response.clone().body, {
        status: response.status,
        statusText: response.statusText,
        headers: new Headers(response.headers)
      });
      cloned.headers.set("x-sveltekit-prerender", String(prerender));
      if (state2.prerendering.inside_reroute && prerender) {
        cloned.headers.set(
          "x-sveltekit-routeid",
          encodeURI(
            /** @type {string} */
            event.route.id
          )
        );
        state2.prerendering.dependencies.set(event.url.pathname, { response: cloned, body: null });
      } else {
        return cloned;
      }
    }
    return response;
  } catch (e3) {
    if (e3 instanceof Redirect) {
      return new Response(void 0, {
        status: e3.status,
        headers: { location: e3.location }
      });
    }
    throw e3;
  }
}
__name(render_endpoint, "render_endpoint");
function is_endpoint_request(event) {
  const { method, headers: headers2 } = event.request;
  if (ENDPOINT_METHODS.includes(method) && !PAGE_METHODS.includes(method)) {
    return true;
  }
  if (method === "POST" && headers2.get("x-sveltekit-action") === "true") return false;
  const accept = event.request.headers.get("accept") ?? "*/*";
  return negotiate(accept, ["*", "text/html"]) !== "text/html";
}
__name(is_endpoint_request, "is_endpoint_request");
async function record_span({ name, attributes: attributes2, fn }) {
  {
    return fn(noop_span);
  }
}
__name(record_span, "record_span");
function is_action_json_request(event) {
  const accept = negotiate(event.request.headers.get("accept") ?? "*/*", [
    "application/json",
    "text/html"
  ]);
  return accept === "application/json" && event.request.method === "POST";
}
__name(is_action_json_request, "is_action_json_request");
async function handle_action_json_request(event, event_state, options2, server2) {
  const actions6 = server2?.actions;
  if (!actions6) {
    const no_actions_error = new SvelteKitError(
      405,
      "Method Not Allowed",
      `POST method not allowed. No form actions exist for ${"this page"}`
    );
    return action_json(
      {
        type: "error",
        error: await handle_error_and_jsonify(event, event_state, options2, no_actions_error)
      },
      {
        status: no_actions_error.status,
        headers: {
          // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/405
          // "The server must generate an Allow header field in a 405 status code response"
          allow: "GET"
        }
      }
    );
  }
  check_named_default_separate(actions6);
  try {
    const data = await call_action(event, event_state, actions6);
    if (DEV) ;
    if (data instanceof ActionFailure) {
      return action_json({
        type: "failure",
        status: data.status,
        // @ts-expect-error we assign a string to what is supposed to be an object. That's ok
        // because we don't use the object outside, and this way we have better code navigation
        // through knowing where the related interface is used.
        data: stringify_action_response(
          data.data,
          /** @type {string} */
          event.route.id,
          options2.hooks.transport
        )
      });
    } else {
      return action_json({
        type: "success",
        status: data ? 200 : 204,
        // @ts-expect-error see comment above
        data: stringify_action_response(
          data,
          /** @type {string} */
          event.route.id,
          options2.hooks.transport
        )
      });
    }
  } catch (e3) {
    const err = normalize_error(e3);
    if (err instanceof Redirect) {
      return action_json_redirect(err);
    }
    return action_json(
      {
        type: "error",
        error: await handle_error_and_jsonify(
          event,
          event_state,
          options2,
          check_incorrect_fail_use(err)
        )
      },
      {
        status: get_status(err)
      }
    );
  }
}
__name(handle_action_json_request, "handle_action_json_request");
function check_incorrect_fail_use(error22) {
  return error22 instanceof ActionFailure ? new Error('Cannot "throw fail()". Use "return fail()"') : error22;
}
__name(check_incorrect_fail_use, "check_incorrect_fail_use");
function action_json_redirect(redirect2) {
  return action_json({
    type: "redirect",
    status: redirect2.status,
    location: redirect2.location
  });
}
__name(action_json_redirect, "action_json_redirect");
function action_json(data, init2) {
  return json(data, init2);
}
__name(action_json, "action_json");
function is_action_request(event) {
  return event.request.method === "POST";
}
__name(is_action_request, "is_action_request");
async function handle_action_request(event, event_state, server2) {
  const actions6 = server2?.actions;
  if (!actions6) {
    event.setHeaders({
      // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/405
      // "The server must generate an Allow header field in a 405 status code response"
      allow: "GET"
    });
    return {
      type: "error",
      error: new SvelteKitError(
        405,
        "Method Not Allowed",
        `POST method not allowed. No form actions exist for ${"this page"}`
      )
    };
  }
  check_named_default_separate(actions6);
  try {
    const data = await call_action(event, event_state, actions6);
    if (DEV) ;
    if (data instanceof ActionFailure) {
      return {
        type: "failure",
        status: data.status,
        data: data.data
      };
    } else {
      return {
        type: "success",
        status: 200,
        // @ts-expect-error this will be removed upon serialization, so `undefined` is the same as omission
        data
      };
    }
  } catch (e3) {
    const err = normalize_error(e3);
    if (err instanceof Redirect) {
      return {
        type: "redirect",
        status: err.status,
        location: err.location
      };
    }
    return {
      type: "error",
      error: check_incorrect_fail_use(err)
    };
  }
}
__name(handle_action_request, "handle_action_request");
function check_named_default_separate(actions6) {
  if (actions6.default && Object.keys(actions6).length > 1) {
    throw new Error(
      "When using named actions, the default action cannot be used. See the docs for more info: https://svelte.dev/docs/kit/form-actions#named-actions"
    );
  }
}
__name(check_named_default_separate, "check_named_default_separate");
async function call_action(event, event_state, actions6) {
  const url = new URL(event.request.url);
  let name = "default";
  for (const param of url.searchParams) {
    if (param[0].startsWith("/")) {
      name = param[0].slice(1);
      if (name === "default") {
        throw new Error('Cannot use reserved action name "default"');
      }
      break;
    }
  }
  const action = actions6[name];
  if (!action) {
    throw new SvelteKitError(404, "Not Found", `No action with name '${name}' found`);
  }
  if (!is_form_content_type(event.request)) {
    throw new SvelteKitError(
      415,
      "Unsupported Media Type",
      `Form actions expect form-encoded data \u2014 received ${event.request.headers.get(
        "content-type"
      )}`
    );
  }
  return record_span({
    name: "sveltekit.form_action",
    attributes: {
      "http.route": event.route.id || "unknown"
    },
    fn: /* @__PURE__ */ __name(async (current2) => {
      const traced_event = merge_tracing(event, current2);
      const result = await with_request_store(
        { event: traced_event, state: event_state },
        () => action(traced_event)
      );
      if (result instanceof ActionFailure) {
        current2.setAttributes({
          "sveltekit.form_action.result.type": "failure",
          "sveltekit.form_action.result.status": result.status
        });
      }
      return result;
    }, "fn")
  });
}
__name(call_action, "call_action");
function uneval_action_response(data, route_id, transport) {
  const replacer = create_replacer(transport);
  return try_serialize(data, (value) => uneval(value, replacer), route_id);
}
__name(uneval_action_response, "uneval_action_response");
function stringify_action_response(data, route_id, transport) {
  const encoders = Object.fromEntries(
    Object.entries(transport).map(([key2, value]) => [key2, value.encode])
  );
  return try_serialize(data, (value) => stringify(value, encoders), route_id);
}
__name(stringify_action_response, "stringify_action_response");
function try_serialize(data, fn, route_id) {
  try {
    return fn(data);
  } catch (e3) {
    const error22 = (
      /** @type {any} */
      e3
    );
    if (data instanceof Response) {
      throw new Error(
        `Data returned from action inside ${route_id} is not serializable. Form actions need to return plain objects or fail(). E.g. return { success: true } or return fail(400, { message: "invalid" });`,
        { cause: e3 }
      );
    }
    if ("path" in error22) {
      let message = `Data returned from action inside ${route_id} is not serializable: ${error22.message}`;
      if (error22.path !== "") message += ` (data.${error22.path})`;
      throw new Error(message, { cause: e3 });
    }
    throw error22;
  }
}
__name(try_serialize, "try_serialize");
function create_async_iterator() {
  let resolved = -1;
  let returned = -1;
  const deferred2 = [];
  return {
    iterate: /* @__PURE__ */ __name((transform = (x) => x) => {
      return {
        [Symbol.asyncIterator]() {
          return {
            next: /* @__PURE__ */ __name(async () => {
              const next2 = deferred2[++returned];
              if (!next2) return { value: null, done: true };
              const value = await next2.promise;
              return { value: transform(value), done: false };
            }, "next")
          };
        }
      };
    }, "iterate"),
    add: /* @__PURE__ */ __name((promise) => {
      const next2 = with_resolvers();
      void next2.promise.catch(noop);
      deferred2.push(next2);
      void promise.then(
        (value) => {
          deferred2[++resolved].resolve(value);
        },
        (error22) => {
          deferred2[++resolved].reject(error22);
        }
      );
    }, "add")
  };
}
__name(create_async_iterator, "create_async_iterator");
function server_data_serializer(event, event_state, options2) {
  let promise_id = 1;
  let max_nodes = -1;
  const iterator = create_async_iterator();
  const global = get_global_name(options2);
  function get_replacer(index9) {
    return /* @__PURE__ */ __name(function replacer(thing) {
      if (typeof thing?.then === "function") {
        const id = promise_id++;
        const promise = thing.then(
          /** @param {any} data */
          (data) => ({ data })
        ).catch(
          /** @param {any} error */
          async (error22) => ({
            error: await handle_error_and_jsonify(event, event_state, options2, error22)
          })
        ).then(
          /**
           * @param {{data: any; error: any}} result
           */
          async ({ data, error: error22 }) => {
            let str;
            try {
              str = uneval(error22 ? [, error22] : [data], replacer);
            } catch {
              error22 = await handle_error_and_jsonify(
                event,
                event_state,
                options2,
                new Error(`Failed to serialize promise while rendering ${event.route.id}`)
              );
              str = uneval([, error22], replacer);
            }
            return {
              index: index9,
              str: `${global}.resolve(${id}, ${str.includes("app.decode") ? `(app) => ${str}` : `() => ${str}`})`
            };
          }
        );
        iterator.add(promise);
        return `${global}.defer(${id})`;
      } else {
        for (const key2 in options2.hooks.transport) {
          const encoded = options2.hooks.transport[key2].encode(thing);
          if (encoded) {
            return `app.decode('${key2}', ${uneval(encoded, replacer)})`;
          }
        }
      }
    }, "replacer");
  }
  __name(get_replacer, "get_replacer");
  const strings = (
    /** @type {string[]} */
    []
  );
  return {
    set_max_nodes(i) {
      max_nodes = i;
    },
    add_node(i, node) {
      try {
        if (!node) {
          strings[i] = "null";
          return;
        }
        const payload2 = { type: "data", data: node.data, uses: serialize_uses(node) };
        if (node.slash) payload2.slash = node.slash;
        strings[i] = uneval(payload2, get_replacer(i));
      } catch (e3) {
        e3.path = e3.path.slice(1);
        throw new Error(clarify_devalue_error(
          event,
          /** @type {any} */
          e3
        ), { cause: e3 });
      }
    },
    get_data(csp) {
      const open = `<script${csp.script_needs_nonce ? ` nonce="${csp.nonce}"` : ""}>`;
      const close = `<\/script>
`;
      return {
        data: `[${compact(max_nodes > -1 ? strings.slice(0, max_nodes) : strings).join(",")}]`,
        chunks: promise_id > 1 ? iterator.iterate(({ index: index9, str }) => {
          if (max_nodes > -1 && index9 >= max_nodes) {
            return "";
          }
          return open + str + close;
        }) : null
      };
    }
  };
}
__name(server_data_serializer, "server_data_serializer");
function server_data_serializer_json(event, event_state, options2) {
  let promise_id = 1;
  const iterator = create_async_iterator();
  const reducers = {
    ...Object.fromEntries(
      Object.entries(options2.hooks.transport).map(([key2, value]) => [key2, value.encode])
    ),
    /** @param {any} thing */
    Promise: /* @__PURE__ */ __name((thing) => {
      if (typeof thing?.then !== "function") {
        return;
      }
      const id = promise_id++;
      let key2 = "data";
      const promise = thing.catch(
        /** @param {any} e */
        async (e3) => {
          key2 = "error";
          return handle_error_and_jsonify(
            event,
            event_state,
            options2,
            /** @type {any} */
            e3
          );
        }
      ).then(
        /** @param {any} value */
        async (value) => {
          let str;
          try {
            str = stringify(value, reducers);
          } catch {
            const error22 = await handle_error_and_jsonify(
              event,
              event_state,
              options2,
              new Error(`Failed to serialize promise while rendering ${event.route.id}`)
            );
            key2 = "error";
            str = stringify(error22, reducers);
          }
          return `{"type":"chunk","id":${id},"${key2}":${str}}
`;
        }
      );
      iterator.add(promise);
      return id;
    }, "Promise")
  };
  const strings = (
    /** @type {string[]} */
    []
  );
  return {
    add_node(i, node) {
      try {
        if (!node) {
          strings[i] = "null";
          return;
        }
        if (node.type === "error" || node.type === "skip") {
          strings[i] = JSON.stringify(node);
          return;
        }
        strings[i] = `{"type":"data","data":${stringify(node.data, reducers)},"uses":${JSON.stringify(
          serialize_uses(node)
        )}${node.slash ? `,"slash":${JSON.stringify(node.slash)}` : ""}}`;
      } catch (e3) {
        e3.path = "data" + e3.path;
        throw new Error(clarify_devalue_error(
          event,
          /** @type {any} */
          e3
        ), { cause: e3 });
      }
    },
    get_data() {
      return {
        data: `{"type":"data","nodes":[${strings.join(",")}]}
`,
        chunks: promise_id > 1 ? iterator.iterate() : null
      };
    }
  };
}
__name(server_data_serializer_json, "server_data_serializer_json");
async function load_server_data({ event, event_state, state: state2, node, parent }) {
  if (!node?.server) return null;
  let is_tracking = true;
  const uses = {
    dependencies: /* @__PURE__ */ new Set(),
    params: /* @__PURE__ */ new Set(),
    parent: false,
    route: false,
    url: false,
    search_params: /* @__PURE__ */ new Set()
  };
  const load6 = node.server.load;
  const slash = node.server.trailingSlash;
  if (!load6) {
    return { type: "data", data: null, uses, slash };
  }
  const url = make_trackable(
    event.url,
    () => {
      if (is_tracking) {
        uses.url = true;
      }
    },
    (param) => {
      if (is_tracking) {
        uses.search_params.add(param);
      }
    }
  );
  if (state2.prerendering) {
    disable_search(url);
  }
  const result = await record_span({
    name: "sveltekit.load",
    attributes: {
      "sveltekit.load.node_id": node.server_id || "unknown",
      "sveltekit.load.node_type": get_node_type(node.server_id),
      "http.route": event.route.id || "unknown"
    },
    fn: /* @__PURE__ */ __name(async (current2) => {
      const traced_event = merge_tracing(event, current2);
      const result2 = await with_request_store(
        { event: traced_event, state: event_state },
        () => load6.call(null, {
          ...traced_event,
          fetch: /* @__PURE__ */ __name((info3, init2) => {
            new URL(info3 instanceof Request ? info3.url : info3, event.url);
            return event.fetch(info3, init2);
          }, "fetch"),
          /** @param {string[]} deps */
          depends: /* @__PURE__ */ __name((...deps) => {
            for (const dep of deps) {
              const { href } = new URL(dep, event.url);
              uses.dependencies.add(href);
            }
          }, "depends"),
          params: new Proxy(event.params, {
            get: /* @__PURE__ */ __name((target, key2) => {
              if (is_tracking) {
                uses.params.add(key2);
              }
              return target[
                /** @type {string} */
                key2
              ];
            }, "get")
          }),
          parent: /* @__PURE__ */ __name(async () => {
            if (is_tracking) {
              uses.parent = true;
            }
            return parent();
          }, "parent"),
          route: new Proxy(event.route, {
            get: /* @__PURE__ */ __name((target, key2) => {
              if (is_tracking) {
                uses.route = true;
              }
              return target[
                /** @type {'id'} */
                key2
              ];
            }, "get")
          }),
          url,
          untrack(fn) {
            is_tracking = false;
            try {
              return fn();
            } finally {
              is_tracking = true;
            }
          }
        })
      );
      return result2;
    }, "fn")
  });
  return {
    type: "data",
    data: result ?? null,
    uses,
    slash
  };
}
__name(load_server_data, "load_server_data");
async function load_data({
  event,
  event_state,
  fetched,
  node,
  parent,
  server_data_promise,
  state: state2,
  resolve_opts,
  csr
}) {
  const server_data_node = await server_data_promise;
  const load6 = node?.universal?.load;
  if (!load6) {
    return server_data_node?.data ?? null;
  }
  const result = await record_span({
    name: "sveltekit.load",
    attributes: {
      "sveltekit.load.node_id": node.universal_id || "unknown",
      "sveltekit.load.node_type": get_node_type(node.universal_id),
      "http.route": event.route.id || "unknown"
    },
    fn: /* @__PURE__ */ __name(async (current2) => {
      const traced_event = merge_tracing(event, current2);
      const child_state = { ...event_state, is_in_universal_load: true };
      return await with_request_store(
        { event: traced_event, state: child_state },
        () => load6.call(null, {
          url: event.url,
          params: event.params,
          data: server_data_node?.data ?? null,
          route: event.route,
          fetch: create_universal_fetch(event, state2, fetched, csr, resolve_opts),
          setHeaders: event.setHeaders,
          depends: noop,
          parent,
          untrack: /* @__PURE__ */ __name((fn) => fn(), "untrack"),
          tracing: traced_event.tracing
        })
      );
    }, "fn")
  });
  return result ?? null;
}
__name(load_data, "load_data");
function create_universal_fetch(event, state2, fetched, csr, resolve_opts) {
  const universal_fetch = /* @__PURE__ */ __name(async (input, init2) => {
    const cloned_body = input instanceof Request && input.body ? input.clone().body : null;
    const cloned_headers = input instanceof Request && [...input.headers].length ? new Headers(input.headers) : init2?.headers;
    let response = await event.fetch(input, init2);
    const url = new URL(input instanceof Request ? input.url : input, event.url);
    const same_origin = url.origin === event.url.origin;
    let dependency;
    if (same_origin) {
      if (state2.prerendering) {
        dependency = { response, body: null };
        state2.prerendering.dependencies.set(url.pathname, dependency);
      }
    } else if (url.protocol === "https:" || url.protocol === "http:") {
      const mode = input instanceof Request ? input.mode : init2?.mode ?? "cors";
      if (mode === "no-cors") {
        response = new Response("", {
          status: response.status,
          statusText: response.statusText,
          headers: response.headers
        });
      } else {
        const acao = response.headers.get("access-control-allow-origin");
        if (!acao || acao !== event.url.origin && acao !== "*") {
          throw new Error(
            `CORS error: ${acao ? "Incorrect" : "No"} 'Access-Control-Allow-Origin' header is present on the requested resource`
          );
        }
      }
    }
    let teed_body;
    const proxy2 = new Proxy(response, {
      get(response2, key2, receiver) {
        async function push_fetched(body, is_b64) {
          const status_number = Number(response2.status);
          if (isNaN(status_number)) {
            throw new Error(
              `response.status is not a number. value: "${response2.status}" type: ${typeof response2.status}`
            );
          }
          fetched.push({
            url: same_origin ? url.href.slice(event.url.origin.length) : url.href,
            method: event.request.method,
            request_body: (
              /** @type {string | ArrayBufferView | undefined} */
              input instanceof Request && cloned_body ? await stream_to_string(cloned_body) : init2?.body
            ),
            request_headers: cloned_headers,
            response_body: body,
            response: response2,
            is_b64
          });
        }
        __name(push_fetched, "push_fetched");
        if (key2 === "body") {
          if (response2.body === null) {
            return null;
          }
          if (teed_body) {
            return teed_body;
          }
          const [a, b] = response2.body.tee();
          void (async () => {
            let result = new Uint8Array();
            for await (const chunk of a) {
              const combined = new Uint8Array(result.length + chunk.length);
              combined.set(result, 0);
              combined.set(chunk, result.length);
              result = combined;
            }
            if (dependency) {
              dependency.body = new Uint8Array(result);
            }
            void push_fetched(base64_encode(result), true);
          })().catch(noop);
          return teed_body = b;
        }
        if (key2 === "arrayBuffer") {
          return async () => {
            const buffer2 = await response2.arrayBuffer();
            const bytes = new Uint8Array(buffer2);
            if (dependency) {
              dependency.body = bytes;
            }
            if (buffer2 instanceof ArrayBuffer) {
              await push_fetched(base64_encode(bytes), true);
            }
            return buffer2;
          };
        }
        async function text2() {
          const body = await response2.text();
          if (body === "" && NULL_BODY_STATUS.includes(response2.status)) {
            await push_fetched(void 0, false);
            return void 0;
          }
          if (!body || typeof body === "string") {
            await push_fetched(body, false);
          }
          if (dependency) {
            dependency.body = body;
          }
          return body;
        }
        __name(text2, "text2");
        if (key2 === "text") {
          return text2;
        }
        if (key2 === "json") {
          return async () => {
            const body = await text2();
            return body ? JSON.parse(body) : void 0;
          };
        }
        const value = Reflect.get(response2, key2, response2);
        if (value instanceof Function) {
          return Object.defineProperties(
            /**
             * @this {any}
             */
            function() {
              return Reflect.apply(value, this === receiver ? response2 : this, arguments);
            },
            {
              name: { value: value.name },
              length: { value: value.length }
            }
          );
        }
        return value;
      }
    });
    if (csr) {
      const get2 = response.headers.get;
      response.headers.get = (key2) => {
        const lower = key2.toLowerCase();
        const value = get2.call(response.headers, lower);
        if (value && !lower.startsWith("x-sveltekit-")) {
          const included = resolve_opts.filterSerializedResponseHeaders(lower, value);
          if (!included) {
            throw new Error(
              `Failed to get response header "${lower}" \u2014 it must be included by the \`filterSerializedResponseHeaders\` option: https://svelte.dev/docs/kit/hooks#handle (at ${event.route.id})`
            );
          }
        }
        return value;
      };
    }
    return proxy2;
  }, "universal_fetch");
  return (input, init2) => {
    const response = universal_fetch(input, init2);
    response.catch(noop);
    return response;
  };
}
__name(create_universal_fetch, "create_universal_fetch");
async function stream_to_string(stream) {
  let result = "";
  const reader = stream.getReader();
  const decoder2 = new TextDecoder();
  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      result += decoder2.decode();
      break;
    }
    result += decoder2.decode(value, { stream: true });
  }
  return result;
}
__name(stream_to_string, "stream_to_string");
var replacements2 = {
  "<": "\\u003C",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
var pattern = new RegExp(`[${Object.keys(replacements2).join("")}]`, "g");
function serialize_data(fetched, filter, prerendering = false) {
  const headers2 = {};
  let cache_control = null;
  let age = null;
  let varyAny = false;
  for (const [key2, value] of fetched.response.headers) {
    if (filter(key2, value)) {
      headers2[key2] = value;
    }
    if (key2 === "cache-control") cache_control = value;
    else if (key2 === "age") age = value;
    else if (key2 === "vary" && value.trim() === "*") varyAny = true;
  }
  const payload2 = {
    status: fetched.response.status,
    statusText: fetched.response.statusText,
    headers: headers2,
    body: fetched.response_body
  };
  const safe_payload = JSON.stringify(payload2).replace(pattern, (match) => replacements2[match]);
  const attrs = [
    'type="application/json"',
    "data-sveltekit-fetched",
    `data-url="${escape_html(fetched.url, true)}"`
  ];
  if (fetched.is_b64) {
    attrs.push("data-b64");
  }
  if (fetched.request_headers || fetched.request_body) {
    const values = [];
    if (fetched.request_headers) {
      values.push([...new Headers(fetched.request_headers)].join(","));
    }
    if (fetched.request_body) {
      values.push(fetched.request_body);
    }
    attrs.push(`data-hash="${hash(...values)}"`);
  }
  if (!prerendering && fetched.method === "GET" && cache_control && !varyAny) {
    const match = /s-maxage=(\d+)/g.exec(cache_control) ?? /max-age=(\d+)/g.exec(cache_control);
    if (match) {
      const ttl = +match[1] - +(age ?? "0");
      attrs.push(`data-ttl="${ttl}"`);
    }
  }
  return `<script ${attrs.join(" ")}>${safe_payload}<\/script>`;
}
__name(serialize_data, "serialize_data");
function sha2562(data) {
  if (!key[0]) precompute();
  const out = init.slice(0);
  const array2 = encode(data);
  for (let i = 0; i < array2.length; i += 16) {
    const w = array2.subarray(i, i + 16);
    let tmp;
    let a;
    let b;
    let out0 = out[0];
    let out1 = out[1];
    let out2 = out[2];
    let out3 = out[3];
    let out4 = out[4];
    let out5 = out[5];
    let out6 = out[6];
    let out7 = out[7];
    for (let i2 = 0; i2 < 64; i2++) {
      if (i2 < 16) {
        tmp = w[i2];
      } else {
        a = w[i2 + 1 & 15];
        b = w[i2 + 14 & 15];
        tmp = w[i2 & 15] = (a >>> 7 ^ a >>> 18 ^ a >>> 3 ^ a << 25 ^ a << 14) + (b >>> 17 ^ b >>> 19 ^ b >>> 10 ^ b << 15 ^ b << 13) + w[i2 & 15] + w[i2 + 9 & 15] | 0;
      }
      tmp = tmp + out7 + (out4 >>> 6 ^ out4 >>> 11 ^ out4 >>> 25 ^ out4 << 26 ^ out4 << 21 ^ out4 << 7) + (out6 ^ out4 & (out5 ^ out6)) + key[i2];
      out7 = out6;
      out6 = out5;
      out5 = out4;
      out4 = out3 + tmp | 0;
      out3 = out2;
      out2 = out1;
      out1 = out0;
      out0 = tmp + (out1 & out2 ^ out3 & (out1 ^ out2)) + (out1 >>> 2 ^ out1 >>> 13 ^ out1 >>> 22 ^ out1 << 30 ^ out1 << 19 ^ out1 << 10) | 0;
    }
    out[0] = out[0] + out0 | 0;
    out[1] = out[1] + out1 | 0;
    out[2] = out[2] + out2 | 0;
    out[3] = out[3] + out3 | 0;
    out[4] = out[4] + out4 | 0;
    out[5] = out[5] + out5 | 0;
    out[6] = out[6] + out6 | 0;
    out[7] = out[7] + out7 | 0;
  }
  const bytes = new Uint8Array(out.buffer);
  reverse_endianness(bytes);
  return btoa(String.fromCharCode(...bytes));
}
__name(sha2562, "sha256");
var init = new Uint32Array(8);
var key = new Uint32Array(64);
function precompute() {
  function frac(x) {
    return (x - Math.floor(x)) * 4294967296;
  }
  __name(frac, "frac");
  let prime = 2;
  for (let i = 0; i < 64; prime++) {
    let is_prime = true;
    for (let factor = 2; factor * factor <= prime; factor++) {
      if (prime % factor === 0) {
        is_prime = false;
        break;
      }
    }
    if (is_prime) {
      if (i < 8) {
        init[i] = frac(prime ** (1 / 2));
      }
      key[i] = frac(prime ** (1 / 3));
      i++;
    }
  }
}
__name(precompute, "precompute");
function reverse_endianness(bytes) {
  for (let i = 0; i < bytes.length; i += 4) {
    const a = bytes[i + 0];
    const b = bytes[i + 1];
    const c2 = bytes[i + 2];
    const d = bytes[i + 3];
    bytes[i + 0] = d;
    bytes[i + 1] = c2;
    bytes[i + 2] = b;
    bytes[i + 3] = a;
  }
}
__name(reverse_endianness, "reverse_endianness");
function encode(str) {
  const encoded = text_encoder.encode(str);
  const length = encoded.length * 8;
  const size = 512 * Math.ceil((length + 65) / 512);
  const bytes = new Uint8Array(size / 8);
  bytes.set(encoded);
  bytes[encoded.length] = 128;
  reverse_endianness(bytes);
  const words = new Uint32Array(bytes.buffer);
  words[words.length - 2] = Math.floor(length / 4294967296);
  words[words.length - 1] = length;
  return words;
}
__name(encode, "encode");
var array = new Uint8Array(16);
function generate_nonce() {
  crypto.getRandomValues(array);
  return btoa(String.fromCharCode(...array));
}
__name(generate_nonce, "generate_nonce");
var quoted = /* @__PURE__ */ new Set([
  "self",
  "unsafe-eval",
  "unsafe-hashes",
  "unsafe-inline",
  "none",
  "strict-dynamic",
  "report-sample",
  "wasm-unsafe-eval",
  "script"
]);
var crypto_pattern = /^(nonce|sha\d\d\d)-/;
var BaseProvider = class {
  static {
    __name(this, "BaseProvider");
  }
  /** @type {boolean} */
  #use_hashes;
  /** @type {boolean} */
  #script_needs_csp;
  /** @type {boolean} */
  #script_src_needs_csp;
  /** @type {boolean} */
  #script_src_elem_needs_csp;
  /** @type {boolean} */
  #style_needs_csp;
  /** @type {boolean} */
  #style_src_needs_csp;
  /** @type {boolean} */
  #style_src_attr_needs_csp;
  /** @type {boolean} */
  #style_src_elem_needs_csp;
  /** @type {import('types').CspDirectives} */
  #directives;
  /** @type {Set<import('types').Csp.Source>} */
  #script_src;
  /** @type {Set<import('types').Csp.Source>} */
  #script_src_elem;
  /** @type {Set<import('types').Csp.Source>} */
  #style_src;
  /** @type {Set<import('types').Csp.Source>} */
  #style_src_attr;
  /** @type {Set<import('types').Csp.Source>} */
  #style_src_elem;
  /** @type {boolean} */
  script_needs_nonce;
  /** @type {boolean} */
  style_needs_nonce;
  /** @type {boolean} */
  script_needs_hash;
  /** @type {string} */
  #nonce;
  /**
   * @param {boolean} use_hashes
   * @param {import('types').CspDirectives} directives
   * @param {string} nonce
   */
  constructor(use_hashes, directives, nonce) {
    this.#use_hashes = use_hashes;
    this.#directives = directives;
    const d = this.#directives;
    this.#script_src = /* @__PURE__ */ new Set();
    this.#script_src_elem = /* @__PURE__ */ new Set();
    this.#style_src = /* @__PURE__ */ new Set();
    this.#style_src_attr = /* @__PURE__ */ new Set();
    this.#style_src_elem = /* @__PURE__ */ new Set();
    const effective_script_src = d["script-src"] || d["default-src"];
    const script_src_elem = d["script-src-elem"];
    const effective_style_src = d["style-src"] || d["default-src"];
    const style_src_attr = d["style-src-attr"];
    const style_src_elem = d["style-src-elem"];
    const style_needs_csp = /* @__PURE__ */ __name((directive) => !!directive && !directive.some((value) => value === "unsafe-inline"), "style_needs_csp");
    const script_needs_csp = /* @__PURE__ */ __name((directive) => !!directive && (!directive.some((value) => value === "unsafe-inline") || directive.some((value) => value === "strict-dynamic")), "script_needs_csp");
    this.#script_src_needs_csp = script_needs_csp(effective_script_src);
    this.#script_src_elem_needs_csp = script_needs_csp(script_src_elem);
    this.#style_src_needs_csp = style_needs_csp(effective_style_src);
    this.#style_src_attr_needs_csp = style_needs_csp(style_src_attr);
    this.#style_src_elem_needs_csp = style_needs_csp(style_src_elem);
    this.#script_needs_csp = this.#script_src_needs_csp || this.#script_src_elem_needs_csp;
    this.#style_needs_csp = this.#style_src_needs_csp || this.#style_src_attr_needs_csp || this.#style_src_elem_needs_csp;
    this.script_needs_nonce = this.#script_needs_csp && !this.#use_hashes;
    this.style_needs_nonce = this.#style_needs_csp && !this.#use_hashes;
    this.script_needs_hash = this.#script_needs_csp && this.#use_hashes;
    this.#nonce = nonce;
  }
  /** @param {string} content */
  add_script(content) {
    if (!this.#script_needs_csp) return;
    const source2 = this.#use_hashes ? `sha256-${sha2562(content)}` : `nonce-${this.#nonce}`;
    if (this.#script_src_needs_csp) {
      this.#script_src.add(source2);
    }
    if (this.#script_src_elem_needs_csp) {
      this.#script_src_elem.add(source2);
    }
  }
  /** @param {`sha256-${string}`[]} hashes */
  add_script_hashes(hashes) {
    for (const hash2 of hashes) {
      if (this.#script_src_needs_csp) {
        this.#script_src.add(hash2);
      }
      if (this.#script_src_elem_needs_csp) {
        this.#script_src_elem.add(hash2);
      }
    }
  }
  /** @param {string} content */
  add_style(content) {
    if (!this.#style_needs_csp) return;
    const source2 = this.#use_hashes ? `sha256-${sha2562(content)}` : `nonce-${this.#nonce}`;
    if (this.#style_src_needs_csp) {
      this.#style_src.add(source2);
    }
    if (this.#style_src_attr_needs_csp) {
      this.#style_src_attr.add(source2);
    }
    if (this.#style_src_elem_needs_csp) {
      const sha256_empty_comment_hash = "sha256-9OlNO0DNEeaVzHL4RZwCLsBHA8WBQ8toBp/4F5XV2nc=";
      const d = this.#directives;
      if (d["style-src-elem"] && !d["style-src-elem"].includes(sha256_empty_comment_hash) && !this.#style_src_elem.has(sha256_empty_comment_hash)) {
        this.#style_src_elem.add(sha256_empty_comment_hash);
      }
      if (source2 !== sha256_empty_comment_hash) {
        this.#style_src_elem.add(source2);
      }
    }
  }
  /**
   * @param {boolean} [is_meta]
   */
  get_header(is_meta = false) {
    const header = [];
    const directives = { ...this.#directives };
    if (this.#style_src.size > 0) {
      directives["style-src"] = [
        ...directives["style-src"] || directives["default-src"] || [],
        ...this.#style_src
      ];
    }
    if (this.#style_src_attr.size > 0) {
      directives["style-src-attr"] = [
        ...directives["style-src-attr"] || [],
        ...this.#style_src_attr
      ];
    }
    if (this.#style_src_elem.size > 0) {
      directives["style-src-elem"] = [
        ...directives["style-src-elem"] || [],
        ...this.#style_src_elem
      ];
    }
    if (this.#script_src.size > 0) {
      directives["script-src"] = [
        ...directives["script-src"] || directives["default-src"] || [],
        ...this.#script_src
      ];
    }
    if (this.#script_src_elem.size > 0) {
      directives["script-src-elem"] = [
        ...directives["script-src-elem"] || [],
        ...this.#script_src_elem
      ];
    }
    for (const key2 in directives) {
      if (is_meta && (key2 === "frame-ancestors" || key2 === "report-uri" || key2 === "sandbox")) {
        continue;
      }
      const value = (
        /** @type {string[] | true} */
        directives[key2]
      );
      if (!value) continue;
      const directive = [key2];
      if (Array.isArray(value)) {
        value.forEach((value2) => {
          if (quoted.has(value2) || crypto_pattern.test(value2)) {
            directive.push(`'${value2}'`);
          } else {
            directive.push(value2);
          }
        });
      }
      header.push(directive.join(" "));
    }
    return header.join("; ");
  }
};
var CspProvider = class extends BaseProvider {
  static {
    __name(this, "CspProvider");
  }
  get_meta() {
    const content = this.get_header(true);
    if (!content) {
      return;
    }
    return `<meta http-equiv="content-security-policy" content="${escape_html(content, true)}">`;
  }
};
var CspReportOnlyProvider = class extends BaseProvider {
  static {
    __name(this, "CspReportOnlyProvider");
  }
  /**
   * @param {boolean} use_hashes
   * @param {import('types').CspDirectives} directives
   * @param {string} nonce
   */
  constructor(use_hashes, directives, nonce) {
    super(use_hashes, directives, nonce);
    if (Object.values(directives).filter((v) => !!v).length > 0) {
      const has_report_to = directives["report-to"]?.length ?? 0 > 0;
      const has_report_uri = directives["report-uri"]?.length ?? 0 > 0;
      if (!has_report_to && !has_report_uri) {
        throw Error(
          "`content-security-policy-report-only` must be specified with either the `report-to` or `report-uri` directives, or both"
        );
      }
    }
  }
};
var Csp = class {
  static {
    __name(this, "Csp");
  }
  /** @readonly */
  nonce = generate_nonce();
  /** @type {CspProvider} */
  csp_provider;
  /** @type {CspReportOnlyProvider} */
  report_only_provider;
  /**
   * @param {import('./types.js').CspConfig} config
   * @param {import('./types.js').CspOpts} opts
   */
  constructor({ mode, directives, reportOnly }, { prerender }) {
    const use_hashes = mode === "hash" || mode === "auto" && prerender;
    this.csp_provider = new CspProvider(use_hashes, directives, this.nonce);
    this.report_only_provider = new CspReportOnlyProvider(use_hashes, reportOnly, this.nonce);
  }
  get script_needs_hash() {
    return this.csp_provider.script_needs_hash || this.report_only_provider.script_needs_hash;
  }
  get script_needs_nonce() {
    return this.csp_provider.script_needs_nonce || this.report_only_provider.script_needs_nonce;
  }
  get style_needs_nonce() {
    return this.csp_provider.style_needs_nonce || this.report_only_provider.style_needs_nonce;
  }
  /** @param {string} content */
  add_script(content) {
    this.csp_provider.add_script(content);
    this.report_only_provider.add_script(content);
  }
  /** @param {`sha256-${string}`[]} hashes */
  add_script_hashes(hashes) {
    this.csp_provider.add_script_hashes(hashes);
    this.report_only_provider.add_script_hashes(hashes);
  }
  /** @param {string} content */
  add_style(content) {
    this.csp_provider.add_style(content);
    this.report_only_provider.add_style(content);
  }
};
function generate_route_object(route, url, client) {
  const { errors, layouts, leaf } = route;
  const nodes = [...errors, ...layouts.map((l) => l?.[1]), leaf[1]].filter((n2) => typeof n2 === "number").map((n2) => `'${n2}': () => ${create_client_import(client.nodes?.[n2], url)}`).join(",\n		");
  return [
    `{
	id: ${s(route.id)}`,
    `errors: ${s(route.errors)}`,
    `layouts: ${s(route.layouts)}`,
    `leaf: ${s(route.leaf)}`,
    `nodes: {
		${nodes}
	}
}`
  ].join(",\n	");
}
__name(generate_route_object, "generate_route_object");
function create_client_import(import_path, url) {
  if (!import_path) return "Promise.resolve({})";
  if (import_path[0] === "/") {
    return `import('${import_path}')`;
  }
  if (assets !== "") {
    return `import('${assets}/${import_path}')`;
  }
  let path = get_relative_path(url.pathname, `${base}/${import_path}`);
  if (path[0] !== ".") path = `./${path}`;
  return `import('${path}')`;
}
__name(create_client_import, "create_client_import");
async function resolve_route(resolved_path, url, manifest2) {
  if (!manifest2._.client?.routes) {
    return text("Server-side route resolution disabled", { status: 400 });
  }
  const matchers = await manifest2._.matchers();
  const result = find_route(resolved_path, manifest2._.client.routes, matchers);
  return create_server_routing_response(
    result?.route ?? null,
    result?.params ?? {},
    url,
    manifest2._.client
  ).response;
}
__name(resolve_route, "resolve_route");
function create_server_routing_response(route, params, url, client) {
  const headers2 = new Headers({
    "content-type": "application/javascript; charset=utf-8"
  });
  if (route) {
    const csr_route = generate_route_object(route, url, client);
    const body = `${create_css_import(route, url, client)}
export const route = ${csr_route}; export const params = ${JSON.stringify(params)};`;
    return { response: text(body, { headers: headers2 }), body };
  } else {
    return { response: text("", { headers: headers2 }), body: "" };
  }
}
__name(create_server_routing_response, "create_server_routing_response");
function create_css_import(route, url, client) {
  const { errors, layouts, leaf } = route;
  let css = "";
  for (const node of [...errors, ...layouts.map((l) => l?.[1]), leaf[1]]) {
    if (typeof node !== "number") continue;
    const node_css = client.css?.[node];
    for (const css_path of node_css ?? []) {
      css += `'${assets || base}/${css_path}',`;
    }
  }
  if (!css) return "";
  return `${create_client_import(client.start, url)}.then(x => x.load_css([${css}]));`;
}
__name(create_css_import, "create_css_import");
async function handle_remote_call(event, state2, options2, manifest2, id) {
  return record_span({
    name: "sveltekit.remote.call",
    attributes: {},
    fn: /* @__PURE__ */ __name((current2) => {
      const traced_event = merge_tracing(event, current2);
      return with_request_store(
        { event: traced_event, state: state2 },
        () => handle_remote_call_internal(traced_event, state2, options2, manifest2, id)
      );
    }, "fn")
  });
}
__name(handle_remote_call, "handle_remote_call");
async function handle_remote_call_internal(event, state2, options2, manifest2, id) {
  const [hash2, name, additional_args] = id.split("/");
  const remotes = manifest2._.remotes;
  if (!remotes[hash2]) error3(404);
  const module = await remotes[hash2]();
  const fn = module.default[name];
  if (!fn) error3(404);
  const internals = fn.__;
  const transport = options2.hooks.transport;
  event.tracing.current.setAttributes({
    "sveltekit.remote.call.type": internals.type,
    "sveltekit.remote.call.name": internals.name
  });
  const headers2 = state2.prerendering ? void 0 : { "cache-control": "private, no-store" };
  try {
    const data = {};
    switch (internals.type) {
      case "query_live": {
        let send2 = /* @__PURE__ */ __name(function(controller, payload3) {
          controller.enqueue(encoder.encode("data: " + JSON.stringify(payload3) + "\n\n"));
        }, "send");
        if (event.request.method !== "GET") {
          throw new SvelteKitError(
            405,
            "Method Not Allowed",
            `\`query.live\` functions must be invoked via GET request, not ${event.request.method}`
          );
        }
        const payload2 = (
          /** @type {string} */
          new URL(event.request.url).searchParams.get("payload")
        );
        const generator = internals.run(event, state2, parse_remote_arg(payload2, transport));
        const encoder = new TextEncoder();
        let closed = false;
        let result = void 0;
        async function cancel() {
          if (closed) return;
          closed = true;
          await generator.return(void 0);
        }
        __name(cancel, "cancel");
        event.request.signal.addEventListener("abort", cancel, { once: true });
        return new Response(
          new ReadableStream({
            async pull(controller) {
              if (event.request.signal.aborted) {
                await cancel();
                controller.close();
                return;
              }
              try {
                while (true) {
                  const { value, done } = await generator.next();
                  if (done) {
                    await cancel();
                    controller.close();
                    return;
                  }
                  if (result !== (result = stringify2(value, transport))) {
                    send2(controller, {
                      type: "result",
                      result
                    });
                    return;
                  }
                }
              } catch (error22) {
                if (!event.request.signal.aborted) {
                  if (error22 instanceof Redirect) {
                    send2(controller, {
                      type: "redirect",
                      location: error22.location
                    });
                  } else {
                    const status = error22 instanceof HttpError || error22 instanceof SvelteKitError ? error22.status : 500;
                    send2(controller, {
                      type: "error",
                      error: await handle_error_and_jsonify(event, state2, options2, error22),
                      status
                    });
                  }
                }
                await cancel();
                controller.close();
              }
            },
            cancel
          }),
          {
            headers: {
              "cache-control": "private, no-store",
              "content-type": "text/event-stream"
            }
          }
        );
      }
      case "query_batch": {
        if (event.request.method !== "POST") {
          throw new SvelteKitError(
            405,
            "Method Not Allowed",
            `\`query.batch\` functions must be invoked via POST request, not ${event.request.method}`
          );
        }
        const { payloads } = await event.request.json();
        const args = await Promise.all(
          payloads.map((payload2) => parse_remote_arg(payload2, transport))
        );
        data._ = await with_request_store({ event, state: state2 }, () => internals.run(args, options2));
        break;
      }
      case "form": {
        if (event.request.method !== "POST") {
          throw new SvelteKitError(
            405,
            "Method Not Allowed",
            `\`form\` functions must be invoked via POST request, not ${event.request.method}`
          );
        }
        if (!is_form_content_type(event.request)) {
          throw new SvelteKitError(
            415,
            "Unsupported Media Type",
            `\`form\` functions expect form-encoded data \u2014 received ${event.request.headers.get(
              "content-type"
            )}`
          );
        }
        const { data: input, meta, form_data } = await deserialize_binary_form(event.request);
        state2.remote.requested = create_requested_map(meta.remote_refreshes);
        if (additional_args && !("id" in input)) {
          input.id = JSON.parse(decodeURIComponent(additional_args));
        }
        const fn2 = internals.fn;
        data._ = await with_request_store(
          { event, state: { ...state2, is_in_remote_form_or_command: true } },
          () => fn2(input, meta, form_data)
        );
        if (data._.issues) {
          return json(
            /** @type {RemoteFunctionResponse} */
            {
              type: "result",
              data: stringify2(data, transport)
            },
            { headers: headers2 }
          );
        }
        break;
      }
      case "command": {
        const { payload: payload2, refreshes } = await event.request.json();
        state2.remote.requested = create_requested_map(refreshes);
        const arg = parse_remote_arg(payload2, transport);
        data._ = await with_request_store(
          { event, state: { ...state2, is_in_remote_form_or_command: true } },
          () => fn(arg)
        );
        break;
      }
      case "prerender": {
        data._ = await with_request_store(
          { event, state: state2 },
          () => fn(parse_remote_arg(additional_args, transport))
        );
        break;
      }
      case "query": {
        const payload2 = (
          /** @type {string} */
          // new URL(...) necessary because we're hiding the URL from the user in the event object
          new URL(event.request.url).searchParams.get("payload")
        );
        data._ = await with_request_store(
          { event, state: state2 },
          () => fn(parse_remote_arg(payload2, transport))
        );
        break;
      }
    }
    await collect_remote_data(data, event, state2, options2);
    return json(
      /** @type {RemoteFunctionResponse} */
      {
        type: "result",
        data: stringify2(data, transport)
      },
      { headers: headers2 }
    );
  } catch (error22) {
    if (error22 instanceof Redirect) {
      const data = await collect_remote_data({ redirect: error22.location }, event, state2, options2);
      return json(
        /** @type {RemoteFunctionResponse} */
        {
          type: "result",
          data: stringify2(data, transport)
        },
        { headers: headers2 }
      );
    }
    const status = error22 instanceof HttpError || error22 instanceof SvelteKitError ? error22.status : 500;
    return json(
      /** @type {RemoteFunctionResponse} */
      {
        type: "error",
        error: await handle_error_and_jsonify(event, state2, options2, error22),
        status
      },
      {
        // By setting a non-200 during prerendering we fail the prerender process (unless handleHttpError handles it).
        // Errors at runtime will be passed to the client and are handled there
        status: state2.prerendering ? status : void 0,
        headers: {
          "cache-control": "private, no-store"
        }
      }
    );
  }
}
__name(handle_remote_call_internal, "handle_remote_call_internal");
async function collect_remote_data(data, event, state2, options2) {
  async function convert_error(error22) {
    const status = error22 instanceof HttpError || error22 instanceof SvelteKitError ? error22.status : 500;
    return [status, await handle_error_and_jsonify(event, state2, options2, error22)];
  }
  __name(convert_error, "convert_error");
  const promises = [];
  if (state2.remote.explicit) {
    for (const [remote_key, { internals, promise }] of state2.remote.explicit) {
      data.r = true;
      const type = (
        /** @type {'p' | 'q' | 'l'} */
        internals.type === "query_live" ? "l" : internals.type[0]
      );
      await promise.then(
        (v) => {
          ((data[type] ??= {})[remote_key] ??= {}).v = v;
        },
        async (e3) => {
          if (e3 instanceof Redirect) {
            return;
          }
          ((data[type] ??= {})[remote_key] ??= {}).e = await convert_error(e3);
        }
      );
    }
  }
  await Promise.all(promises);
  if (state2.remote.implicit) {
    for (const [internals, record] of state2.remote.implicit) {
      if (!internals.id) continue;
      for (const key2 in record) {
        const remote_key = internals.type === "form" ? key2 : create_remote_key(internals.id, key2);
        const type = (
          /** @type {'p' | 'q' | 'l' | 'f'} */
          internals.type === "query_live" ? "l" : internals.type[0]
        );
        const promise = state2.remote.data?.get(internals)?.[key2] ?? record[key2]();
        let resolved = true;
        await Promise.race([
          Promise.resolve(promise).then(
            (v) => {
              if (resolved) {
                ((data[type] ??= {})[remote_key] ??= {}).v = v;
              }
            },
            (e3) => {
              if (e3 instanceof Redirect) {
                return;
              }
              if (resolved) {
                promises.push(
                  convert_error(e3).then((e22) => {
                    ((data[type] ??= {})[remote_key] ??= {}).e = e22;
                  })
                );
              }
            }
          ),
          Promise.resolve().then(() => resolved = false)
        ]);
      }
    }
  }
  await Promise.all(promises);
  return data;
}
__name(collect_remote_data, "collect_remote_data");
function create_requested_map(refreshes) {
  const requested = /* @__PURE__ */ new Map();
  for (const key2 of refreshes ?? []) {
    const parts = split_remote_key(key2);
    const existing = requested.get(parts.id);
    if (existing) {
      existing.push(parts.payload);
    } else {
      requested.set(parts.id, [parts.payload]);
    }
  }
  return requested;
}
__name(create_requested_map, "create_requested_map");
async function handle_remote_form_post(event, state2, manifest2, id) {
  return record_span({
    name: "sveltekit.remote.form.post",
    attributes: {},
    fn: /* @__PURE__ */ __name((current2) => {
      const traced_event = merge_tracing(event, current2);
      return with_request_store(
        { event: traced_event, state: state2 },
        () => handle_remote_form_post_internal(traced_event, state2, manifest2, id)
      );
    }, "fn")
  });
}
__name(handle_remote_form_post, "handle_remote_form_post");
async function handle_remote_form_post_internal(event, state2, manifest2, id) {
  const [hash2, name, ...rest] = id.split("/");
  const action_id = rest.join("/");
  const remotes = manifest2._.remotes;
  const module = await remotes[hash2]?.();
  let form = (
    /** @type {RemoteForm<any, any>} */
    module?.default[name]
  );
  if (!form) {
    event.setHeaders({
      // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/405
      // "The server must generate an Allow header field in a 405 status code response"
      allow: "GET"
    });
    return {
      type: "error",
      error: new SvelteKitError(
        405,
        "Method Not Allowed",
        `POST method not allowed. No form actions exist for ${"this page"}`
      )
    };
  }
  if (action_id) {
    form = with_request_store({ event, state: state2 }, () => form.for(JSON.parse(action_id)));
  }
  try {
    const fn = (
      /** @type {RemoteFormInternals} */
      /** @type {any} */
      form.__.fn
    );
    const { data, meta, form_data } = await deserialize_binary_form(event.request);
    if (action_id && !("id" in data)) {
      data.id = JSON.parse(decodeURIComponent(action_id));
    }
    await with_request_store(
      { event, state: { ...state2, is_in_remote_form_or_command: true } },
      () => fn(data, meta, form_data)
    );
    return {
      type: "success",
      status: 200
    };
  } catch (e3) {
    const err = normalize_error(e3);
    if (err instanceof Redirect) {
      return {
        type: "redirect",
        status: err.status,
        location: err.location
      };
    }
    return {
      type: "error",
      error: check_incorrect_fail_use(err)
    };
  }
}
__name(handle_remote_form_post_internal, "handle_remote_form_post_internal");
function get_remote_id(url) {
  return url.pathname.startsWith(`${base}/${app_dir}/remote/`) && url.pathname.replace(`${base}/${app_dir}/remote/`, "");
}
__name(get_remote_id, "get_remote_id");
function get_remote_action(url) {
  return url.searchParams.get("/remote");
}
__name(get_remote_action, "get_remote_action");
var updated = {
  ...readable(false),
  check: /* @__PURE__ */ __name(() => false, "check")
};
async function render_response({
  branch: branch2,
  fetched,
  options: options2,
  manifest: manifest2,
  state: state2,
  page_config,
  status,
  error: error22 = null,
  event,
  event_state,
  resolve_opts,
  action_result,
  data_serializer,
  error_components
}) {
  if (state2.prerendering) {
    if (options2.csp.mode === "nonce") {
      throw new Error('Cannot use prerendering if config.kit.csp.mode === "nonce"');
    }
    if (options2.app_template_contains_nonce) {
      throw new Error("Cannot use prerendering if page template contains %sveltekit.nonce%");
    }
  }
  const { client } = manifest2._;
  const modulepreloads = new Set(client?.imports);
  const stylesheets9 = new Set(client?.stylesheets);
  const fonts9 = new Set(client?.fonts);
  const link_headers = /* @__PURE__ */ new Set();
  const inline_styles = /* @__PURE__ */ new Map();
  let rendered;
  const form_value = action_result?.type === "success" || action_result?.type === "failure" ? action_result.data ?? null : null;
  let base$1 = base;
  let assets$1 = assets;
  let base_expression = s(base);
  const csp = new Csp(options2.csp, {
    prerender: !!state2.prerendering
  });
  {
    if (!state2.prerendering?.fallback) {
      const pathname = event.isDataRequest ? add_data_suffix2(event.url.pathname) : event.url.pathname;
      const segments = pathname.slice(base.length).split("/").slice(2);
      base$1 = segments.map(() => "..").join("/") || ".";
      base_expression = `new URL(${s(base$1)}, location).pathname.slice(0, -1)`;
      if (!assets || assets[0] === "/" && assets !== SVELTE_KIT_ASSETS) {
        assets$1 = base$1;
      }
    } else if (options2.hash_routing) {
      base_expression = "new URL('.', location).pathname.slice(0, -1)";
    }
  }
  if (page_config.ssr) {
    const props = {
      stores: {
        page: writable(null),
        navigating: writable(null),
        updated
      },
      constructors: await Promise.all(
        branch2.map(({ node }) => {
          if (!node.component) {
            throw new Error(`Missing +page.svelte component for route ${event.route.id}`);
          }
          return node.component();
        })
      ),
      form: form_value
    };
    if (error_components) {
      if (error22) {
        props.error = error22;
      }
      props.errors = error_components;
    }
    let data2 = {};
    for (let i = 0; i < branch2.length; i += 1) {
      data2 = { ...data2, ...branch2[i].data };
      props[`data_${i}`] = data2;
    }
    props.page = {
      error: error22,
      params: (
        /** @type {Record<string, any>} */
        event.params
      ),
      route: event.route,
      status,
      url: event.url,
      data: data2,
      form: form_value,
      state: {}
    };
    const render_opts = {
      context: /* @__PURE__ */ new Map([
        [
          "__request__",
          {
            page: props.page
          }
        ]
      ]),
      csp: csp.script_needs_nonce ? { nonce: csp.nonce } : { hash: csp.script_needs_hash },
      transformError: error_components ? (
        /** @param {unknown} e */
        (async (e3) => {
          if (isRedirect(e3)) {
            throw e3;
          }
          const transformed2 = await handle_error_and_jsonify(event, event_state, options2, e3);
          props.page.error = props.error = error22 = transformed2;
          props.page.status = status = get_status(e3);
          return transformed2;
        })
      ) : void 0
    };
    const fetch2 = globalThis.fetch;
    try {
      if (DEV) ;
      const state22 = { ...event_state, is_in_render: true };
      rendered = await with_request_store({ event, state: state22 }, async () => {
        if (relative) override({ base: base$1, assets: assets$1 });
        const maybe_promise = options2.root.render(props, render_opts);
        const rendered2 = options2.async && "then" in maybe_promise ? (
          /** @type {ReturnType<typeof options.root.render> & Promise<any>} */
          maybe_promise.then((r3) => r3)
        ) : maybe_promise;
        if (options2.async) {
          reset();
        }
        const { head: head22, html: html2, css, hashes } = (
          /** @type {ReturnType<typeof options.root.render>} */
          options2.async ? await rendered2 : rendered2
        );
        if (hashes) {
          csp.add_script_hashes(hashes.script);
        }
        return { head: head22, html: html2, css, hashes };
      });
    } finally {
      reset();
    }
  } else {
    rendered = { head: "", html: "", css: { code: "", map: null }, hashes: { script: [] } };
  }
  for (const { node } of branch2) {
    for (const url of node.imports) modulepreloads.add(url);
    for (const url of node.stylesheets) stylesheets9.add(url);
    for (const url of node.fonts) fonts9.add(url);
    if (node.inline_styles && !client?.inline) {
      Object.entries(await node.inline_styles()).forEach(([filename, css]) => {
        if (typeof css === "string") {
          inline_styles.set(filename, css);
          return;
        }
        inline_styles.set(filename, css(`${assets$1}/${app_dir}/immutable/assets`, assets$1));
      });
    }
  }
  const head2 = new Head(rendered.head, !!state2.prerendering);
  let body = rendered.html;
  const prefixed = /* @__PURE__ */ __name((path) => {
    if (path.startsWith("/")) {
      return base + path;
    }
    return `${assets$1}/${path}`;
  }, "prefixed");
  const style = client?.inline ? client.inline?.style : Array.from(inline_styles.values()).join("\n");
  if (style) {
    const attributes2 = [];
    if (csp.style_needs_nonce) attributes2.push(`nonce="${csp.nonce}"`);
    csp.add_style(style);
    head2.add_style(style, attributes2);
  }
  for (const dep of stylesheets9) {
    const path = prefixed(dep);
    const attributes2 = ['rel="stylesheet"'];
    if (inline_styles.has(dep)) {
      attributes2.push("disabled", 'media="(max-width: 0)"');
    } else {
      if (resolve_opts.preload({ type: "css", path })) {
        link_headers.add(`<${encodeURI(path)}>; rel="preload"; as="style"; nopush`);
      }
    }
    head2.add_stylesheet(path, attributes2);
  }
  for (const dep of fonts9) {
    const path = prefixed(dep);
    if (resolve_opts.preload({ type: "font", path })) {
      const ext = dep.slice(dep.lastIndexOf(".") + 1);
      head2.add_link_tag(path, ['rel="preload"', 'as="font"', `type="font/${ext}"`, "crossorigin"]);
      link_headers.add(
        `<${encodeURI(path)}>; rel="preload"; as="font"; type="font/${ext}"; crossorigin; nopush`
      );
    }
  }
  const global = get_global_name(options2);
  const { data, chunks } = data_serializer.get_data(csp);
  if (page_config.ssr && page_config.csr) {
    body += `
			${fetched.map(
      (item) => serialize_data(item, resolve_opts.filterSerializedResponseHeaders, !!state2.prerendering)
    ).join("\n			")}`;
  }
  if (page_config.csr && client) {
    const route = client.routes?.find((r3) => r3.id === event.route.id) ?? null;
    const load_env_eagerly = client.uses_env_dynamic_public && !!state2.prerendering;
    if (load_env_eagerly) {
      modulepreloads.add(`${app_dir}/env.js`);
    }
    if (!client.inline) {
      const included_modulepreloads = Array.from(modulepreloads, (dep) => prefixed(dep)).filter(
        (path) => resolve_opts.preload({ type: "js", path })
      );
      for (const path of included_modulepreloads) {
        link_headers.add(`<${encodeURI(path)}>; rel="modulepreload"; nopush`);
        if (options2.preload_strategy !== "modulepreload") {
          head2.add_script_preload(path);
        } else {
          head2.add_link_tag(path, ['rel="modulepreload"']);
        }
      }
    }
    if (client.routes && state2.prerendering && !state2.prerendering.fallback) {
      const pathname = add_resolution_suffix2(event.url.pathname);
      state2.prerendering.dependencies.set(
        pathname,
        create_server_routing_response(route, event.params, new URL(pathname, event.url), client)
      );
    }
    const blocks = [];
    const properties = [`base: ${base_expression}`];
    if (assets) {
      properties.push(`assets: ${s(assets)}`);
    }
    if (client.uses_env_dynamic_public) {
      properties.push(`env: ${load_env_eagerly ? "null" : s(public_env)}`);
    }
    if (chunks) {
      blocks.push("const deferred = new Map();");
      properties.push(`defer: (id) => new Promise((fulfil, reject) => {
							deferred.set(id, { fulfil, reject });
						})`);
      let app_declaration = "";
      if (Object.keys(options2.hooks.transport).length > 0) {
        if (client.inline) {
          app_declaration = `const app = ${global}.app.app;`;
        } else if (client.app) {
          app_declaration = `const app = await import(${s(prefixed(client.app))});`;
        } else {
          app_declaration = `const { app } = await import(${s(prefixed(client.start))});`;
        }
      }
      const prelude = app_declaration ? `${app_declaration}
							const [data, error] = fn(app);` : `const [data, error] = fn();`;
      properties.push(`resolve: async (id, fn) => {
							${prelude}

							const try_to_resolve = () => {
								if (!deferred.has(id)) {
									setTimeout(try_to_resolve, 0);
									return;
								}
								const { fulfil, reject } = deferred.get(id);
								deferred.delete(id);
								if (error) reject(error);
								else fulfil(data);
							}
							try_to_resolve();
						}`);
    }
    blocks.push(`${global} = {
						${properties.join(",\n						")}
					};`);
    const args = ["element"];
    blocks.push("const element = document.currentScript.parentElement;");
    if (page_config.ssr) {
      const serialized = { form: "null", error: "null" };
      if (form_value) {
        serialized.form = uneval_action_response(
          form_value,
          /** @type {string} */
          event.route.id,
          options2.hooks.transport
        );
      }
      if (error22) {
        serialized.error = uneval(error22);
      }
      const hydrate2 = [
        `node_ids: [${branch2.map(({ node }) => node.index).join(", ")}]`,
        `data: ${data}`,
        `form: ${serialized.form}`,
        `error: ${serialized.error}`
      ];
      if (status !== 200) {
        hydrate2.push(`status: ${status}`);
      }
      if (client.routes) {
        if (route) {
          const stringified = generate_route_object(route, event.url, client).replaceAll(
            "\n",
            "\n							"
          );
          hydrate2.push(`params: ${uneval(event.params)}`, `server_route: ${stringified}`);
        }
      } else if (options2.embedded) {
        hydrate2.push(`params: ${uneval(event.params)}`, `route: ${s(event.route)}`);
      }
      const indent = "	".repeat(load_env_eagerly ? 7 : 6);
      args.push(`{
${indent}	${hydrate2.join(`,
${indent}	`)}
${indent}}`);
    }
    const remote_data = await collect_remote_data({}, event, event_state, options2);
    const serialized_data = Object.keys(remote_data).length > 0 ? `${global}.data = ${uneval(remote_data, create_replacer(options2.hooks.transport))};

						` : "";
    const boot = client.inline ? `${client.inline.script}

					${serialized_data}${global}.app.start(${args.join(", ")});` : client.app ? `Promise.all([
						import(${s(prefixed(client.start))}),
						import(${s(prefixed(client.app))})
					]).then(([kit, app]) => {
						${serialized_data}kit.start(app, ${args.join(", ")});
					});` : `import(${s(prefixed(client.start))}).then((app) => {
						${serialized_data}app.start(${args.join(", ")})
					});`;
    if (load_env_eagerly) {
      blocks.push(`import(${s(`${base$1}/${app_dir}/env.js`)}).then(({ env }) => {
						${global}.env = env;

						${boot.replace(/\n/g, "\n	")}
					});`);
    } else {
      blocks.push(boot);
    }
    if (options2.service_worker) {
      let opts = "";
      if (options2.service_worker_options != null) {
        const service_worker_options = { ...options2.service_worker_options };
        opts = `, ${s(service_worker_options)}`;
      }
      blocks.push(`if ('serviceWorker' in navigator) {
						const script_url = '${prefixed("service-worker.js")}';
						const policy = globalThis?.window?.trustedTypes?.createPolicy(
							'sveltekit-trusted-url',
							{ createScriptURL(url) { return url; } }
						);
						const sanitised = policy?.createScriptURL(script_url) ?? script_url;
						addEventListener('load', function () {
							navigator.serviceWorker.register(sanitised${opts});
						});
					}`);
    }
    const init_app = `
				{
					${blocks.join("\n\n					")}
				}
			`;
    csp.add_script(init_app);
    body += `
			<script${csp.script_needs_nonce ? ` nonce="${csp.nonce}"` : ""}>${init_app}<\/script>
		`;
  }
  const headers2 = new Headers({
    "x-sveltekit-page": "true",
    "content-type": "text/html"
  });
  if (state2.prerendering) {
    const csp_headers = csp.csp_provider.get_meta();
    if (csp_headers) {
      head2.add_http_equiv(csp_headers);
    }
    if (state2.prerendering.cache) {
      head2.add_http_equiv(
        `<meta http-equiv="cache-control" content="${state2.prerendering.cache}">`
      );
    }
  } else {
    const csp_header = csp.csp_provider.get_header();
    if (csp_header) {
      headers2.set("content-security-policy", csp_header);
    }
    const report_only_header = csp.report_only_provider.get_header();
    if (report_only_header) {
      headers2.set("content-security-policy-report-only", report_only_header);
    }
    if (link_headers.size) {
      headers2.set("link", Array.from(link_headers).join(", "));
    }
  }
  const html = options2.templates.app({
    head: head2.build(),
    body,
    assets: assets$1,
    nonce: (
      /** @type {string} */
      csp.nonce
    ),
    env: public_env
  });
  const transformed = await resolve_opts.transformPageChunk({
    html,
    done: true
  }) || "";
  if (!chunks) {
    headers2.set("etag", `"${hash(transformed)}"`);
  }
  return !chunks ? text(transformed, {
    status,
    headers: headers2
  }) : new Response(
    new ReadableStream({
      async start(controller) {
        controller.enqueue(text_encoder.encode(transformed + "\n"));
        for await (const chunk of chunks) {
          if (chunk.length) controller.enqueue(text_encoder.encode(chunk));
        }
        controller.close();
      },
      type: "bytes"
    }),
    {
      headers: headers2
    }
  );
}
__name(render_response, "render_response");
var Head = class {
  static {
    __name(this, "Head");
  }
  #rendered;
  #prerendering;
  /** @type {string[]} */
  #http_equiv = [];
  /** @type {string[]} */
  #link_tags = [];
  /** @type {string[]} */
  #script_preloads = [];
  /** @type {string[]} */
  #style_tags = [];
  /** @type {string[]} */
  #stylesheet_links = [];
  /**
   * @param {string} rendered
   * @param {boolean} prerendering
   */
  constructor(rendered, prerendering) {
    this.#rendered = rendered;
    this.#prerendering = prerendering;
  }
  build() {
    return [
      ...this.#http_equiv,
      ...this.#link_tags,
      ...this.#script_preloads,
      this.#rendered,
      ...this.#style_tags,
      ...this.#stylesheet_links
    ].join("\n		");
  }
  /**
   * @param {string} style
   * @param {string[]} attributes
   */
  add_style(style, attributes2) {
    this.#style_tags.push(
      `<style${attributes2.length ? " " + attributes2.join(" ") : ""}>${style}</style>`
    );
  }
  /**
   * @param {string} href
   * @param {string[]} attributes
   */
  add_stylesheet(href, attributes2) {
    this.#stylesheet_links.push(`<link href="${href}" ${attributes2.join(" ")}>`);
  }
  /** @param {string} href */
  add_script_preload(href) {
    this.#script_preloads.push(
      `<link rel="preload" as="script" crossorigin="anonymous" href="${href}">`
    );
  }
  /**
   * @param {string} href
   * @param {string[]} attributes
   */
  add_link_tag(href, attributes2) {
    if (!this.#prerendering) return;
    this.#link_tags.push(`<link href="${href}" ${attributes2.join(" ")}>`);
  }
  /** @param {string} tag */
  add_http_equiv(tag) {
    if (!this.#prerendering) return;
    this.#http_equiv.push(tag);
  }
};
var PageNodes = class {
  static {
    __name(this, "PageNodes");
  }
  /** All layout nodes and the page node, if any */
  data;
  /**
   * @param {Array<import('types').SSRNode | undefined>} nodes
   */
  constructor(nodes) {
    this.data = nodes;
  }
  layouts() {
    return this.data.slice(0, -1);
  }
  page() {
    return this.data.at(-1);
  }
  validate() {
    for (const layout of this.layouts()) {
      if (layout) {
        validate_layout_server_exports(
          layout.server,
          /** @type {string} */
          layout.server_id
        );
        validate_layout_exports(
          layout.universal,
          /** @type {string} */
          layout.universal_id
        );
      }
    }
    const page2 = this.page();
    if (page2) {
      validate_page_server_exports(
        page2.server,
        /** @type {string} */
        page2.server_id
      );
      validate_page_exports(
        page2.universal,
        /** @type {string} */
        page2.universal_id
      );
    }
  }
  /**
   * @template {'prerender' | 'ssr' | 'csr' | 'trailingSlash'} Option
   * @param {Option} option
   * @returns {Value | undefined}
   */
  #get_option(option) {
    return this.data.reduce(
      (value, node) => {
        return node?.universal?.[option] ?? node?.server?.[option] ?? value;
      },
      /** @type {Value | undefined} */
      void 0
    );
  }
  csr() {
    return this.#get_option("csr") ?? true;
  }
  ssr() {
    return this.#get_option("ssr") ?? true;
  }
  prerender() {
    return this.#get_option("prerender") ?? false;
  }
  trailing_slash() {
    return this.#get_option("trailingSlash") ?? "never";
  }
  get_config() {
    let current2 = {};
    for (const node of this.data) {
      if (!node?.universal?.config && !node?.server?.config) continue;
      current2 = {
        ...current2,
        // TODO: should we override the server config value with the universal value similar to other page options?
        ...node?.universal?.config,
        ...node?.server?.config
      };
    }
    return Object.keys(current2).length ? current2 : void 0;
  }
  should_prerender_data() {
    return this.data.some(
      // prerender in case of trailingSlash because the client retrieves that value from the server
      (node) => node?.server?.load || node?.server?.trailingSlash !== void 0
    );
  }
};
async function respond_with_error({
  event,
  event_state,
  options: options2,
  manifest: manifest2,
  state: state2,
  status,
  error: error22,
  resolve_opts
}) {
  if (event.request.headers.get("x-sveltekit-error")) {
    return static_error_page(
      options2,
      status,
      /** @type {Error} */
      error22.message
    );
  }
  const fetched = [];
  try {
    const branch2 = [];
    const default_layout = await manifest2._.nodes[0]();
    const nodes = new PageNodes([default_layout]);
    const ssr = nodes.ssr();
    const csr = nodes.csr();
    const data_serializer = server_data_serializer(event, event_state, options2);
    if (ssr) {
      state2.error = true;
      const server_data_promise = load_server_data({
        event,
        event_state,
        state: state2,
        node: default_layout,
        // eslint-disable-next-line @typescript-eslint/require-await
        parent: /* @__PURE__ */ __name(async () => ({}), "parent")
      });
      const server_data = await server_data_promise;
      data_serializer.add_node(0, server_data);
      const data = await load_data({
        event,
        event_state,
        fetched,
        node: default_layout,
        // eslint-disable-next-line @typescript-eslint/require-await
        parent: /* @__PURE__ */ __name(async () => ({}), "parent"),
        resolve_opts,
        server_data_promise,
        state: state2,
        csr
      });
      branch2.push(
        {
          node: default_layout,
          server_data,
          data
        },
        {
          node: await manifest2._.nodes[1](),
          // 1 is always the root error
          data: null,
          server_data: null
        }
      );
    }
    return await render_response({
      options: options2,
      manifest: manifest2,
      state: state2,
      page_config: {
        ssr,
        csr
      },
      status,
      error: await handle_error_and_jsonify(event, event_state, options2, error22),
      branch: branch2,
      error_components: [],
      fetched,
      event,
      event_state,
      resolve_opts,
      data_serializer
    });
  } catch (e3) {
    if (e3 instanceof Redirect) {
      return redirect_response(e3.status, e3.location);
    }
    return static_error_page(
      options2,
      get_status(e3),
      (await handle_error_and_jsonify(event, event_state, options2, e3)).message
    );
  }
}
__name(respond_with_error, "respond_with_error");
var MAX_DEPTH = 10;
async function render_page(event, event_state, page2, options2, manifest2, state2, nodes, resolve_opts) {
  if (state2.depth > MAX_DEPTH) {
    return text(`Not found: ${event.url.pathname}`, {
      status: 404
      // TODO in some cases this should be 500. not sure how to differentiate
    });
  }
  if (is_action_json_request(event)) {
    const node = await manifest2._.nodes[page2.leaf]();
    return handle_action_json_request(event, event_state, options2, node?.server);
  }
  try {
    const leaf_node = (
      /** @type {SSRNode} */
      nodes.page()
    );
    let status = 200;
    let action_result = void 0;
    if (is_action_request(event)) {
      const remote_id = get_remote_action(event.url);
      if (remote_id) {
        action_result = await handle_remote_form_post(event, event_state, manifest2, remote_id);
      } else {
        action_result = await handle_action_request(event, event_state, leaf_node.server);
      }
      if (action_result?.type === "redirect") {
        return redirect_response(action_result.status, action_result.location);
      }
      if (action_result?.type === "error") {
        status = get_status(action_result.error);
      }
      if (action_result?.type === "failure") {
        status = action_result.status;
      }
    }
    const should_prerender = nodes.prerender();
    if (should_prerender) {
      const mod = leaf_node.server;
      if (mod?.actions) {
        throw new Error("Cannot prerender pages with actions");
      }
    } else if (state2.prerendering) {
      return new Response(void 0, {
        status: 204
      });
    }
    state2.prerender_default = should_prerender;
    const should_prerender_data = nodes.should_prerender_data();
    const data_pathname = add_data_suffix2(event.url.pathname);
    const fetched = [];
    const ssr = nodes.ssr();
    const csr = nodes.csr();
    if (ssr === false && !(state2.prerendering && should_prerender_data)) {
      if (DEV && action_result && !event.request.headers.has("x-sveltekit-action")) ;
      return await render_response({
        // provide nodes without running load functions so that the styles and
        // fonts are linked in the head before CSR takes over
        branch: compact(nodes.data).map((node) => {
          return {
            node,
            data: null,
            server_data: null
          };
        }),
        fetched,
        page_config: {
          ssr: false,
          csr
        },
        status,
        error: null,
        event,
        event_state,
        options: options2,
        manifest: manifest2,
        state: state2,
        resolve_opts,
        data_serializer: server_data_serializer(event, event_state, options2)
      });
    }
    const branch2 = [];
    let load_error = null;
    const data_serializer = server_data_serializer(event, event_state, options2);
    const data_serializer_json = state2.prerendering && should_prerender_data ? server_data_serializer_json(event, event_state, options2) : null;
    const server_promises = nodes.data.map((node, i) => {
      if (load_error) {
        throw load_error;
      }
      return Promise.resolve().then(async () => {
        try {
          if (node === leaf_node && action_result?.type === "error") {
            throw action_result.error;
          }
          const server_data = await load_server_data({
            event,
            event_state,
            state: state2,
            node,
            parent: /* @__PURE__ */ __name(async () => {
              const data = {};
              for (let j = 0; j < i; j += 1) {
                const parent = await server_promises[j];
                if (parent) Object.assign(data, parent.data);
              }
              return data;
            }, "parent")
          });
          if (node) {
            data_serializer.add_node(i, server_data);
          }
          data_serializer_json?.add_node(i, server_data);
          return server_data;
        } catch (e3) {
          load_error = /** @type {Error} */
          e3;
          throw load_error;
        }
      });
    });
    const load_promises = nodes.data.map((node, i) => {
      if (load_error) throw load_error;
      return Promise.resolve().then(async () => {
        try {
          return await load_data({
            event,
            event_state,
            fetched,
            node,
            parent: /* @__PURE__ */ __name(async () => {
              const data = {};
              for (let j = 0; j < i; j += 1) {
                Object.assign(data, await load_promises[j]);
              }
              return data;
            }, "parent"),
            resolve_opts,
            server_data_promise: server_promises[i],
            state: state2,
            csr
          });
        } catch (e3) {
          load_error = /** @type {Error} */
          e3;
          throw load_error;
        }
      });
    });
    for (const p of server_promises) p.catch(noop);
    for (const p of load_promises) p.catch(noop);
    for (let i = 0; i < nodes.data.length; i += 1) {
      const node = nodes.data[i];
      if (node) {
        try {
          const server_data = await server_promises[i];
          const data = await load_promises[i];
          branch2.push({ node, server_data, data });
        } catch (e3) {
          const err = normalize_error(e3);
          if (err instanceof Redirect) {
            if (state2.prerendering && should_prerender_data) {
              const body = JSON.stringify({
                type: "redirect",
                location: err.location
              });
              state2.prerendering.dependencies.set(data_pathname, {
                response: text(body),
                body
              });
            }
            return redirect_response(err.status, err.location);
          }
          const status2 = get_status(err);
          const error22 = await handle_error_and_jsonify(event, event_state, options2, err);
          while (i--) {
            if (page2.errors[i]) {
              const index9 = (
                /** @type {number} */
                page2.errors[i]
              );
              const node2 = await manifest2._.nodes[index9]();
              let j = i;
              while (!branch2[j]) j -= 1;
              data_serializer.set_max_nodes(j + 1);
              const layouts = compact(branch2.slice(0, j + 1));
              const nodes2 = new PageNodes(layouts.map((layout) => layout.node));
              const error_branch = layouts.concat({
                node: node2,
                data: null,
                server_data: null
              });
              return await render_response({
                event,
                event_state,
                options: options2,
                manifest: manifest2,
                state: state2,
                resolve_opts,
                page_config: {
                  ssr: nodes2.ssr(),
                  csr: nodes2.csr()
                },
                status: status2,
                error: error22,
                error_components: await load_error_components(
                  options2,
                  ssr,
                  error_branch,
                  page2,
                  manifest2
                ),
                branch: error_branch,
                fetched,
                data_serializer
              });
            }
          }
          return static_error_page(options2, status2, error22.message);
        }
      } else {
        branch2.push(null);
      }
    }
    if (state2.prerendering && data_serializer_json) {
      let { data, chunks } = data_serializer_json.get_data();
      if (chunks) {
        for await (const chunk of chunks) {
          data += chunk;
        }
      }
      state2.prerendering.dependencies.set(data_pathname, {
        response: text(data),
        body: data
      });
    }
    return await render_response({
      event,
      event_state,
      options: options2,
      manifest: manifest2,
      state: state2,
      resolve_opts,
      page_config: {
        csr,
        ssr
      },
      status,
      error: null,
      branch: compact(branch2),
      action_result,
      fetched,
      data_serializer: !ssr ? server_data_serializer(event, event_state, options2) : data_serializer,
      error_components: await load_error_components(options2, ssr, branch2, page2, manifest2)
    });
  } catch (e3) {
    if (e3 instanceof Redirect) {
      return redirect_response(e3.status, e3.location);
    }
    return await respond_with_error({
      event,
      event_state,
      options: options2,
      manifest: manifest2,
      state: state2,
      status: e3 instanceof HttpError ? e3.status : 500,
      error: e3,
      resolve_opts
    });
  }
}
__name(render_page, "render_page");
async function load_error_components(options2, ssr, branch2, page2, manifest2) {
  let error_components;
  if (options2.server_error_boundaries && ssr) {
    let last_idx = -1;
    error_components = await Promise.all(
      // eslint-disable-next-line @typescript-eslint/await-thenable
      branch2.map((b, i) => {
        if (i === 0) return void 0;
        if (!b) return null;
        i--;
        while (i > last_idx + 1 && page2.errors[i] === void 0) i -= 1;
        last_idx = i;
        const idx = page2.errors[i];
        if (idx == null) return void 0;
        return manifest2._.nodes[idx]?.().then((e3) => e3.component?.()).catch(() => void 0);
      }).filter((e3) => e3 !== null)
    );
  }
  return error_components;
}
__name(load_error_components, "load_error_components");
async function render_data(event, event_state, route, options2, manifest2, state2, invalidated_data_nodes, trailing_slash) {
  if (!route.page) {
    return new Response(void 0, {
      status: 404
    });
  }
  try {
    const node_ids = [...route.page.layouts, route.page.leaf];
    const invalidated = invalidated_data_nodes ?? node_ids.map(() => true);
    let aborted = false;
    const url = new URL(event.url);
    url.pathname = normalize_path(url.pathname, trailing_slash);
    const new_event = { ...event, url };
    const functions = node_ids.map((n2, i) => {
      return once2(async () => {
        try {
          if (aborted) {
            return (
              /** @type {import('types').ServerDataSkippedNode} */
              {
                type: "skip"
              }
            );
          }
          const node = n2 == void 0 ? n2 : await manifest2._.nodes[n2]();
          return load_server_data({
            event: new_event,
            event_state,
            state: state2,
            node,
            parent: /* @__PURE__ */ __name(async () => {
              const data2 = {};
              for (let j = 0; j < i; j += 1) {
                const parent = (
                  /** @type {import('types').ServerDataNode | null} */
                  await functions[j]()
                );
                if (parent) {
                  Object.assign(data2, parent.data);
                }
              }
              return data2;
            }, "parent")
          });
        } catch (e3) {
          aborted = true;
          throw e3;
        }
      });
    });
    const promises = functions.map(async (fn, i) => {
      if (!invalidated[i]) {
        return (
          /** @type {import('types').ServerDataSkippedNode} */
          {
            type: "skip"
          }
        );
      }
      return fn();
    });
    let length = promises.length;
    const nodes = await Promise.all(
      promises.map(
        (p, i) => p.catch(async (error22) => {
          if (error22 instanceof Redirect) {
            throw error22;
          }
          length = Math.min(length, i + 1);
          return (
            /** @type {import('types').ServerErrorNode} */
            {
              type: "error",
              error: await handle_error_and_jsonify(event, event_state, options2, error22),
              status: error22 instanceof HttpError || error22 instanceof SvelteKitError ? error22.status : void 0
            }
          );
        })
      )
    );
    const data_serializer = server_data_serializer_json(event, event_state, options2);
    for (let i = 0; i < nodes.length; i++) data_serializer.add_node(i, nodes[i]);
    const { data, chunks } = data_serializer.get_data();
    if (!chunks) {
      return json_response(data);
    }
    return new Response(
      new ReadableStream({
        async start(controller) {
          controller.enqueue(text_encoder.encode(data));
          for await (const chunk of chunks) {
            controller.enqueue(text_encoder.encode(chunk));
          }
          controller.close();
        },
        type: "bytes"
      }),
      {
        headers: {
          // we use a proprietary content type to prevent buffering.
          // the `text` prefix makes it inspectable
          "content-type": "text/sveltekit-data",
          "cache-control": "private, no-store"
        }
      }
    );
  } catch (e3) {
    const error22 = normalize_error(e3);
    if (error22 instanceof Redirect) {
      return redirect_json_response(error22);
    } else {
      return json_response(await handle_error_and_jsonify(event, event_state, options2, error22), 500);
    }
  }
}
__name(render_data, "render_data");
function json_response(json2, status = 200) {
  return text(typeof json2 === "string" ? json2 : JSON.stringify(json2), {
    status,
    headers: {
      "content-type": "application/json",
      "cache-control": "private, no-store"
    }
  });
}
__name(json_response, "json_response");
function redirect_json_response(redirect2) {
  return json_response(
    /** @type {import('types').ServerRedirectNode} */
    {
      type: "redirect",
      location: redirect2.location
    }
  );
}
__name(redirect_json_response, "redirect_json_response");
var INVALID_COOKIE_CHARACTER_REGEX = /[\x00-\x1F\x7F()<>@,;:"/[\]?={} \t]/;
function validate_options(options2) {
  if (options2?.path === void 0) {
    throw new Error("You must specify a `path` when setting, deleting or serializing cookies");
  }
}
__name(validate_options, "validate_options");
function generate_cookie_key(domain2, path, name) {
  return `${domain2 || ""}${path}?${encodeURIComponent(name)}`;
}
__name(generate_cookie_key, "generate_cookie_key");
function get_cookies(request, url) {
  const header = request.headers.get("cookie") ?? "";
  const initial_cookies = (0, import_cookie.parse)(header, { decode: /* @__PURE__ */ __name((value) => value, "decode") });
  let normalized_url;
  const new_cookies = /* @__PURE__ */ new Map();
  const defaults = {
    httpOnly: true,
    sameSite: "lax",
    secure: url.hostname === "localhost" && url.protocol === "http:" ? false : true
  };
  const cookies = {
    // The JSDoc param annotations appearing below for get, set and delete
    // are necessary to expose the `cookie` library types to
    // typescript users. `@type {import('@sveltejs/kit').Cookies}` above is not
    // sufficient to do so.
    /**
     * @param {string} name
     * @param {import('cookie').CookieParseOptions} [opts]
     */
    get(name, opts) {
      const best_match = Array.from(new_cookies.values()).filter((c2) => {
        return c2.name === name && domain_matches(url.hostname, c2.options.domain) && path_matches(url.pathname, c2.options.path);
      }).sort((a, b) => b.options.path.length - a.options.path.length)[0];
      if (best_match) {
        return best_match.options.maxAge === 0 ? void 0 : best_match.value;
      }
      const req_cookies = (0, import_cookie.parse)(header, { decode: opts?.decode });
      const cookie = req_cookies[name];
      return cookie;
    },
    /**
     * @param {import('cookie').CookieParseOptions} [opts]
     */
    getAll(opts) {
      const cookies2 = (0, import_cookie.parse)(header, { decode: opts?.decode });
      const lookup = /* @__PURE__ */ new Map();
      for (const c2 of new_cookies.values()) {
        if (domain_matches(url.hostname, c2.options.domain) && path_matches(url.pathname, c2.options.path)) {
          const existing = lookup.get(c2.name);
          if (!existing || c2.options.path.length > existing.options.path.length) {
            lookup.set(c2.name, c2);
          }
        }
      }
      for (const c2 of lookup.values()) {
        cookies2[c2.name] = c2.value;
      }
      return Object.entries(cookies2).map(([name, value]) => ({ name, value }));
    },
    /**
     * @param {string} name
     * @param {string} value
     * @param {import('./page/types.js').Cookie['options']} options
     */
    set(name, value, options2) {
      const illegal_characters = name.match(INVALID_COOKIE_CHARACTER_REGEX);
      if (illegal_characters) {
        console.warn(
          `The cookie name "${name}" will be invalid in SvelteKit 3.0 as it contains ${illegal_characters.join(
            " and "
          )}. See RFC 2616 for more details https://datatracker.ietf.org/doc/html/rfc2616#section-2.2`
        );
      }
      validate_options(options2);
      set_internal(name, value, { ...defaults, ...options2 });
    },
    /**
     * @param {string} name
     *  @param {import('./page/types.js').Cookie['options']} options
     */
    delete(name, options2) {
      validate_options(options2);
      cookies.set(name, "", { ...options2, maxAge: 0 });
    },
    /**
     * @param {string} name
     * @param {string} value
     *  @param {import('./page/types.js').Cookie['options']} options
     */
    serialize(name, value, options2) {
      validate_options(options2);
      let path = options2.path;
      if (!options2.domain || options2.domain === url.hostname) {
        if (!normalized_url) {
          throw new Error("Cannot serialize cookies until after the route is determined");
        }
        path = resolve(normalized_url, path);
      }
      return (0, import_cookie.serialize)(name, value, { ...defaults, ...options2, path });
    }
  };
  function get_cookie_header(destination, header2) {
    const combined_cookies = {
      // cookies sent by the user agent have lowest precedence
      ...initial_cookies
    };
    for (const cookie of new_cookies.values()) {
      if (!domain_matches(destination.hostname, cookie.options.domain)) continue;
      if (!path_matches(destination.pathname, cookie.options.path)) continue;
      const encoder = cookie.options.encode || encodeURIComponent;
      combined_cookies[cookie.name] = encoder(cookie.value);
    }
    if (header2) {
      const parsed = (0, import_cookie.parse)(header2, { decode: /* @__PURE__ */ __name((value) => value, "decode") });
      for (const name in parsed) {
        combined_cookies[name] = parsed[name];
      }
    }
    return Object.entries(combined_cookies).map(([name, value]) => `${name}=${value}`).join("; ");
  }
  __name(get_cookie_header, "get_cookie_header");
  const internal_queue = [];
  function set_internal(name, value, options2) {
    if (!normalized_url) {
      internal_queue.push(() => set_internal(name, value, options2));
      return;
    }
    let path = options2.path;
    if (!options2.domain || options2.domain === url.hostname) {
      path = resolve(normalized_url, path);
    }
    const cookie_key = generate_cookie_key(options2.domain, path, name);
    const cookie = { name, value, options: { ...options2, path } };
    new_cookies.set(cookie_key, cookie);
  }
  __name(set_internal, "set_internal");
  function set_trailing_slash(trailing_slash) {
    normalized_url = normalize_path(url.pathname, trailing_slash);
    internal_queue.forEach((fn) => fn());
  }
  __name(set_trailing_slash, "set_trailing_slash");
  return { cookies, new_cookies, get_cookie_header, set_internal, set_trailing_slash };
}
__name(get_cookies, "get_cookies");
function domain_matches(hostname, constraint) {
  if (!constraint) return true;
  const normalized = constraint[0] === "." ? constraint.slice(1) : constraint;
  if (hostname === normalized) return true;
  return hostname.endsWith("." + normalized);
}
__name(domain_matches, "domain_matches");
function path_matches(path, constraint) {
  if (!constraint) return true;
  const normalized = constraint.endsWith("/") ? constraint.slice(0, -1) : constraint;
  if (path === normalized) return true;
  return path.startsWith(normalized + "/");
}
__name(path_matches, "path_matches");
function add_cookies_to_headers(headers2, cookies) {
  for (const new_cookie of cookies) {
    const { name, value, options: options2 } = new_cookie;
    headers2.append("set-cookie", (0, import_cookie.serialize)(name, value, options2));
    if (options2.path.endsWith(".html")) {
      const path = add_data_suffix2(options2.path);
      headers2.append("set-cookie", (0, import_cookie.serialize)(name, value, { ...options2, path }));
    }
  }
}
__name(add_cookies_to_headers, "add_cookies_to_headers");
function create_fetch({ event, options: options2, manifest: manifest2, state: state2, get_cookie_header, set_internal }) {
  const server_fetch = /* @__PURE__ */ __name(async (info3, init2) => {
    const original_request = normalize_fetch_input(info3, init2, event.url);
    let mode = (info3 instanceof Request ? info3.mode : init2?.mode) ?? "cors";
    let credentials = (info3 instanceof Request ? info3.credentials : init2?.credentials) ?? "same-origin";
    return options2.hooks.handleFetch({
      event,
      request: original_request,
      fetch: /* @__PURE__ */ __name(async (info22, init3) => {
        const request = normalize_fetch_input(info22, init3, event.url);
        const url = new URL(request.url);
        if (!request.headers.has("origin")) {
          request.headers.set("origin", event.url.origin);
        }
        if (info22 !== original_request) {
          mode = (info22 instanceof Request ? info22.mode : init3?.mode) ?? "cors";
          credentials = (info22 instanceof Request ? info22.credentials : init3?.credentials) ?? "same-origin";
        }
        if ((request.method === "GET" || request.method === "HEAD") && (mode === "no-cors" && url.origin !== event.url.origin || url.origin === event.url.origin)) {
          request.headers.delete("origin");
        }
        const decoded = decodeURIComponent(url.pathname);
        if (url.origin !== event.url.origin || base && decoded !== base && !decoded.startsWith(`${base}/`)) {
          if (`.${url.hostname}`.endsWith(`.${event.url.hostname}`) && credentials !== "omit") {
            const cookie = get_cookie_header(url, request.headers.get("cookie"));
            if (cookie) request.headers.set("cookie", cookie);
          }
          return fetch(request);
        }
        const prefix = assets || base;
        const filename = (decoded.startsWith(prefix) ? decoded.slice(prefix.length) : decoded).slice(1);
        const filename_html = `${filename}/index.html`;
        const is_asset = manifest2.assets.has(filename) || filename in manifest2._.server_assets;
        const is_asset_html = manifest2.assets.has(filename_html) || filename_html in manifest2._.server_assets;
        if (is_asset || is_asset_html) {
          const file = is_asset ? filename : filename_html;
          if (state2.read) {
            const type = is_asset ? manifest2.mimeTypes[filename.slice(filename.lastIndexOf("."))] : "text/html";
            return new Response(state2.read(file), {
              headers: type ? { "content-type": type } : {}
            });
          } else if (read_implementation && file in manifest2._.server_assets) {
            const length = manifest2._.server_assets[file];
            const type = manifest2.mimeTypes[file.slice(file.lastIndexOf("."))];
            return new Response(read_implementation(file), {
              headers: {
                "Content-Length": "" + length,
                "Content-Type": type
              }
            });
          }
          return await fetch(request);
        }
        if (has_prerendered_path(manifest2, base + decoded)) {
          return await fetch(request);
        }
        if (credentials !== "omit") {
          const cookie = get_cookie_header(url, request.headers.get("cookie"));
          if (cookie) {
            request.headers.set("cookie", cookie);
          }
          const authorization = event.request.headers.get("authorization");
          if (authorization && !request.headers.has("authorization")) {
            request.headers.set("authorization", authorization);
          }
        }
        if (!request.headers.has("accept")) {
          request.headers.set("accept", "*/*");
        }
        if (!request.headers.has("accept-language")) {
          request.headers.set(
            "accept-language",
            /** @type {string} */
            event.request.headers.get("accept-language")
          );
        }
        const response = await internal_fetch(request, options2, manifest2, state2);
        for (const str of get_set_cookies(response.headers)) {
          const { name, value, ...options3 } = parseString(str, {
            decodeValues: false
          });
          const path = options3.path ?? (url.pathname.split("/").slice(0, -1).join("/") || "/");
          set_internal(name, value, {
            path,
            encode: /* @__PURE__ */ __name((value2) => value2, "encode"),
            .../** @type {import('cookie').CookieSerializeOptions} */
            options3
          });
        }
        return response;
      }, "fetch")
    });
  }, "server_fetch");
  return (input, init2) => {
    const response = server_fetch(input, init2);
    response.catch(noop);
    return response;
  };
}
__name(create_fetch, "create_fetch");
function normalize_fetch_input(info3, init2, url) {
  if (info3 instanceof Request) {
    return info3;
  }
  return new Request(typeof info3 === "string" ? new URL(info3, url) : info3, init2);
}
__name(normalize_fetch_input, "normalize_fetch_input");
async function internal_fetch(request, options2, manifest2, state2) {
  if (request.signal) {
    if (request.signal.aborted) {
      throw new DOMException("The operation was aborted.", "AbortError");
    }
    let remove_abort_listener = noop;
    const abort_promise = new Promise((_, reject) => {
      const on_abort = /* @__PURE__ */ __name(() => {
        reject(new DOMException("The operation was aborted.", "AbortError"));
      }, "on_abort");
      request.signal.addEventListener("abort", on_abort, { once: true });
      remove_abort_listener = /* @__PURE__ */ __name(() => request.signal.removeEventListener("abort", on_abort), "remove_abort_listener");
    });
    const result = await Promise.race([
      respond(request, options2, manifest2, {
        ...state2,
        depth: state2.depth + 1
      }),
      abort_promise
    ]);
    remove_abort_listener();
    return result;
  } else {
    return await respond(request, options2, manifest2, {
      ...state2,
      depth: state2.depth + 1
    });
  }
}
__name(internal_fetch, "internal_fetch");
var payload;
var etag;
var headers;
function get_public_env(request) {
  const script = request.url.endsWith(".script.js");
  const env3 = public_env;
  payload ??= uneval(env3);
  etag ??= `W/${Date.now()}`;
  headers ??= new Headers({
    "content-type": "application/javascript; charset=utf-8",
    etag
  });
  if (request.headers.get("if-none-match") === etag) {
    return new Response(void 0, { status: 304, headers });
  }
  if (script) {
    return new Response(`globalThis.__sveltekit_sw={env:${payload}}`, { headers });
  }
  return new Response(`export const env=${payload}`, { headers });
}
__name(get_public_env, "get_public_env");
var default_transform = /* @__PURE__ */ __name(({ html }) => html, "default_transform");
var default_filter = /* @__PURE__ */ __name(() => false, "default_filter");
var default_preload = /* @__PURE__ */ __name(({ type }) => type === "js" || type === "css", "default_preload");
var page_methods = /* @__PURE__ */ new Set(["GET", "HEAD", "POST"]);
var allowed_page_methods = /* @__PURE__ */ new Set(["GET", "HEAD", "OPTIONS"]);
var respond = propagate_context(internal_respond);
async function internal_respond(request, options2, manifest2, state2) {
  const url = new URL(request.url);
  const is_route_resolution_request = has_resolution_suffix2(url.pathname);
  const is_data_request = has_data_suffix2(url.pathname);
  const remote_id = get_remote_id(url);
  {
    const request_origin = request.headers.get("origin");
    if (remote_id) {
      if (request.method !== "GET" && request_origin !== url.origin) {
        const message = "Cross-site remote requests are forbidden";
        return json({ message }, { status: 403 });
      }
    } else if (options2.csrf_check_origin) {
      const forbidden = is_form_content_type(request) && (request.method === "POST" || request.method === "PUT" || request.method === "PATCH" || request.method === "DELETE") && request_origin !== url.origin && (!request_origin || !options2.csrf_trusted_origins.includes(request_origin));
      if (forbidden) {
        const message = `Cross-site ${request.method} form submissions are forbidden`;
        const opts = { status: 403 };
        if (request.headers.get("accept") === "application/json") {
          return json({ message }, opts);
        }
        return text(message, opts);
      }
    }
  }
  if (options2.hash_routing && url.pathname !== base + "/" && url.pathname !== "/[fallback]") {
    return text("Not found", { status: 404 });
  }
  let invalidated_data_nodes;
  if (is_route_resolution_request) {
    url.pathname = strip_resolution_suffix2(url.pathname);
  } else if (is_data_request) {
    url.pathname = strip_data_suffix2(url.pathname) + (url.searchParams.get(TRAILING_SLASH_PARAM) === "1" ? "/" : "") || "/";
    url.searchParams.delete(TRAILING_SLASH_PARAM);
    invalidated_data_nodes = url.searchParams.get(INVALIDATED_PARAM)?.split("").map((node) => node === "1");
    url.searchParams.delete(INVALIDATED_PARAM);
  } else if (remote_id) {
    url.pathname = request.headers.get("x-sveltekit-pathname") ?? base;
    url.search = request.headers.get("x-sveltekit-search") ?? "";
  }
  const headers2 = {};
  const { cookies, new_cookies, get_cookie_header, set_internal, set_trailing_slash } = get_cookies(
    request,
    url
  );
  const event_state = {
    prerendering: state2.prerendering,
    transport: options2.hooks.transport,
    handleValidationError: options2.hooks.handleValidationError,
    tracing: {
      record_span
    },
    remote: {
      data: null,
      explicit: null,
      implicit: null,
      forms: null,
      requested: null,
      batches: null,
      live_iterators: null
    },
    is_in_remote_function: false,
    is_in_remote_form_or_command: false,
    is_in_remote_query: false,
    is_in_render: false,
    is_in_universal_load: false
  };
  const event = {
    cookies,
    // @ts-expect-error `fetch` needs to be created after the `event` itself
    fetch: null,
    getClientAddress: state2.getClientAddress || (() => {
      throw new Error(
        `${"@sveltejs/adapter-cloudflare"} does not specify getClientAddress. Please raise an issue`
      );
    }),
    locals: {},
    params: {},
    platform: state2.platform,
    request,
    route: { id: null },
    setHeaders: /* @__PURE__ */ __name((new_headers) => {
      for (const key2 in new_headers) {
        const lower = key2.toLowerCase();
        const value = new_headers[key2];
        if (lower === "set-cookie") {
          throw new Error(
            "Use `event.cookies.set(name, value, options)` instead of `event.setHeaders` to set cookies"
          );
        } else if (lower in headers2) {
          if (lower === "server-timing") {
            headers2[lower] += ", " + value;
          } else {
            throw new Error(`"${key2}" header is already set`);
          }
        } else {
          headers2[lower] = value;
          if (state2.prerendering && lower === "cache-control") {
            state2.prerendering.cache = /** @type {string} */
            value;
          }
        }
      }
    }, "setHeaders"),
    url,
    isDataRequest: is_data_request,
    isSubRequest: state2.depth > 0,
    isRemoteRequest: !!remote_id
  };
  event.fetch = create_fetch({
    event,
    options: options2,
    manifest: manifest2,
    state: state2,
    get_cookie_header,
    set_internal
  });
  if (state2.emulator?.platform) {
    event.platform = await state2.emulator.platform({
      config: {},
      prerender: !!state2.prerendering?.fallback
    });
  }
  let resolved_path = url.pathname;
  if (!remote_id) {
    const prerendering_reroute_state = state2.prerendering?.inside_reroute;
    try {
      if (state2.prerendering) state2.prerendering.inside_reroute = true;
      resolved_path = await options2.hooks.reroute({ url: new URL(url), fetch: event.fetch }) ?? url.pathname;
    } catch {
      return text("Internal Server Error", {
        status: 500
      });
    } finally {
      if (state2.prerendering) state2.prerendering.inside_reroute = prerendering_reroute_state;
    }
  }
  let resolve_opts = {
    transformPageChunk: default_transform,
    filterSerializedResponseHeaders: default_filter,
    preload: default_preload
  };
  let trailing_slash = "never";
  let page_nodes;
  try {
    resolved_path = decode_pathname(resolved_path);
  } catch {
    resolved_path = null;
    return await handle2();
  }
  if (
    // the resolved path has been decoded so it should be compared to the decoded url pathname
    resolved_path !== decode_pathname(url.pathname) && !state2.prerendering?.fallback && has_prerendered_path(manifest2, resolved_path)
  ) {
    const url2 = new URL(request.url);
    url2.pathname = is_data_request ? add_data_suffix2(resolved_path) : is_route_resolution_request ? add_resolution_suffix2(resolved_path) : resolved_path;
    try {
      const response = await fetch(url2, request);
      const headers22 = new Headers(response.headers);
      if (headers22.has("content-encoding")) {
        headers22.delete("content-encoding");
        headers22.delete("content-length");
      }
      return new Response(response.body, {
        headers: headers22,
        status: response.status,
        statusText: response.statusText
      });
    } catch (error22) {
      return await handle_fatal_error(event, event_state, options2, error22);
    }
  }
  let route = null;
  if (base && !state2.prerendering?.fallback) {
    if (!resolved_path.startsWith(base)) {
      return text("Not found", { status: 404 });
    }
    resolved_path = resolved_path.slice(base.length) || "/";
  }
  if (is_route_resolution_request) {
    return resolve_route(resolved_path, new URL(request.url), manifest2);
  }
  if (resolved_path === `/${app_dir}/env.js` || resolved_path === `/${app_dir}/env.script.js`) {
    return get_public_env(request);
  }
  if (!remote_id && resolved_path.startsWith(`/${app_dir}`)) {
    const headers22 = new Headers();
    headers22.set("cache-control", "public, max-age=0, must-revalidate");
    return text("Not found", { status: 404, headers: headers22 });
  }
  if (!state2.prerendering?.fallback) {
    const matchers = await manifest2._.matchers();
    const result = find_route(resolved_path, manifest2._.routes, matchers);
    if (result) {
      route = result.route;
      event.route = { id: route.id };
      event.params = result.params;
    }
  }
  try {
    page_nodes = route?.page ? new PageNodes(await load_page_nodes(route.page, manifest2)) : void 0;
    if (route && !remote_id) {
      if (url.pathname === base || url.pathname === base + "/") {
        trailing_slash = "always";
      } else if (page_nodes) {
        if (DEV) ;
        trailing_slash = page_nodes.trailing_slash();
      } else if (route.endpoint) {
        const node = await route.endpoint();
        trailing_slash = node.trailingSlash ?? "never";
        if (DEV) ;
      }
      if (!is_data_request) {
        const normalized = normalize_path(url.pathname, trailing_slash);
        if (normalized !== url.pathname && !state2.prerendering?.fallback) {
          return new Response(void 0, {
            status: 308,
            headers: {
              "x-sveltekit-normalize": "1",
              location: (
                // ensure paths starting with '//' are not treated as protocol-relative
                (normalized.startsWith("//") ? url.origin + normalized : normalized) + (url.search === "?" ? "" : url.search)
              )
            }
          });
        }
      }
      if (state2.before_handle || state2.emulator?.platform) {
        let config2 = {};
        let prerender = false;
        if (route.endpoint) {
          const node = await route.endpoint();
          config2 = node.config ?? config2;
          prerender = node.prerender ?? prerender;
        } else if (page_nodes) {
          config2 = page_nodes.get_config() ?? config2;
          prerender = page_nodes.prerender();
        }
        if (state2.emulator?.platform) {
          event.platform = await state2.emulator.platform({ config: config2, prerender });
        }
        if (state2.before_handle) {
          return await state2.before_handle(event, config2, prerender, handle2);
        }
      }
    }
    return await handle2();
  } catch (e3) {
    if (e3 instanceof Redirect) {
      try {
        const response = is_data_request || remote_id ? redirect_json_response(e3) : route?.page && is_action_json_request(event) ? action_json_redirect(e3) : redirect_response(e3.status, e3.location);
        add_cookies_to_headers(response.headers, new_cookies.values());
        return response;
      } catch (err) {
        return await handle_fatal_error(event, event_state, options2, err);
      }
    }
    return await handle_fatal_error(event, event_state, options2, e3);
  }
  async function handle2() {
    set_trailing_slash(trailing_slash);
    if (state2.prerendering && !state2.prerendering.fallback && !state2.prerendering.inside_reroute) {
      disable_search(url);
    }
    const response = await record_span({
      name: "sveltekit.handle.root",
      attributes: {
        "http.route": event.route.id || "unknown",
        "http.method": event.request.method,
        "http.url": event.url.href,
        "sveltekit.is_sub_request": event.isSubRequest
      },
      fn: /* @__PURE__ */ __name(async (root_span) => {
        const traced_event = {
          ...event,
          tracing: {
            enabled: false,
            root: root_span,
            current: root_span
          }
        };
        return await with_request_store(
          { event: traced_event, state: event_state },
          () => options2.hooks.handle({
            event: traced_event,
            resolve: /* @__PURE__ */ __name((event2, opts) => {
              return record_span({
                name: "sveltekit.resolve",
                attributes: {
                  "http.route": event2.route.id || "unknown"
                },
                fn: /* @__PURE__ */ __name((resolve_span) => {
                  return with_request_store(
                    null,
                    () => resolve2(merge_tracing(event2, resolve_span), page_nodes, opts).then(
                      (response2) => {
                        for (const key2 in headers2) {
                          const value = headers2[key2];
                          response2.headers.set(
                            key2,
                            /** @type {string} */
                            value
                          );
                        }
                        add_cookies_to_headers(response2.headers, new_cookies.values());
                        if (state2.prerendering && event2.route.id !== null) {
                          response2.headers.set("x-sveltekit-routeid", encodeURI(event2.route.id));
                        }
                        resolve_span.setAttributes({
                          "http.response.status_code": response2.status,
                          "http.response.body.size": response2.headers.get("content-length") || "unknown"
                        });
                        return response2;
                      }
                    )
                  );
                }, "fn")
              });
            }, "resolve")
          })
        );
      }, "fn")
    });
    if (response.status === 200 && response.headers.has("etag")) {
      let if_none_match_value = request.headers.get("if-none-match");
      if (if_none_match_value?.startsWith('W/"')) {
        if_none_match_value = if_none_match_value.substring(2);
      }
      const etag2 = (
        /** @type {string} */
        response.headers.get("etag")
      );
      if (if_none_match_value === etag2) {
        const headers22 = new Headers({ etag: etag2 });
        for (const key2 of ["cache-control", "content-location", "date", "expires", "vary"]) {
          const value = response.headers.get(key2);
          if (value) headers22.set(key2, value);
        }
        for (const cookie of get_set_cookies(response.headers)) {
          headers22.append("set-cookie", cookie);
        }
        return new Response(void 0, {
          status: 304,
          headers: headers22
        });
      }
    }
    if (is_data_request && response.status >= 300 && response.status <= 308) {
      const location = response.headers.get("location");
      if (location) {
        return redirect_json_response(new Redirect(
          /** @type {any} */
          response.status,
          location
        ));
      }
    }
    return response;
  }
  __name(handle2, "handle");
  async function resolve2(event2, page_nodes2, opts) {
    try {
      if (opts) {
        resolve_opts = {
          transformPageChunk: opts.transformPageChunk || default_transform,
          filterSerializedResponseHeaders: opts.filterSerializedResponseHeaders || default_filter,
          preload: opts.preload || default_preload
        };
      }
      if (resolved_path === null) {
        return await respond_with_error({
          event: event2,
          event_state,
          options: options2,
          manifest: manifest2,
          state: state2,
          status: 400,
          error: new SvelteKitError(
            400,
            "Malformed URI",
            `Failed to decode URI: ${event2.url.pathname}`
          ),
          resolve_opts
        });
      }
      if (options2.hash_routing || state2.prerendering?.fallback) {
        return await render_response({
          event: event2,
          event_state,
          options: options2,
          manifest: manifest2,
          state: state2,
          page_config: { ssr: false, csr: true },
          status: 200,
          error: null,
          branch: [
            // include the root layout because it applies to every page
            {
              node: (
                /** @type {SSRNode} */
                await manifest2._.nodes[0]()
              ),
              data: null,
              server_data: null
            }
          ],
          fetched: [],
          resolve_opts,
          data_serializer: server_data_serializer(event2, event_state, options2)
        });
      }
      if (remote_id) {
        return await handle_remote_call(event2, event_state, options2, manifest2, remote_id);
      }
      if (route) {
        const method = (
          /** @type {import('types').HttpMethod} */
          event2.request.method
        );
        let response2;
        if (is_data_request) {
          response2 = await render_data(
            event2,
            event_state,
            route,
            options2,
            manifest2,
            state2,
            invalidated_data_nodes,
            trailing_slash
          );
        } else if (route.endpoint && (!route.page || !state2.prerendering && is_endpoint_request(event2))) {
          response2 = await render_endpoint(event2, event_state, await route.endpoint(), state2);
        } else if (route.page) {
          if (!page_nodes2) {
            throw new Error("page_nodes not found. This should never happen");
          } else if (page_methods.has(method)) {
            response2 = await render_page(
              event2,
              event_state,
              route.page,
              options2,
              manifest2,
              state2,
              page_nodes2,
              resolve_opts
            );
          } else {
            const allowed_methods2 = new Set(allowed_page_methods);
            const node = await manifest2._.nodes[route.page.leaf]();
            if (node?.server?.actions) {
              allowed_methods2.add("POST");
            }
            if (method === "OPTIONS") {
              response2 = new Response(null, {
                status: 204,
                headers: {
                  allow: Array.from(allowed_methods2.values()).join(", ")
                }
              });
            } else {
              const mod = [...allowed_methods2].reduce(
                (acc, curr) => {
                  acc[curr] = true;
                  return acc;
                },
                /** @type {Record<string, any>} */
                {}
              );
              response2 = method_not_allowed(mod, method);
            }
          }
        } else {
          throw new Error("Route is neither page nor endpoint. This should never happen");
        }
        if (request.method === "GET" && route.page && route.endpoint) {
          const vary = response2.headers.get("vary")?.split(",")?.map((v) => v.trim().toLowerCase());
          if (!(vary?.includes("accept") || vary?.includes("*"))) {
            response2 = new Response(response2.body, {
              status: response2.status,
              statusText: response2.statusText,
              headers: new Headers(response2.headers)
            });
            response2.headers.append("Vary", "Accept");
          }
        }
        return response2;
      }
      if (state2.error && event2.isSubRequest) {
        const headers22 = new Headers(request.headers);
        headers22.set("x-sveltekit-error", "true");
        return await fetch(request, { headers: headers22 });
      }
      if (state2.error) {
        return text("Internal Server Error", {
          status: 500
        });
      }
      if (state2.depth === 0) {
        return await respond_with_error({
          event: event2,
          event_state,
          options: options2,
          manifest: manifest2,
          state: state2,
          status: 404,
          error: new SvelteKitError(404, "Not Found", `Not found: ${event2.url.pathname}`),
          resolve_opts
        });
      }
      if (state2.prerendering) {
        return text("not found", { status: 404 });
      }
      const response = await fetch(request);
      return new Response(response.body, response);
    } catch (e3) {
      return await handle_fatal_error(event2, event_state, options2, e3);
    } finally {
      event2.cookies.set = () => {
        throw new Error("Cannot use `cookies.set(...)` after the response has been generated");
      };
      event2.setHeaders = () => {
        throw new Error("Cannot use `setHeaders(...)` after the response has been generated");
      };
    }
  }
  __name(resolve2, "resolve2");
}
__name(internal_respond, "internal_respond");
function load_page_nodes(page2, manifest2) {
  return Promise.all([
    // we use == here rather than === because [undefined] serializes as "[null]"
    ...page2.layouts.map((n2) => n2 == void 0 ? n2 : manifest2._.nodes[n2]()),
    manifest2._.nodes[page2.leaf]()
  ]);
}
__name(load_page_nodes, "load_page_nodes");
function propagate_context(fn) {
  return async (req, ...rest) => {
    {
      return fn(req, ...rest);
    }
  };
}
__name(propagate_context, "propagate_context");
function filter_env(env3, allowed, disallowed) {
  return Object.fromEntries(
    Object.entries(env3).filter(
      ([k]) => k.startsWith(allowed) && (disallowed === "" || !k.startsWith(disallowed))
    )
  );
}
__name(filter_env, "filter_env");
function set_app(value) {
}
__name(set_app, "set_app");
var init_promise;
var current = null;
var Server = class {
  static {
    __name(this, "Server");
  }
  /** @type {import('types').SSROptions} */
  #options;
  /** @type {import('@sveltejs/kit').SSRManifest} */
  #manifest;
  /** @param {import('@sveltejs/kit').SSRManifest} manifest */
  constructor(manifest2) {
    this.#options = options;
    this.#manifest = manifest2;
    if (IN_WEBCONTAINER2) {
      const respond2 = this.respond.bind(this);
      this.respond = async (...args) => {
        const { promise, resolve: resolve2 } = (
          /** @type {PromiseWithResolvers<void>} */
          with_resolvers()
        );
        const previous = current;
        current = promise;
        await previous;
        return respond2(...args).finally(resolve2);
      };
    }
  }
  /**
   * @param {import('@sveltejs/kit').ServerInitOptions} opts
   */
  async init({ env: env3, read }) {
    const { env_public_prefix, env_private_prefix } = this.#options;
    set_private_env(filter_env(env3, env_private_prefix, env_public_prefix));
    set_public_env(filter_env(env3, env_public_prefix, env_private_prefix));
    if (read) {
      const wrapped_read = /* @__PURE__ */ __name((file) => {
        const result = read(file);
        if (result instanceof ReadableStream) {
          return result;
        } else {
          return new ReadableStream({
            async start(controller) {
              try {
                const stream = await Promise.resolve(result);
                if (!stream) {
                  controller.close();
                  return;
                }
                const reader = stream.getReader();
                while (true) {
                  const { done, value } = await reader.read();
                  if (done) break;
                  controller.enqueue(value);
                }
                controller.close();
              } catch (error22) {
                controller.error(error22);
              }
            }
          });
        }
      }, "wrapped_read");
      set_read_implementation(wrapped_read);
    }
    await (init_promise ??= (async () => {
      try {
        const module = await get_hooks();
        this.#options.hooks = {
          handle: module.handle || (({ event, resolve: resolve2 }) => resolve2(event)),
          handleError: module.handleError || (({ status, error: error22, event }) => {
            const error_message = format_server_error(
              status,
              /** @type {Error} */
              error22,
              event
            );
            console.error(error_message);
          }),
          handleFetch: module.handleFetch || (({ request, fetch: fetch2 }) => fetch2(request)),
          handleValidationError: module.handleValidationError || (({ issues }) => {
            console.error("Remote function schema validation failed:", issues);
            return { message: "Bad Request" };
          }),
          reroute: module.reroute || noop,
          transport: module.transport || {}
        };
        set_app({
          decoders: module.transport ? Object.fromEntries(Object.entries(module.transport).map(([k, v]) => [k, v.decode])) : {}
        });
        if (module.init) {
          await module.init();
        }
      } catch (e3) {
        {
          throw e3;
        }
      }
    })());
  }
  /**
   * @param {Request} request
   * @param {import('types').RequestOptions} options
   */
  async respond(request, options2) {
    return respond(request, this.#options, this.#manifest, {
      ...options2,
      error: false,
      depth: 0
    });
  }
};

// ../cloudflare-tmp/manifest.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var manifest = (() => {
  function __memo(fn) {
    let value;
    return () => value ??= value = fn();
  }
  __name(__memo, "__memo");
  return {
    appDir: "_app",
    appPath: "_app",
    assets: /* @__PURE__ */ new Set([]),
    mimeTypes: {},
    _: {
      client: { start: "_app/immutable/entry/start.DA_z_o-N.js", app: "_app/immutable/entry/app.C9EKfevn.js", imports: ["_app/immutable/entry/start.DA_z_o-N.js", "_app/immutable/chunks/C36gyCFG.js", "_app/immutable/chunks/BghoPdkm.js", "_app/immutable/chunks/2HPGJ4rY.js", "_app/immutable/chunks/DA9A0cPI.js", "_app/immutable/entry/app.C9EKfevn.js", "_app/immutable/chunks/2HPGJ4rY.js", "_app/immutable/chunks/BghoPdkm.js", "_app/immutable/chunks/Bzak7iHL.js", "_app/immutable/chunks/wgRYQMwV.js", "_app/immutable/chunks/V53e5fvJ.js"], stylesheets: [], fonts: [], uses_env_dynamic_public: false },
      nodes: [
        __memo(() => Promise.resolve().then(() => (init__(), __exports))),
        __memo(() => Promise.resolve().then(() => (init__2(), __exports2))),
        __memo(() => Promise.resolve().then(() => (init__3(), __exports3))),
        __memo(() => Promise.resolve().then(() => (init__4(), __exports4))),
        __memo(() => Promise.resolve().then(() => (init__5(), __exports5))),
        __memo(() => Promise.resolve().then(() => (init__6(), __exports6))),
        __memo(() => Promise.resolve().then(() => (init__7(), __exports7))),
        __memo(() => Promise.resolve().then(() => (init__8(), __exports8)))
      ],
      remotes: {},
      routes: [
        {
          id: "/",
          pattern: /^\/$/,
          params: [],
          page: { layouts: [0], errors: [1], leaf: 2 },
          endpoint: null
        },
        {
          id: "/events",
          pattern: /^\/events\/?$/,
          params: [],
          page: { layouts: [0], errors: [1], leaf: 3 },
          endpoint: null
        },
        {
          id: "/images/[...key]",
          pattern: /^\/images(?:\/([^]*))?\/?$/,
          params: [{ "name": "key", "optional": false, "rest": true, "chained": true }],
          page: null,
          endpoint: __memo(() => Promise.resolve().then(() => (init_server_ts(), server_ts_exports)))
        },
        {
          id: "/kontakt",
          pattern: /^\/kontakt\/?$/,
          params: [],
          page: { layouts: [0], errors: [1], leaf: 4 },
          endpoint: null
        },
        {
          id: "/logout",
          pattern: /^\/logout\/?$/,
          params: [],
          page: { layouts: [0], errors: [1], leaf: 5 },
          endpoint: null
        },
        {
          id: "/om",
          pattern: /^\/om\/?$/,
          params: [],
          page: { layouts: [0], errors: [1], leaf: 6 },
          endpoint: null
        },
        {
          id: "/[secret]",
          pattern: /^\/([^/]+?)\/?$/,
          params: [{ "name": "secret", "optional": false, "rest": false, "chained": false }],
          page: { layouts: [0], errors: [1], leaf: 7 },
          endpoint: null
        }
      ],
      prerendered_routes: /* @__PURE__ */ new Set([]),
      matchers: /* @__PURE__ */ __name(async () => {
        return {};
      }, "matchers"),
      server_assets: {}
    }
  };
})();
var prerendered = /* @__PURE__ */ new Set([]);
var base_path = "";

// _worker.js
import { env as env2 } from "cloudflare:workers";
async function e(e3, t2) {
  let n2 = "string" != typeof t2 && "HEAD" === t2.method;
  n2 && (t2 = new Request(t2, { method: "GET" }));
  let r3 = await e3.match(t2);
  return n2 && r3 && (r3 = new Response(null, r3)), r3;
}
__name(e, "e");
function t(e3, t2, n2, o2) {
  return ("string" == typeof t2 || "GET" === t2.method) && r2(n2) && (n2.headers.has("Set-Cookie") && (n2 = new Response(n2.body, n2)).headers.append("Cache-Control", "private=Set-Cookie"), o2.waitUntil(e3.put(t2, n2.clone()))), n2;
}
__name(t, "t");
var n = /* @__PURE__ */ new Set([200, 203, 204, 300, 301, 404, 405, 410, 414, 501]);
function r2(e3) {
  if (!n.has(e3.status)) return false;
  if (~(e3.headers.get("Vary") || "").indexOf("*")) return false;
  let t2 = e3.headers.get("Cache-Control") || "";
  return !/(private|no-cache|no-store)/i.test(t2);
}
__name(r2, "r");
function o(n2) {
  return async function(r3, o2) {
    let a = await e(n2, r3);
    if (a) return a;
    o2.defer(((e3) => {
      t(n2, r3, e3, o2);
    }));
  };
}
__name(o, "o");
var s2 = caches.default;
var c = t.bind(0, s2);
var r22 = e.bind(0, s2);
var e2 = o.bind(0, s2);
var server = new Server(manifest);
var app_path = `/${manifest.appPath}`;
var immutable = `${app_path}/immutable/`;
var version_file = `${app_path}/version.json`;
var origin;
var initialized = server.init({
  // @ts-expect-error env contains environment variables and bindings
  env: env2,
  read: /* @__PURE__ */ __name(async (file) => {
    const url = `${origin}/${file}`;
    const response = await /** @type {{ ASSETS: { fetch: typeof fetch } }} */
    env2.ASSETS.fetch(
      url
    );
    if (!response.ok) {
      throw new Error(
        `read(...) failed: could not fetch ${url} (${response.status} ${response.statusText})`
      );
    }
    return response.body;
  }, "read")
});
var worker_default = {
  /**
   * @param {Request} req
   * @param {{ ASSETS: { fetch: typeof fetch } }} env
   * @param {ExecutionContext} ctx
   * @returns {Promise<Response>}
   */
  async fetch(req, env22, ctx) {
    if (!origin) {
      origin = new URL(req.url).origin;
    }
    await initialized;
    let pragma = req.headers.get("cache-control") || "";
    let res = !pragma.includes("no-cache") && await r22(req);
    if (res) return res;
    let { pathname, search } = new URL(req.url);
    try {
      pathname = decodeURIComponent(pathname);
    } catch {
    }
    const stripped_pathname = pathname.replace(/\/$/, "");
    let is_static_asset = false;
    const filename = stripped_pathname.slice(base_path.length + 1);
    if (filename) {
      is_static_asset = manifest.assets.has(filename) || manifest.assets.has(filename + "/index.html") || filename in manifest._.server_assets || filename + "/index.html" in manifest._.server_assets;
    }
    let location = pathname.at(-1) === "/" ? stripped_pathname : pathname + "/";
    if (is_static_asset || prerendered.has(pathname) || pathname === version_file || pathname.startsWith(immutable)) {
      res = await env22.ASSETS.fetch(req);
    } else if (location && prerendered.has(location)) {
      if (search) location += search;
      res = new Response("", {
        status: 308,
        headers: {
          location
        }
      });
    } else {
      res = await server.respond(req, {
        platform: {
          env: env22,
          ctx,
          context: ctx,
          // deprecated in favor of ctx
          // @ts-expect-error webworker types from worktop are not compatible with Cloudflare Workers types
          caches,
          // @ts-expect-error the type is correct but ts is confused because platform.cf uses the type from index.ts while req.cf uses the type from index.d.ts
          cf: req.cf
        },
        getClientAddress() {
          return (
            /** @type {string} */
            req.headers.get("cf-connecting-ip")
          );
        }
      });
    }
    pragma = res.headers.get("cache-control") || "";
    return pragma && res.status < 400 ? c(req, res, ctx) : res;
  }
};
export {
  worker_default as default
};
/*! Bundled license information:

cookie/index.js:
  (*!
   * cookie
   * Copyright(c) 2012-2014 Roman Shtylman
   * Copyright(c) 2015 Douglas Christopher Wilson
   * MIT Licensed
   *)
*/
//# sourceMappingURL=bundledWorker-0.3012400123375589.mjs.map
