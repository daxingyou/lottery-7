const vueLottery = new Vue({
    el: '#vue-lottery',
    data: {
        lotteryConfig: {
            "CQSSC": {
                "cnName": "重庆时时彩",
                "ltNormalTab": {
                    "wx": "五星",
                    "sx": "四星",
                    "qsm": "前三",
                    "zsm": "中三",
                    "hsm": "后三",
                    "qem": "前二",
                    "hem": "后二",
                    "dwd": "定位胆",
                    "bdd": "不定胆",
                    "dxds": "大小单双",
                    "qw": "趣味",
                    "nn": "牛牛"
                },
                "ltRxTab": {
                    "rx2": "任选二",
                    "rx3": "任选三",
                    "rx4": "任选四"
                },
                "ltMethod": {
                    "wx": {
                        "zx": {
                            "title": "五星直选",
                            "method": {
                                "zx_fs": {
                                    "desc": "复式",
                                    "num": "万位,千位,百位,十位,个位|0-9|all",
                                    "name": "五星直选复式"
                                },
                                "zx_ds": {
                                    "desc": "单式",
                                    "num": "input|zx|5",
                                    "name": "五星直选单式"
                                },
                                "zx_zh": {
                                    "desc": "组合",
                                    "num": "万位,千位,百位,十位,个位|0-9|all",
                                    "name": "五星直选组合"
                                }
                            }
                        },
                        "zux": {
                            "title": "五星组选",
                            "method": {
                                "zux_z120": {
                                    "desc": "组选120",
                                    "num": "组选120|0-9|all",
                                    "name": "五星组选120"
                                },
                                "zux_z60": {
                                    "desc": "组选60",
                                    "num": "二重号,单号|0-9|all",
                                    "name": "五星组选60"
                                },
                                "zux_z30": {
                                    "desc": "组选30",
                                    "num": "二重号,单号|0-9|all",
                                    "name": "五星组选30"
                                },
                                "zux_z20": {
                                    "desc": "组选20",
                                    "num": "三重号,单号|0-9|all",
                                    "name": "五星组选20"
                                },
                                "zux_z10": {
                                    "desc": "组选10",
                                    "num": "三重号,二重号|0-9|all",
                                    "name": "五星组选10"
                                },
                                "zux_z5": {
                                    "desc": "组选5",
                                    "num": "四重号,单号|0-9|all",
                                    "name": "五星组选5"
                                }
                            }
                        }
                    },
                    "sx": {
                        "zx": {
                            "title": "四星直选",
                            "method": {
                                "zx_fs": {
                                    "desc": "复式",
                                    "num": "千位,百位,十位,个位|0-9|all",
                                    "name": "四星直选复式"
                                },
                                "zx_ds": {
                                    "desc": "单式",
                                    "num": "input|zx|4",
                                    "name": "四星直选单式"
                                },
                                "zx_zh": {
                                    "desc": "组合",
                                    "num": "千位,百位,十位,个位|0-9|all",
                                    "name": "四星直选组合"
                                }
                            }
                        },
                        "zux": {
                            "title": "四星组选",
                            "method": {
                                "zux_z24": {
                                    "desc": "组选24",
                                    "num": "组24|0-9|all",
                                    "name": "四星组选24"
                                },
                                "zux_z12": {
                                    "desc": "组选12",
                                    "num": "二重号,单号|0-9|all",
                                    "name": "四星组选12"
                                },
                                "zux_z6": {
                                    "desc": "组选6",
                                    "num": "二重号|0-9|all",
                                    "name": "四星组选6"
                                },
                                "zux_z4": {
                                    "desc": "组选4",
                                    "num": "三重号,单号|0-9|all",
                                    "name": "四星组选4"
                                }
                            }
                        }
                    },
                    "hsm": {
                        "zx": {
                            "title": "后三直选",
                            "method": {
                                "zx_fs": {
                                    "desc": "复式",
                                    "num": "百位,十位,个位|0-9|all",
                                    "name": "后三直选复式"
                                },
                                "zx_ds": {
                                    "desc": "单式",
                                    "num": "input|zx|3",
                                    "name": "后三直选单式"
                                },
                                "zx_hz": {
                                    "desc": "和值",
                                    "num": "直选和值|0-27|",
                                    "name": "后三直选和值"
                                },
                                "zx_kd": {
                                    "desc": "跨度",
                                    "num": "跨度|0-9|all",
                                    "name": "后三直选跨度"
                                }
                            }
                        },
                        "zux": {
                            "title": "后三组选",
                            "method": {
                                "z3": {
                                    "desc": "组三",
                                    "num": "组三|0-9|all",
                                    "name": "后三组选三"
                                },
                                "z6": {
                                    "desc": "组六",
                                    "num": "组六|0-9|all",
                                    "name": "后三组选六"
                                },
                                "hh": {
                                    "desc": "混合",
                                    "num": "input|hh|3",
                                    "name": "后三混合组选"
                                },
                                "hz": {
                                    "desc": "和值",
                                    "num": "组选和值|1-26|",
                                    "name": "后三组选和值"
                                },
                                "bd": {
                                    "desc": "包胆",
                                    "num": "包胆|0-9|",
                                    "name": "后三组选包胆"
                                }
                            }
                        }
                    },
                    "qsm": {
                        "zx": {
                            "title": "前三直选",
                            "method": {
                                "zx_fs": {
                                    "desc": "复式",
                                    "num": "万位,千位,百位|0-9|all",
                                    "name": "前三直选复式"
                                },
                                "zx_ds": {
                                    "desc": "单式",
                                    "num": "input|zx|3",
                                    "name": "前三直选单式"
                                },
                                "zx_hz": {
                                    "desc": "和值",
                                    "num": "直选和值|0-27|",
                                    "name": "前三直选和值"
                                },
                                "zx_kd": {
                                    "desc": "跨度",
                                    "num": "跨度|0-9|all",
                                    "name": "前三直选跨度"
                                }
                            }
                        },
                        "zux": {
                            "title": "前三组选",
                            "method": {
                                "zux_z3": {
                                    "desc": "组三",
                                    "num": "组三|0-9|all",
                                    "name": "前三组选三"
                                },
                                "zux_z6": {
                                    "desc": "组六",
                                    "num": "组六|0-9|all",
                                    "name": "前三组选六"
                                },
                                "zux_hh": {
                                    "desc": "混合",
                                    "num": "input|hh|3",
                                    "name": "前三混合组选"
                                },
                                "zux_hz": {
                                    "desc": "和值",
                                    "num": "组选和值|1-26|",
                                    "name": "前三组选和值"
                                },
                                "zux_bd": {
                                    "desc": "包胆",
                                    "num": "包胆|0-9|",
                                    "name": "前三组选包胆"
                                }
                            }
                        }
                    },
                    "zsm": {
                        "zx": {
                            "title": "中三直选",
                            "method": {
                                "zx_fs": {
                                    "desc": "复式",
                                    "num": "千位,百位,十位|0-9|all",
                                    "name": "中三直选复式"
                                },
                                "zx_ds": {
                                    "desc": "单式",
                                    "num": "input|zx|3",
                                    "name": "中三直选单式"
                                },
                                "zx_hz": {
                                    "desc": "和值",
                                    "num": "直选和值|0-27|",
                                    "name": "中三直选和值"
                                },
                                "zx_kd": {
                                    "desc": "跨度",
                                    "num": "跨度|0-9|all",
                                    "name": "中三直选跨度"
                                }
                            }
                        },
                        "zux": {
                            "title": "中三组选",
                            "method": {
                                "zux_z3": {
                                    "desc": "组三",
                                    "num": "组三|0-9|all",
                                    "name": "中三组选三"
                                },
                                "zux_z6": {
                                    "desc": "组六",
                                    "num": "组六|0-9|all",
                                    "name": "中三组选六"
                                },
                                "zux_hh": {
                                    "desc": "混合",
                                    "num": "input|hh|3",
                                    "name": "中三混合组选"
                                },
                                "zux_hz": {
                                    "desc": "和值",
                                    "num": "组选和值|1-26|",
                                    "name": "中三组选和值"
                                },
                                "zux_bd": {
                                    "desc": "包胆",
                                    "num": "包胆|0-9|",
                                    "name": "中三组选包胆"
                                }
                            }
                        }
                    },
                    "qem": {
                        "zx": {
                            "title": "前二直选",
                            "method": {
                                "zx_qfs": {
                                    "desc": "复式",
                                    "num": "万位,千位|0-9|all",
                                    "name": "前二直选复式"
                                },
                                "zx_qds": {
                                    "desc": "单式",
                                    "num": "input|zx|2",
                                    "name": "前二直选单式"
                                },
                                "zx_qhz": {
                                    "desc": "和值",
                                    "num": "和值|0-18|",
                                    "name": "前二直选和值"
                                },
                                "zx_qkd": {
                                    "desc": "跨度",
                                    "num": "跨度|0-9|all",
                                    "name": "前二直选跨度"
                                }
                            }
                        },
                        "zux": {
                            "title": "前二组选",
                            "method": {
                                "zux_qfs": {
                                    "desc": "复式",
                                    "num": "组选|0-9|all",
                                    "name": "前二组选复式"
                                },
                                "zux_qds": {
                                    "desc": "单式",
                                    "num": "input|zux|2",
                                    "name": "前二组选单式"
                                },
                                "zux_qhz": {
                                    "desc": "和值",
                                    "num": "和值|1-17|",
                                    "name": "前二组选和值"
                                },
                                "zux_qbd": {
                                    "desc": "包胆",
                                    "num": "包胆|0-9|",
                                    "name": "前二组选包胆"
                                }
                            }
                        }
                    },
                    "hem": {
                        "zx": {
                            "title": "后二直选",
                            "method": {
                                "zx_hfs": {
                                    "desc": "复式",
                                    "num": "十位,个位|0-9|all",
                                    "name": "后二直选复式"
                                },
                                "zx_hds": {
                                    "desc": "单式",
                                    "num": "input|zx|2",
                                    "name": "后二直选单式"
                                },
                                "zx_hhz": {
                                    "desc": "和值",
                                    "num": "和值|0-18|",
                                    "name": "后二直选和值"
                                },
                                "zx_hkd": {
                                    "desc": "跨度",
                                    "num": "跨度|0-9|all",
                                    "name": "后二直选跨度"
                                }
                            }
                        },
                        "zux": {
                            "title": "后二组选",
                            "method": {
                                "zux_hfs": {
                                    "desc": "复式",
                                    "num": "组选|0-9|all",
                                    "name": "后二组选复式"
                                },
                                "zux_hds": {
                                    "desc": "单式",
                                    "num": "input|zux|2",
                                    "name": "后二组选单式"
                                },
                                "zux_hhz": {
                                    "desc": "和值",
                                    "num": "和值|1-17|",
                                    "name": "后二组选和值"
                                },
                                "zux_hbd": {
                                    "desc": "包胆",
                                    "num": "包胆|0-9|",
                                    "name": "后二组选包胆"
                                }
                            }
                        }
                    },
                    "dwd": {
                        "dwd": {
                            "title": "定位胆",
                            "method": {
                                "dwd_dwd": {
                                    "desc": "定位胆",
                                    "num": "万位,千位,百位,十位,个位,所有位置|0-9|all",
                                    "name": "定位胆"
                                }
                            }
                        }
                    },
                    "bdd": {
                        "bdd": {
                            "title": "三星不定胆",
                            "method": {
                                "bdd_qs1": {
                                    "desc": "前三一码",
                                    "num": "不定胆|0-9|all",
                                    "name": "前三一码不定胆"
                                },
                                "bdd_qs2": {
                                    "desc": "前三二码",
                                    "num": "不定胆|0-9|all",
                                    "name": "前三二码不定胆"
                                },
                                "bdd_z31": {
                                    "desc": "中三一码",
                                    "num": "不定胆|0-9|all",
                                    "name": "中三一码不定胆"
                                },
                                "bdd_z32": {
                                    "desc": "中三二码",
                                    "num": "不定胆|0-9|all",
                                    "name": "中三二码不定胆"
                                },
                                "bdd_hs1": {
                                    "desc": "后三一码",
                                    "num": "不定胆|0-9|all",
                                    "name": "后三一码不定胆"
                                },
                                "bdd_hs2": {
                                    "desc": "后三二码",
                                    "num": "不定胆|0-9|all",
                                    "name": "后三二码不定胆"
                                }
                            }
                        },
                        "bdd4": {
                            "title": "四星不定胆",
                            "method": {
                                "bdd4_4x1": {
                                    "desc": "四星一码",
                                    "num": "不定胆|0-9|all",
                                    "name": "四星一码不定胆"
                                },
                                "bdd4_4x2": {
                                    "desc": "四星二码",
                                    "num": "不定胆|0-9|all",
                                    "name": "四星二码不定胆"
                                },
                                "bdd4_4x3": {
                                    "desc": "四星三码",
                                    "num": "不定胆|0-9|all",
                                    "name": "四星三码不定胆"
                                }
                            }
                        },
                        "bdd5": {
                            "title": "五星不定胆",
                            "method": {
                                "bdd5_5x1": {
                                    "desc": "五星一码",
                                    "num": "不定胆|0-9|all",
                                    "name": "五星一码不定胆"
                                },
                                "bdd5_5x2": {
                                    "desc": "五星二码",
                                    "num": "不定胆|0-9|all",
                                    "name": "五星二码不定胆"
                                },
                                "bdd5_5x3": {
                                    "desc": "五星三码",
                                    "num": "不定胆|0-9|all",
                                    "name": "五星三码不定胆"
                                }
                            }
                        }
                    },
                    "dxds": {
                        "dxds": {
                            "title": "大小单双组合",
                            "method": {
                                "dxds_h2": {
                                    "desc": "后二大小单双",
                                    "num": "十位,个位|0-3|two",
                                    "name": "后二大小单双"
                                },
                                "dxds_q2": {
                                    "desc": "前二大小单双",
                                    "num": "万位,千位|0-3|two",
                                    "name": "前二大小单双"
                                },
                                "dxds_h3": {
                                    "desc": "后三大小单双",
                                    "num": "百位,十位,个位|0-3|two",
                                    "name": "后三大小单双"
                                },
                                "dxds_q3": {
                                    "desc": "前三大小单双",
                                    "num": "万位,千位,百位|0-3|two",
                                    "name": "前三大小单双"
                                }
                            }
                        },
                        "hzdxds": {
                            "title": "和值大小单双",
                            "method": {
                                "hzdxds_5xhz": {
                                    "desc": "五星和值",
                                    "num": "五星和值|0-7|two",
                                    "name": "五星和值"
                                },
                                "hzdxds_q3hz": {
                                    "desc": "前三和值",
                                    "num": "前三和值|0-3|two",
                                    "name": "前三和值"
                                },
                                "hzdxds_z3hz": {
                                    "desc": "中三和值",
                                    "num": "中三和值|0-3|two",
                                    "name": "中三和值"
                                },
                                "hzdxds_h3hz": {
                                    "desc": "后三和值",
                                    "num": "后三和值|0-3|two",
                                    "name": "后三和值"
                                }
                            }
                        },
                        "dxgs": {
                            "title": "大小个数",
                            "method": {
                                "dxgs_wx": {
                                    "desc": "五星大小个数",
                                    "num": "五星|0-5|two",
                                    "name": "五星大小个数"
                                },
                                "dxgs_sx": {
                                    "desc": "四星大小个数",
                                    "num": "四星|0-4|two",
                                    "name": "四星大小个数"
                                },
                                "dxgs_qs": {
                                    "desc": "前三大小个数",
                                    "num": "前三|0-3|two",
                                    "name": "前三大小个数"
                                },
                                "dxgs_zs": {
                                    "desc": "中三大小个数",
                                    "num": "中三|0-3|two",
                                    "name": "中三大小个数"
                                },
                                "dxgs_hs": {
                                    "desc": "后三大小个数",
                                    "num": "后三|0-3|two",
                                    "name": "后三大小个数"
                                }
                            }
                        },
                        "dsgs": {
                            "title": "单双个数",
                            "method": {
                                "dsgs_wx": {
                                    "desc": "五星单双个数",
                                    "num": "五星|0-5|two",
                                    "name": "五星单双个数"
                                },
                                "dsgs_sx": {
                                    "desc": "四星单双个数",
                                    "num": "四星|0-4|two",
                                    "name": "四星单双个数"
                                },
                                "dsgs_qs": {
                                    "desc": "前三单双个数",
                                    "num": "前三|0-3|two",
                                    "name": "前三单双个数"
                                },
                                "dsgs_zs": {
                                    "desc": "中三单双个数",
                                    "num": "中三|0-3|two",
                                    "name": "中三单双个数"
                                },
                                "dsgs_hs": {
                                    "desc": "后三单双个数",
                                    "num": "后三|0-3|two",
                                    "name": "后三单双个数"
                                }
                            }
                        }
                    },
                    "qw": {
                        "lhh": {
                            "title": "龙虎和",
                            "method": {
                                "lhh_wq": {
                                    "desc": "万千",
                                    "num": "万千|5-6-7|two",
                                    "name": "万千龙虎和"
                                },
                                "lhh_wb": {
                                    "desc": "万百",
                                    "num": "万百|5-6-7|two",
                                    "name": "万百龙虎和"
                                },
                                "lhh_ws": {
                                    "desc": "万十",
                                    "num": "万十|5-6-7|two",
                                    "name": "万十龙虎和"
                                },
                                "lhh_wg": {
                                    "desc": "万个",
                                    "num": "万个|5-6-7|two",
                                    "name": "万个龙虎和"
                                },
                                "lhh_qb": {
                                    "desc": "千百",
                                    "num": "千百|5-6-7|two",
                                    "name": "千百龙虎和"
                                },
                                "lhh_qs": {
                                    "desc": "千十",
                                    "num": "千十|5-6-7|two",
                                    "name": "千十龙虎和"
                                },
                                "lhh_qg": {
                                    "desc": "千个",
                                    "num": "千个|5-6-7|two",
                                    "name": "千个龙虎和"
                                },
                                "lhh_bs": {
                                    "desc": "百十",
                                    "num": "百十|5-6-7|two",
                                    "name": "百十龙虎和"
                                },
                                "lhh_bg": {
                                    "desc": "百个",
                                    "num": "百个|5-6-7|two",
                                    "name": "百个龙虎和"
                                },
                                "lhh_sg": {
                                    "desc": "十个",
                                    "num": "十个|5-6-7|two",
                                    "name": "十个龙虎和"
                                }
                            }
                        },
                        "xt": {
                            "title": "形态",
                            "method": {
                                "xt_wx": {
                                    "desc": "五星形态",
                                    "num": "五星|13-19|two",
                                    "name": "五星形态"
                                },
                                "xt_q3": {
                                    "desc": "前三形态",
                                    "num": "前三|8-12|two",
                                    "name": "前三形态"
                                },
                                "xt_z3": {
                                    "desc": "中三形态",
                                    "num": "中三|8-12|two",
                                    "name": "中三形态"
                                },
                                "xt_h3": {
                                    "desc": "后三形态",
                                    "num": "后三|8-12|two",
                                    "name": "后三形态"
                                }
                            }
                        },
                        "ts": {
                            "title": "特殊",
                            "method": {
                                "ts_yffs": {
                                    "desc": "一帆风顺",
                                    "num": "一帆风顺|0-9|all",
                                    "name": "一帆风顺"
                                },
                                "ts_hscs": {
                                    "desc": "好事成双",
                                    "num": "好事成双|0-9|all",
                                    "name": "好事成双"
                                },
                                "ts_sxbx": {
                                    "desc": "三星报喜",
                                    "num": "三星报喜|0-9|all",
                                    "name": "三星报喜"
                                },
                                "ts_sjfc": {
                                    "desc": "四季发财",
                                    "num": "四季发财|0-9|all",
                                    "name": "四季发财"
                                }
                            }
                        },
                        "bjl": {
                            "title": "百家乐",
                            "method": {
                                "bjl_bjl": {
                                    "desc": "百家乐",
                                    "num": "百家乐|20-25|two",
                                    "name": "百家乐"
                                }
                            }
                        }
                    },
                    "nn": {
                        "nn": {
                            "title": "牛牛",
                            "method": {
                                "nn_nn": {
                                    "desc": "牛牛",
                                    "num": "牛牛|0-14|",
                                    "name": "牛牛"
                                }
                            }
                        }
                    },
                    "rx2": {
                        "zx": {
                            "title": "任二直选",
                            "method": {
                                "zx_fs": {
                                    "desc": "复式",
                                    "num": "万位,千位,百位,十位,个位|0-9|all",
                                    "name": "任二直选复式"
                                },
                                "zx_ds": {
                                    "desc": "单式",
                                    "num": "input|zx|2",
                                    "name": "任二直选单式"
                                },
                                "zx_hz": {
                                    "desc": "和值",
                                    "num": "直选和值|0-18|",
                                    "name": "任二直选和值"
                                }
                            }
                        },
                        "zux": {
                            "title": "任二组选",
                            "method": {
                                "zux_fs": {
                                    "desc": "复式",
                                    "num": "组选复式|0-9|all",
                                    "name": "任二组选复式"
                                },
                                "zux_ds": {
                                    "desc": "单式",
                                    "num": "input|zux|2",
                                    "name": "任二组选单式"
                                },
                                "zux_hz": {
                                    "desc": "和值",
                                    "num": "组选和值|1-17|",
                                    "name": "任二组选和值"
                                }
                            }
                        }
                    },
                    "rx3": {
                        "zx": {
                            "title": "任三直选",
                            "method": {
                                "zx_fs": {
                                    "desc": "复式",
                                    "num": "万位,千位,百位,十位,个位|0-9|all",
                                    "name": "任三直选复式"
                                },
                                "zx_ds": {
                                    "desc": "单式",
                                    "num": "input|zx|3",
                                    "name": "任三直选单式"
                                },
                                "zx_hz": {
                                    "desc": "和值",
                                    "num": "直选和值|0-27|",
                                    "name": "任三直选和值"
                                }
                            }
                        },
                        "zux": {
                            "title": "任三组选",
                            "method": {
                                "zux_z3": {
                                    "desc": "组三",
                                    "num": "组三|0-9|all",
                                    "name": "任三组选三"
                                },
                                "zux_z6": {
                                    "desc": "组六",
                                    "num": "组六|0-9|all",
                                    "name": "任三组选六"
                                },
                                "zux_hh": {
                                    "desc": "混合",
                                    "num": "input|hh|3",
                                    "name": "任三混合组选"
                                },
                                "zux_hz": {
                                    "desc": "和值",
                                    "num": "组选和值|1-26|",
                                    "name": "任三组选和值"
                                }
                            }
                        }
                    },
                    "rx4": {
                        "zx": {
                            "title": "任四直选",
                            "method": {
                                "zx_fs": {
                                    "desc": "复式",
                                    "num": "万位,千位,百位,十位,个位|0-9|all",
                                    "name": "任四直选复式"
                                },
                                "zx_ds": {
                                    "desc": "单式",
                                    "num": "input|zx|4",
                                    "name": "任四直选单式"
                                }
                            }
                        },
                        "zux": {
                            "title": "任四组选",
                            "method": {
                                "zux_z24": {
                                    "desc": "组选24",
                                    "num": "组24|0-9|all",
                                    "name": "任四组选24"
                                },
                                "zux_z12": {
                                    "desc": "组选12",
                                    "num": "二重号,单号|0-9|all",
                                    "name": "任四组选12"
                                },
                                "zux_z6": {
                                    "desc": "组选6",
                                    "num": "二重号|0-9|all",
                                    "name": "任四组选6"
                                },
                                "zux_z4": {
                                    "desc": "组选4",
                                    "num": "三重号,单号|0-9|all",
                                    "name": "任四组选4"
                                }
                            }
                        }
                    }
                }
            }
        },
        openIssue: '2013-999',
        openCode: '1,2,3,5,4,5',
        currentIssue: '2018-089',
        countTime: 3601,
    },
    beforeCreate() {},
    created() {

    },
    beforeMount() {},
    mounted() {},
    computed: {
        lotteryType() { //hash="#ssc-cqssc"设计成这样子
            return window.location.hash.slice(1).split('-')[0];
        },
        lotteryCode() {
            return window.location.hash.slice(1).split('-')[1];
        }
    },
    watch: {},
    methods: {

    }
});

Vue.prototype.$range = (start, end, step = 1) => {
    start = Number(start);
    end = Number(end);
    const resultArr = [];
    for (let i = start; i < end; i += step) {
        i <= end && resultArr.push(i);
    }
    return resultArr;
}