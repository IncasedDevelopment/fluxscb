! function(e) {
    var s = {};

    function t(o) {
        if (s[o]) return s[o].exports;
        var r = s[o] = {
            i: o,
            l: !1,
            exports: {}
        };
        return e[o].call(r.exports, r, r.exports, t), r.l = !0, r.exports
    }
    t.m = e, t.c = s, t.d = function(e, s, o) {
        t.o(e, s) || Object.defineProperty(e, s, {
            enumerable: !0,
            get: o
        })
    }, t.r = function(e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }, t.t = function(e, s) {
        if (1 & s && (e = t(e)), 8 & s) return e;
        if (4 & s && "object" == typeof e && e && e.__esModule) return e;
        var o = Object.create(null);
        if (t.r(o), Object.defineProperty(o, "default", {
                enumerable: !0,
                value: e
            }), 2 & s && "string" != typeof e)
            for (var r in e) t.d(o, r, function(s) {
                return e[s]
            }.bind(null, r));
        return o
    }, t.n = function(e) {
        var s = e && e.__esModule ? function() {
            return e.default
        } : function() {
            return e
        };
        return t.d(s, "a", s), s
    }, t.o = function(e, s) {
        return Object.prototype.hasOwnProperty.call(e, s)
    }, t.p = "", t(t.s = 5)
}([function(e, s) {
    e.exports = require("discord.js")
}, function(e, s, t) {
    const o = t(9),
        r = t(10),
        n = t(11),
        i = t(2),
        a = t(3),
        c = i.safeLoad(a.readFileSync(`/home/minecraft/multicraft/servers/server${process.env.SERVER_ID}/config.yml`, "utf-8"));
    async function l(e, s) {
        const t = await async function(e, s = {}, t, i) {
            console.log(`Sending ${e} call to API with parameters ${JSON.stringify(s)}`);
            var a = "",
                c = s || {};
            for (var l in c._MulticraftAPIMethod = e, c._MulticraftAPIUser = t, c) c.hasOwnProperty(l) && (a += l + c[l].toString());
            var m = n.createHmac("sha256", i);
            m.update(a);
            var p = m.digest("hex");
            c._MulticraftAPIKey = p;
            try {
                return (await o.post(process.env.ENDPOINT, r.stringify(c))).data
            } catch (e) {
                throw new Error("Server responded with error status " + e.status)
            }
        }(e, s, c["api-user"], c["api-key"]);
        if (t.success) return t.data;
        throw new Error("Error - " + t.errors.join(",").replace("Server not found", "Server not found (Are you the owner of the server?)"))
    }
    c || (console.error("Could not read config file, please ensure syntax is correct!"), process.exit(1));
    const m = new Proxy({}, {
        get: (e, s) => e => l(s, e)
    });
    e.exports = m
}, function(e, s) {
    e.exports = require("js-yaml")
}, function(e, s) {
    e.exports = require("fs")
}, function(e, s, t) {
    const o = t(2),
        r = t(3),
        n = o.safeLoad(r.readFileSync(`/home/minecraft/multicraft/servers/server${process.env.SERVER_ID}/config.yml`, "utf-8"));
    n || (console.error("Could not read config file, please ensure syntax is correct!"), process.exit(1)), e.exports.hasPermission = function(e, s) {
        var t = [];
        n.permissions.users[e.id] && (t = t.concat(n.permissions.users[e.id]));
        for (const s of e.roles.cache.array())
            if (n.permissions.roles[s.id])
                for (const e of n.permissions.roles[s.id]) t.includes(e) || t.push(e);
        return t.includes(s)
    }
}, function(e, s, t) {
    e.exports = t(6)
}, function(e, s, t) {
    const o = t(0),
        r = t(2),
        n = t(3),
        i = new o.Client,
        a = t(7).promisify(t(8).exec);
    n.existsSync(`/home/minecraft/multicraft/servers/server${process.env.SERVER_ID}/config.yml`) || (console.error("ERROR You have not created a config file. Please rename config.example.yml to config.yml then edit the settings."), process.exit(1));
    const c = r.safeLoad(n.readFileSync("./config.yml", "utf-8"));
    c || (console.log("ERROR Could not read config file, please ensure syntax is correct!"), process.exit(1));
    const l = t(4),
        m = t(1);
    i.pebblehost_servers = [];
    for (const e of Object.keys(c.servers)) i.pebblehost_servers.push({
        id: c.servers[e],
        name: e
    });
    i.commands = [];
    const p = [t(12), t(13), t(14), t(15), t(16), t(17), t(18)];
    for (const e of p) i.commands.push(e), console.log("Loaded command " + e.name);
    i.on("ready", async() => {
        console.log(`Logged in as ${i.user.tag}!`);
        const e = await m.getCurrentUser();
        console.log("Logged into PebbleHost API as user " + e.User.email)
    }), i.on("message", async e => {
        if (c.channel_whitelist.length && !c.channel_whitelist.includes(e.channel.id)) return;
        const s = e.content.split(" ");
        if (!s[0].startsWith(c.prefix)) return;
        const t = s[0].substr(1).toLowerCase();
        n.existsSync("/.dockerenv") && await async function e(s, t, r, n, m) {
            if (c.scripts[t]) {
                if (!l.hasPermission(s.member, t)) return void await s.channel.send((new o.MessageEmbed).setColor("RANDOM").setTitle(c.emojis.error + " No permission!").setDescription(`You need the ${t} permission to use this command`).setFooter("IncasedDevelopment", "https://cdn.discordapp.com/attachments/917718337079894047/917718410312421376/Flux-512.png"));
                for (const o of c.scripts[t]) {
                    const t = o.split(" "),
                        r = t[0].toLowerCase();
                    await e(s, r, t, !0, !0)
                }
                await s.channel.send((new o.MessageEmbed).setColor("RANDOM").setTitle(`${c.emojis.success} Script ${t} completed.`).setFooter("IncasedDevelopment", "https://cdn.discordapp.com/attachments/917718337079894047/917718410312421376/Flux-512.png"))
            } else {
                const e = i.commands.find(e => e.name === t || e.aliases.includes(t));
                if (!e) return;
                if (console.log(`Processing command from user ${s.author.tag} [${s.author.id}]: ${s.content}`), !l.hasPermission(s.member, e.name) && "help" !== e.name && !n) return void await s.channel.send((new o.MessageEmbed).setColor("RANDOM").setTitle(c.emojis.error + " No permission!").setDescription(`You need the ${e.name} permission to use this command`).setFooter("IncasedDevelopment", "https://cdn.discordapp.com/attachments/917718337079894047/917718410312421376/Flux-512.png"));
                var p = null,
                    d = null;
                if (e.requiresServer && (r[1] && ((p = i.pebblehost_servers.find(e => e.name.toLowerCase() === r[1].toLowerCase() || e.id.toString() === r[1].toString())) || "all" !== r[1].toLowerCase() || (p = "all")), !p)) return void await s.channel.send((new o.MessageEmbed).setColor("RANDOM").setTitle(c.emojis.error + " Server not found").setDescription("Possible servers: " + i.pebblehost_servers.map(e => `\`${e.name}\``).join(", ")).setFooter("IncasedDevelopment", "https://cdn.discordapp.com/attachments/917718337079894047/917718410312421376/Flux-512.png"));
                e.requiresCmd && (d = r.splice(e.requiresServer ? 2 : 1).join(" "));
                try {
                    var {
                        stdout: u,
                        stderr: f
                    } = await a("ps aux");
                    if (!u.includes("server-startfile.js")) return;
                    await e.execute(s, r, c, p, d, m)
                } catch (e) {
                    return void await s.channel.send((new o.MessageEmbed).setColor("RANDOM").setTitle(c.emojis.apiError + " Unexpected error!").setDescription(e.message).setFooter("IncasedDevelopment", "https://cdn.discordapp.com/attachments/917718337079894047/917718410312421376/Flux-512.png"))
                }
            }
        }(e, t, s, !1, !1)
    }), i.login(c.token)
}, function(e, s) {
    e.exports = require("util")
}, function(e, s) {
    e.exports = require("child_process")
}, function(e, s) {
    e.exports = require("axios")
}, function(e, s) {
    e.exports = require("querystring")
}, function(e, s) {
    e.exports = require("crypto")
}, function(e, s, t) {
    const o = t(1),
        r = t(0);
    e.exports = {
        name: "command",
        usage: "command Survival op IncasedName",
        description: "Runs a console command on the server(s) specified.",
        aliases: ["cmd"],
        requiresServer: !0,
        requiresCmd: !0,
        async execute(e, s, t, n, i, a) {
            try {
                if ("all" === n)
                    for (const s of e.client.pebblehost_servers) await o.sendConsoleCommand({
                        server_id: s.id,
                        command: i
                    });
                else await o.sendConsoleCommand({
                    server_id: n.id,
                    command: i
                });
                a || await e.channel.send((new r.MessageEmbed).setColor("RANDOM").setTitle(t.emojis.success + " Command sent!").setFooter("IncasedDevelopment", "https://cdn.discordapp.com/attachments/917718337079894047/917718410312421376/Flux-512.png"))
            } catch (s) {
                await e.channel.send((new r.MessageEmbed).setColor("RANDOM").setTitle(t.emojis.apiError + " Error contacting API!").setDescription(s.message).setFooter("IncasedDevelopment", "https://cdn.discordapp.com/attachments/917718337079894047/917718410312421376/Flux-512.png"))
            }
        }
    }
}, function(e, s, t) {
    t(1);
    const o = t(0),
        r = t(4);
    e.exports = {
        name: "help",
        usage: "help",
        aliases: [],
        requiresServer: !1,
        requiresCmd: !1,
        async execute(e, s, t, n, i) {
            if (s[1]) {
                const n = e.client.commands.find(e => e.name === s[1].toLowerCase() || e.aliases.includes(s[1].toLowerCase())),
                    i = (new o.MessageEmbed).setColor("RANDOM").setTitle(`Help for ${t.prefix}${n.name}`).addField("Description", n.description).addField("Usage", `\`${t.prefix}${n.usage}\``).setFooter("IncasedDevelopment", "https://cdn.discordapp.com/attachments/917718337079894047/917718410312421376/Flux-512.png");
                r.hasPermission(e.member, n.name) || i.addField("Warning", "You do not have permission to use this command, please have the owner add the permission in the config if you wish to use this."), n.aliases.length && i.addField("Aliases", n.aliases.map(e => `\`${t.prefix}${e}\``).join("\n")), await e.channel.send(i)
            } else {
                const s = (new o.MessageEmbed).setColor("RANDOM").setTitle("Help").setDescription(`Below are all the commands you can use. Type \`${t.prefix}help <command>\` for more information on a specific command`).setFooter("IncasedDevelopment", "https://cdn.discordapp.com/attachments/917718337079894047/917718410312421376/Flux-512.png");
                s.addField("Commands", e.client.commands.map(e => `\`${t.prefix}${e.name}${e.requiresServer?" <server>":""}${e.requiresCmd?" <command>":""}\``).join("\n")), s.addField("Arguments", `Anywhere you see \`<server>\` you can put either a server name, a server ID, or \`all\` to choose which server to do the action on. For example, \`${t.prefix}restart all\` would restart all servers added to the bot.`), await e.channel.send(s)
            }
        }
    }
}, function(e, s, t) {
    const o = t(1),
        r = t(0);
    e.exports = {
        name: "kill",
        usage: "kill Survival",
        aliases: [],
        description: "Kills the server(s) specified. Warning - this may cause corruption, it's always recommended to use Stop instead.",
        requiresServer: !0,
        requiresCmd: !1,
        async execute(e, s, t, n, i, a) {
            try {
                if ("all" === n)
                    for (const s of e.client.pebblehost_servers) await o.killServer({
                        id: s.id
                    });
                else await o.killServer({
                    id: n.id
                });
                a || await e.channel.send((new r.MessageEmbed).setColor("RANDOM").setTitle(t.emojis.success + " Kill command sent!").setFooter("IncasedDevelopment", "https://cdn.discordapp.com/attachments/917718337079894047/917718410312421376/Flux-512.png"))
            } catch (s) {
                await e.channel.send((new r.MessageEmbed).setColor("RANDOM").setTitle(t.emojis.apiError + " Error contacting API!").setDescription(s.message).setFooter("IncasedDevelopment", "https://cdn.discordapp.com/attachments/917718337079894047/917718410312421376/Flux-512.png"))
            }
        }
    }
}, function(e, s, t) {
    const o = t(1),
        r = t(0);
    e.exports = {
        name: "restart",
        usage: "restart Survival",
        aliases: [],
        description: "Restarts the server(s) specified.",
        requiresServer: !0,
        requiresCmd: !1,
        async execute(e, s, t, n, i, a) {
            try {
                if ("all" === n)
                    for (const s of e.client.pebblehost_servers) await o.restartServer({
                        id: s.id
                    });
                else await o.restartServer({
                    id: n.id
                });
                a || await e.channel.send((new r.MessageEmbed).setColor("RANDOM").setTitle(t.emojis.success + " Restart command sent!").setFooter("IncasedDevelopment", "https://cdn.discordapp.com/attachments/917718337079894047/917718410312421376/Flux-512.png"))
            } catch (s) {
                await e.channel.send((new r.MessageEmbed).setColor("RANDOM").setTitle(t.emojis.apiError + " Error contacting API!").setDescription(s.message).setFooter("IncasedDevelopment", "https://cdn.discordapp.com/attachments/917718337079894047/917718410312421376/Flux-512.png"))
            }
        }
    }
}, function(e, s, t) {
    const o = t(1),
        r = t(0);
    e.exports = {
        name: "start",
        usage: "start Survival",
        description: "Starts the server(s) specified.",
        aliases: [],
        requiresServer: !0,
        requiresCmd: !1,
        async execute(e, s, t, n, i, a) {
            try {
                if ("all" === n)
                    for (const s of e.client.pebblehost_servers) await o.startServer({
                        id: s.id
                    });
                else await o.startServer({
                    id: n.id
                });
                a || await e.channel.send((new r.MessageEmbed).setColor("RANDOM").setTitle(t.emojis.success + " Start command sent!").setFooter("IncasedDevelopment", "https://cdn.discordapp.com/attachments/917718337079894047/917718410312421376/Flux-512.png"))
            } catch (s) {
                await e.channel.send((new r.MessageEmbed).setColor("RANDOM").setTitle(t.emojis.apiError + " Error contacting API!").setDescription(s.message).setFooter("IncasedDevelopment", "https://cdn.discordapp.com/attachments/917718337079894047/917718410312421376/Flux-512.png"))
            }
        }
    }
}, function(e, s, t) {
    const o = t(1),
        r = t(0);
    e.exports = {
        name: "status",
        usage: "status",
        description: "Checks every server's status and playercount and displays this.",
        aliases: [],
        requiresServer: !1,
        requiresOther: !1,
        async execute(e, s, t) {
            const n = await e.channel.send((new r.MessageEmbed).setColor("RANDOM").setTitle("Server Status").setDescription("⌛ Loading").setFooter("IncasedDevelopment", "https://cdn.discordapp.com/attachments/917718337079894047/917718410312421376/Flux-512.png")),
                i = [];
            for (const s of e.client.pebblehost_servers) try {
                const e = await o.getServerStatus({
                    id: s.id
                });
                i.push({
                    name: s.name,
                    id: s.id,
                    icon: "online" === e.status ? t.emojis.online : t.emojis.offline,
                    status: "online" === e.status ? `Online (${e.onlinePlayers}/${e.maxPlayers})` : "Offline"
                })
            } catch (e) {
                i.push({
                    name: s.name,
                    id: s.id,
                    icon: "⚠️",
                    status: e.message
                })
            }
            const a = (new r.MessageEmbed).setColor("RANDOM").setTitle("Server Status").setFooter("IncasedDevelopment", "https://cdn.discordapp.com/attachments/917718337079894047/917718410312421376/Flux-512.png");
            for (const e of i) a.addField(`${e.name} - ${e.id}`, `${e.icon} ${e.status}`);
            await n.edit(a)
        }
    }
}, function(e, s, t) {
    const o = t(1),
        r = t(0);
    e.exports = {
        name: "stop",
        usage: "stop Survival",
        aliases: [],
        description: "Stops the server(s) specified.",
        requiresServer: !0,
        requiresCmd: !1,
        async execute(e, s, t, n, i, a) {
            try {
                if ("all" === n)
                    for (const s of e.client.pebblehost_servers) await o.stopServer({
                        id: s.id
                    });
                else await o.stopServer({
                    id: n.id
                });
                a || await e.channel.send((new r.MessageEmbed).setColor("RANDOM").setTitle(t.emojis.success + " Stop command sent!").setFooter("IncasedDevelopment", "https://cdn.discordapp.com/attachments/917718337079894047/917718410312421376/Flux-512.png"))
            } catch (s) {
                await e.channel.send((new r.MessageEmbed).setColor("RANDOM").setTitle(t.emojis.apiError + " Error contacting API!").setDescription(s.message).setFooter("IncasedDevelopment", "https://cdn.discordapp.com/attachments/917718337079894047/917718410312421376/Flux-512.png"))
            }
        }
    }
}]);